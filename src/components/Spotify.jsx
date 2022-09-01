import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'


const Spotify = () => { 
    
    return (
        <>
            <div className='body'>
                <div className='spotify'>
                    <Sidebar />
                    <div className="spotify__body">
                        <Navbar />
                        <div className="body__contents">
                            <Body />
                        </div>
                    </div>
                </div>
                <div className="spotify__footer">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Spotify;
 