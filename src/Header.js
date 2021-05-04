import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <div className='Header'>
            <header className='App-Header'>
                <h1 className='Header-Link'>
                    <Link to={'/'}>
                        Noteful
                    </Link>
                </h1>
            </header>
        </div>
    )
}

export default Header;


