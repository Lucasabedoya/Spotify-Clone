import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'
import { useStates } from '../utils/providerState';


const Spotify = (props) => { 

    const { setTheSelectedP, selectedP,setThePlayerEstado,playerEstado,currentP, setTheCurrentP } = useStates();

    return (
        <>
            <div className='body'>
                <div className='spotify'>
                    <Sidebar token={props.token} childClicked={(cb) => setTheSelectedP(cb)}/>
                    <div className="spotify__body">
                        <Navbar token={props.token}/>
                        <div className="body__contents">
                            <Body token={props.token} setTrack={(cb) => setThePlayerEstado(cb)} currentPlaylist={selectedP.id} currentArtist={(cb) => setTheCurrentP(cb)}/>
                        </div>
                    </div>
                </div>
                <div className="spotify__footer">
                    <Footer token={props.token} currentState={playerEstado}/>
                </div>
            </div>
        </>
    );
}

export default Spotify;
 