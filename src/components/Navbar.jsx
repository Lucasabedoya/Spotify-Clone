import React,{ useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useStates } from '../utils/providerState'

const Navbar = (props) => {

    const { setTheNombre, nombre } = useStates();

    useEffect(() => {

        const getUserData = async() => {
        
            const response = await fetch(
                "https://api.spotify.com/v1/me",
                {
                    headers: {
                    Authorization: "Bearer " + props.token,
                    "Content-Type": "application/json",
                    },
                }
            )
            .then(response => response.json())
            .then(data => {
              const userData = data.display_name;
              setTheNombre(userData);
            });
            
        };

        getUserData()

    }, []);

    return (
        <div className='navbar-content'>

            <section className='navbar-profile'>
                <CgProfile className='navbar__icon'/>
                <h3 className='navbar__user'>{nombre.nombre}</h3>
            </section>

            <section className='navbar-container'>
                <BsSearch className='navbar__icon'/>
                <input className="navbar__input" type="text" placeholder='Buscar'/>
            </section>
        </div>
    );
}

export default Navbar;
