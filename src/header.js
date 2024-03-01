import React from 'react';
import logo from './logo.png';

export const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <img src={logo} className="logo" alt="logo" width="52" height="80" />
            </div>
        </header>
    );
};
