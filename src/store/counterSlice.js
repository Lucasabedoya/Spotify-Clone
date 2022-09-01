import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'estado',
  initialState:{
    token: null,
    playlists: [],
    nombre: null,
    allPlaylists: [],
    currentPlaylist: false,
    currentTrack: [],
    id: '7sKHUXC1mRSb61LhjBI77e',
    playerEstado: false,
  },

  reducers: {
    setToken: ( state, newToken ) => {
      state.token = newToken.payload;
    },
    setId: ( state, id ) => {
      state.id = id.payload;
    },
    setPlaylist: ( state, newPlaylist ) => {
      state.playlists = newPlaylist.payload;
    },
    setCurrentTrack: ( state, newCurrentTrack ) => {
      state.currentTrack = newCurrentTrack.payload;
    },
    setPlayerEstado: ( state, newPlayerEstado ) => {
      state. playerEstado = newPlayerEstado.payload;
    },
    setCurrentPlaylist: ( state, newCurrentPlaylist ) => {
      state.currentPlaylist = newCurrentPlaylist.payload;
    },
    setNombre: ( state, newNombre ) => {
      state.nombre = newNombre.payload;
    },
    setAllPlaylist: ( state, newAllPlaylist ) => {
      state.allPlaylists = newAllPlaylist.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setPlaylist, setCurrentTrack, setPlayerEstado, setCurrentPlaylist, setNombre, setAllPlaylist, setId} = counterSlice.actions
