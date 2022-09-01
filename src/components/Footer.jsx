import React from 'react';
import PlayerControls from './PlayerControls';
import Volume from './Volume';

const Footer = (props) => {
    return (
        <div className='footer__container'>
            <PlayerControls token={props.token} currentState={props.currentState} currentPlaylist={props.currentPlaylist} runing={true}/>
            <Volume token={props.token}/>
        </div>
    );
}

export default Footer;
