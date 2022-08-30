import axios from 'axios'
import React,{useEffect} from 'react';
import {useStates} from '../utils/providerState'
import { AiOutlineClockCircle } from 'react-icons/ai'

const Body = (props) => {
    
    const {setTrack,currentArtist} = props;

    const { estado, currentPl, setTheCurrentPl, currentT, setTheCurrentT, selectedP, setTheSelectedP, playerEstado, setThePlayerEstado, currentP, setTheCurrentP } = useStates();

    useEffect(() => {   
        
        const getPlaylistData = async() => {

            const response = await fetch(
                `https://api.spotify.com/v1/playlists/${props.currentPlaylist}`,
                {
                    headers: {
                    Authorization: "Bearer " + props.token,
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
                        artists: track.artists.map((artist) => artist.name),
                        image: track.album.images[2].url,
                        duration: track.duration_ms,
                        album: track.album.name,
                        contextUrl: track.album.uri,
                        track_number: track.track_number,
                    }))
                }
                setTheCurrentPl(currentPlaylist);
                setTheCurrentT(currentTrack);
            })

            
            
        };
        
        getPlaylistData();

    }, []);

    const playTrack = async (
        id,
        name,
        artists,
        image,
        context_uri,
        track_number
    ) => {
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
              Authorization: "Bearer " + props.token,
            },
          }
        );
        if (response.status === 204) {
            const currentPlaying = {
                id,
                name,
                artists,
                image,
            };
        setTheCurrentP(currentPlaying);
        } else {
        setThePlayerEstado(true);
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
                    <img className="playlist__img" src={currentPl.image} alt={currentPl.name}/>
                </section>
                <section className="playlist-container__description"> 
                <p>lista</p>
                    <h2 className="playlist__tittle">{currentPl.name}</h2>
                    <span>
                        <p className="playlist__description">{currentPl.description}</p>
                        <p>{currentPl.owner} - {currentPl.total} canciones</p>
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
                   currentT.tracks.map(({id,image,name,duration,artists,album,contextUrl,track_number},index) => {
                    return(
                        <>
                            <div key={id} className="track-container"onClick={() =>{
                                    playTrack(id,name,artists,image,contextUrl,track_number)
                                    setTrack(true)
                                    currentArtist()
                                    }
                                }>
                                <div className="track__description">
                                    <span>{index+1}</span>                       
                                    <img className="col__img"src={image} />

                                    <div className="col track__autors">
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
