import React,{useEffect} from 'react';
import Login from './components/Login';
import Spotify from './components/Spotify';
import {useStates} from './utils/providerState'
import { setNewToken } from './utils/setNewToken';

const App = () => {

  const { estado, setTheToken, setTheNombre, nombre } = useStates();

  const newToken = setNewToken();
  setTheToken(newToken);

  return (
    <div>

      {
        estado.token ? <Spotify token={estado.token} /> : <Login />
      }

    </div>
  );

  

}

export default App;