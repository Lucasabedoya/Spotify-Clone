import React from 'react';
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import Volume from './Volume';

const Footer = (props) => {
    return (
        <div className='footer__container'>
            <PlayerControls token={props.token} currentState={props.currentState}/>
            <Volume token={props.token}/>
        </div>
    );
}

export default Footer;
