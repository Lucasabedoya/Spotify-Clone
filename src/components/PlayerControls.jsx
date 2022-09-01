import axios from 'axios';
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BsFillPlayCircleFill,BsFillPauseCircleFill,} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { setPlayerEstado, setCurrentPlaylist} from '../store/counterSlice';


const PlayerControls = (props) => {

  const { token, playlists, currentPlaylist, playerEstado } = useSelector(state => state.spotify)
  const dispatch = useDispatch();

  const getNewTrack = async() => {

    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing", 
      {
          headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          },
      }
      );
      if (response.data !== "") {
          const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch(setCurrentPlaylist(currentPlaying))
      } 
  };

  const changeTrack = async (direction) => {

    await axios.post( `https://api.spotify.com/v1/me/player/${direction}`,{},
        {
            headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
        }
    );

    getNewTrack()

  };

  const changeState = async() => {

      const state = playerEstado ? "pause" : "play";

      await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );   

    dispatch(setPlayerEstado(!playerEstado));

  };    
   
  return (

    <>
    {
      currentPlaylist &&(
        <aticle className="current-track">
          <div >
            <img className="track__image" src={currentPlaylist.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h3 className="track__info__track__name">{currentPlaylist.name}</h3>
            <h5 className="track__info__track__artists">
            {currentPlaylist.artists.join(", ")}
            </h5>
          </div>
        </aticle>
      )
    }
      


      <section className='controls-container'>
          <div className="anterior">
            <CgPlayTrackPrev className="controls__button" onClick={() => changeTrack("previous")}/>
          </div>
          <div className="play">
            {playerEstado ? <BsFillPauseCircleFill className="controls__button" onClick={changeState}/> 
                          : <BsFillPlayCircleFill className="controls__button" onClick={changeState}/>}
          </div>
          <div className="siguiente">
            <CgPlayTrackNext className="controls__button" onClick={() => changeTrack("next")}/>
          </div>
      </section>
    
    </>
  );
}

export default PlayerControls;
