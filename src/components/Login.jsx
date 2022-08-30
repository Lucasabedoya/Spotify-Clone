import React from 'react';
import '../styles.css';
import {useStates} from '../utils/providerState'
import { setNewToken } from '../utils/setNewToken';

const Login = () => {

    const {estado, setTheToken } = useStates();

    const callLogin = () => {

        const redirect = () =>{
            
            const clientId = '6bc4306e996747fe866053ec3e0575ac';
            const redirectUrl = 'http://localhost:3000/';
            const apiUrl = 'http://accounts.spotify.com/authorize';
            const scope = [
                'user-read-email', 
                'user-read-private',
                'user-modify-playback-state',
                'user-read-playback-state',
                'user-read-currently-playing',
            ];
            window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
                " "
            )}&response_type=token&show_dialog=true`;
        }

        redirect();

    }

    return (    
        <div className="login__body">
            <img className="login__img" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify" />
            <button className="login__button" onClick={callLogin}>Conectarse a spotify</button>
        </div>
    );
}

export default Login;


