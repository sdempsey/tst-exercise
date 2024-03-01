import React from 'react';
import { Header } from './header';
import { Form } from './form';
import { Footer } from './footer';
import '@fontsource/open-sans';
import './main.scss';

export default function App() {
    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <Form />
                </div>
            </main>
            <Footer />
        </>
    );
}
