import axios from 'axios'
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist, setCurrentTrack, setCurrentPlaylist, setPlayerEstado } from '../store/counterSlice';
import { AiOutlineClockCircle } from 'react-icons/ai';

const Body = () => {

    const { token, id, playlists, currentTrack } = useSelector(state => state.spotify)
    const dispatch = useDispatch();

    useEffect(() => {   
        
        const getPlaylistData = async() => {

            const response = await fetch(
                `https://api.spotify.com/v1/playlists/${id}`,
                {
                    headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    },
                }
            )
            .then(response => response.json())
            .then(data => {
                const currentPlaylist = {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    image: data.images[1].url,
                    owner: data.owner.display_name,
                    total: data.tracks.total,
                }

                const currentTrack = {
                    tracks: data.tracks.items.map(({ track }) => ({
                        id: track.id, 
                        name: track.name, 
                        artists: track.artists.map((artist) => artist.name + " "),
                        image: track.album.images[2].url,
                        duration: track.duration_ms,
                        album: track.album.name,
                        contextUrl: track.album.uri,
                        track_number: track.track_number,
                    }))
                }

                dispatch(setPlaylist(currentPlaylist));
                dispatch(setCurrentTrack(currentTrack.tracks));

            })
            
        };
        
        getPlaylistData();

    }, [token, id]);

    const playTrack = async (id,name,artists,image,context_uri, track_number) => {

        const response = await axios.put(
          `https://api.spotify.com/v1/me/player/play`,
          {
            context_uri,
            offset: {
              position: track_number - 1,
            },
            position_ms: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status === 204) {
            const currentPlaying = {id,name,artists,image,};
        dispatch(setCurrentPlaylist(currentPlaying));   
        dispatch(setPlayerEstado(true)); 
        } 
    };

    function msToMinutes(millis = 237253) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <>
            <div className="playlist-container">
                <section className="playlist-container__img">
                    <img className="playlist__img" src={playlists.image} alt={playlists.name}/>
                </section>
                <section className="playlist-container__description"> 
                <p>lista</p>
                    <h2 className="playlist__tittle">{playlists.name}</h2>
                    <span>
                        <p className="playlist__description">{playlists.description}</p>
                        <p>{playlists.owner} - {playlists.total} canciones</p>
                    </span>
                </section>
            </div>

            <div className="tracks-container">

                <div className="track-container__desc">
                    <div className="track__description">
                        <h3>#</h3>  
                        <h3 className="col__tittle">Titulo</h3>
                    </div>
                    <div className="col">
                        <h3>Album</h3>
                    </div>
                    <div className="col">
                        <AiOutlineClockCircle />
                    </div>
                </div>
                {
                   currentTrack.map(({id,image,name,duration,artists,album,contextUrl,track_number},index) => {
                    return(
                        <>
                            <div key={id} className="track-container" onClick={() => playTrack(id,name,artists,image,contextUrl,track_number)}>
                                <div className="track__description">
                                    <span>{index+1}</span>                       
                                    <img className="col__img"src={image} />

                                    <div className="track__autors">
                                        <p>{name}</p>
                                        <p>{artists}</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <p>{album}</p>
                                </div>
                                <div className="col">
                                    <p>{duration = msToMinutes(duration)}</p>
                                </div>
                            </div>
                        </>
                    )
                })
                }

            </div>
        </>
    );
}

export default Body;
