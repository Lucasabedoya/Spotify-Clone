import { useState } from "react";
import { setNewToken } from "./setNewToken";

export const useStates = () => {

    const [estado, setEstado] = useState({
        token: null,
        playlists: [],
    });

    const [nombre, setNombre] = useState({
        nombre: null,
    });

    const [currentPl, setCurrentPl] = useState([]);

    const [currentT, setCurrentT] = useState({
        tracks: []
    });

    const [selectedP, setSelectedP] = useState({
        id: '7sKHUXC1mRSb61LhjBI77e',
    });

    const [currentP, setCurrentP] = useState();

    const [playerEstado, setPlayerEstado] = useState(false);

    // SETTERS

    const setTheSelectedP = (newSelectedP) => {
        setSelectedP(newSelectedP)
    };

    const setThePlayerEstado = (newPlayerEstado) => {
        setPlayerEstado(newPlayerEstado)
    };

    const setTheCurrentP = (newCurrentP) => {
        setCurrentP(newCurrentP)
    };

    const setTheToken = (newToken) => {
        estado.token = newToken;
    };

    const setThePlaylist = (newPlaylist) => {
        setEstado({playlists: newPlaylist});
    };

    const setTheNewPlaylist = (newSPlaylist) => {
        estado.selectedPlaylist = newSPlaylist;
    };

    const setTheNombre = (newNombre) => {
        setNombre({nombre: newNombre});
    };

    const setTheCurrentPl = (newCurrentPl) => {
        setCurrentPl(newCurrentPl)
    };

    const setTheCurrentT = (newCurrentT) => {
        setCurrentT(currentT.tracks = newCurrentT)
    };

    return { estado, setTheToken, setThePlaylist, setTheNewPlaylist,  nombre, setTheNombre, currentPl, setTheCurrentPl, currentT, setTheCurrentT, currentP, setTheCurrentP, selectedP, setTheSelectedP, playerEstado, setThePlayerEstado };

};