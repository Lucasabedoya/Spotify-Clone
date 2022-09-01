import React,{ useEffect, useState} from 'react';
import { IoLibrary } from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { BsList } from "react-icons/bs"
import { setAllPlaylist, setId } from '../store/counterSlice';

const Sidebar = () => {

    const { token, allPlaylists} = useSelector(state => state.spotify)
    const dispatch = useDispatch();

    useEffect(() => {

        const getPlaylistData = async() => {

            const response = await fetch(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    },
                }
            )
            .then(response => response.json())
            .then(data => {
                const playlist = data.items.map(({ id,name }) => { return { id,name }});
                dispatch(setAllPlaylist(playlist));
            })
            
        };

        getPlaylistData();

    }, [token]);

    const toggle = () =>{
        const content =document.getElementById("responsive-content")
        const img = document.getElementById("sidebar__logo")
        content.style.display = "block";
        img.style.display = "initial";
    }

    const hide = () =>{
        const img = document.getElementById("sidebar__logo")
        img.style.display = "none";
    }

    const changePlaylist = (cb) => {
        dispatch(setId(cb));
    }

    return (    
        <>

        <div className='sidebar-responsive' id='responsive-container' onMouseOver={toggle} onMouseLeave={hide}>
            {/* <BsList className="sidebar__icon" onMouseOver={toggle}/> */}
        <div className='sidebar__container' id='responsive-content' >
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify" className="sidebar__logo" id='sidebar__logo'/>
        
            <ul className="sidebar__list">
                <li className='sidebar__list__li'>
                    <MdHomeFilled className='sidebar__list__icon'/>
                    <span className='sidebar__list__li__span'>Inicio</span>
                </li>
                <li className='sidebar__list__li'>
                    <MdSearch className='sidebar__list__icon'/>
                    <span className='sidebar__list__li__span'>Buscar</span>
                </li>
                <li className='sidebar__list__li'>
                    <IoLibrary className='sidebar__list__icon'/>
                    <span className='sidebar__list__li__span'>Favoritos</span>
                </li>
            </ul>
        
            <div className="sidebar__playlist__container">
                <h2 className='sidebar__playlist__tittle' >Mis playlist</h2>
                <ul className="sidebar__playlist_list">
                {
                    allPlaylists.map(({ name, id }) => {
                        return (
                        <li key={ id } className="sidebar__playlist__item" onClick={ () => changePlaylist(id)}>{name} </li>    
                        );
                    })
                }   
                </ul>
            </div>
            
        </div>
        </div>

        </>

    );
    
}

export default Sidebar;
