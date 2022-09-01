import React from 'react';
// import {useStates} from '../utils/providerState'
import '../styles.css';



const Login = () => {

    const callLogin = () => {

        const redirect = () =>{
            
            const clientId = 'f1d0ed31ff01483689c858258ea68a72';
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
            <button className="login__button" onClick={callLogin}>
                <p className='login__button__txt'>Conectarse a spotify</p>
            </button>
        </div>
    );
}

export default Login;


