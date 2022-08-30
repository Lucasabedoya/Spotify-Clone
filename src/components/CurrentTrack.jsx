import axios from 'axios'
import React,{useEffect} from 'react';
import {useStates} from '../utils/providerState'

const CurrentTrack = (props) => {

    const { estado, currentP, setTheCurrentP} = useStates();

    useEffect(() => {

        const getPlaylistData = async() => {

            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                    Authorization: "Bearer " + props.token,
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
                setTheCurrentP(currentPlaying);
            } else {
                console.log("error")
            }
            
        };

        getPlaylistData();

    }, []);

    return (
        <div></div>
    );
}

export default CurrentTrack;
