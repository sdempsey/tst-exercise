import React from 'react';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>
                    &copy;2024 - A project by{' '}
                    <a
                        href="https://www.linkedin.com/in/sdempsey84/"
                        className="footer__link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sean Dempsey
                    </a>
                </p>
            </div>
        </footer>
    );
};
