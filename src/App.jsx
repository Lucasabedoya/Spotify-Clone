import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Spotify from './components/Spotify';
import { setToken } from './store/counterSlice';

const App = () => {

  // const { estado, setTheToken, setTheNombre, nombre } = useStates();

  const { token } = useSelector(state => state.spotify)
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch( setToken(token))
      }
    }
  }, [token]);
  

  return (
    <div>

      {
        token ? <Spotify /> : <Login />
      }

    </div>
  );

  

}

export default App;