import React,{ useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import { setNombre} from '../store/counterSlice';


const Navbar = () => {

    const { token, nombre } = useSelector(state => state.spotify);
    const dispatch = useDispatch();

    useEffect(() => {

        const getUserData = async() => {
        
            const response = await fetch(
                "https://api.spotify.com/v1/me",
                {
                    headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    },
                }
            )
            .then(response => response.json())
            .then(data => {
              const userData = data.display_name;
              dispatch(setNombre(userData))
            });
            
        };

        getUserData()

    }, [token]);

    return (
        <div className='navbar-content'>

            <section className='navbar-profile'>
                <CgProfile className='navbar__icon'/>
                <h3 className='navbar__user'>{nombre}</h3>
            </section>

            {/* <section className='navbar-container'>
                <BsSearch className='navbar__icon'/>
                <input className="navbar__input" type="text" placeholder='Buscar'/>
            </section> */}
        </div>
    );
}

export default Navbar;
