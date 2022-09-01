import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';


const Volume = () => {

    const { token } = useSelector(state => state.spotify)

    const setVolume = async(e) => {

        await axios.put('https://api.spotify.com/v1/me/player/volume',{},
        {
            params: {
                volume_percent: parseInt(e.target.value)
            },
            headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
        }
    );
    };

    return (
        <section className='volume'>
            <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
        </section>
    );
}

export default Volume;
