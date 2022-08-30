import React,{ useEffect, useState} from 'react';
import { IoLibrary } from 'react-icons/io5'
import { MdHomeFilled, MdSearch } from 'react-icons/md'
import { useStates } from '../utils/providerState';

const Sidebar = (props) => {

    const {childClicked} = props;

    const { estado, setThePlaylist, setTheSelectedP, selectedP } = useStates();

    useEffect(() => {

        const getPlaylistData = async() => {

            const response = await fetch(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                    Authorization: "Bearer " + props.token,
                    "Content-Type": "application/json",
                    },
                }
            )
            .then(response => response.json())
            .then(data => {
                const playlist = data.items.map(({ id,name }) => { return { id,name }});
                setThePlaylist(playlist);
            })
            
        };

        getPlaylistData();

    }, []);

    return (
        <div className='sidebar__container'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify" className="sidebar__logo" />
        
            <ul className="sidebar__list">
                <li className='sidebar__list__li'>
                    <MdHomeFilled />
                    <span className='sidebar__list__li__span'>Inicio</span>
                </li>
                <li className='sidebar__list__li'>
                    <MdSearch />
                    <span className='sidebar__list__li__span'>Buscar</span>
                </li>
                <li className='sidebar__list__li'>
                    <IoLibrary />
                    <span className='sidebar__list__li__span'>Favoritos</span>
                </li>
            </ul>
        
            <div className="sidebar__playlist__container">
                <h2 className='sidebar__playlist__tittle'>Mis playlist</h2>
                <ul className="sidebar__playlist_list">
                {estado.playlists.map(({ name, id }) => {
                    return (
                    <li key={ id } className="sidebar__playlist__item" onClick={() => childClicked({id})}>{ name }</li>    
                    );
                })}
                </ul>
            </div>
            
        </div>

    );
    
}

export const CurrentPlaylist = () =>{

    const [selectedP, setSelectedP] = useState({
        id: {selectedP},
    });

    return selectedP
}

export default Sidebar;
