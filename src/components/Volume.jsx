import axios from 'axios';
import React from 'react';

const Volume = (props) => {

    const setVolume = async(e) => {

        await axios.put('https://api.spotify.com/v1/me/player/volume',{},
        {
            params: {
                volume_percent: parseInt(e.target.value)
            },
            headers: {
            Authorization: "Bearer " + props.token,
            "Content-Type": "application/json",
            },
        }
    );
    };

    return (
        <div className='volume'>
            <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
        </div>
    );
}

export default Volume;
