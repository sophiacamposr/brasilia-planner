import React, { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import FriendGroup from './components/FriendGroup';
import Footer from './components/Footer';
import './App.css';

function App() {
    const [selectedName, setSelectedName] = useState('');

    return (
        <div className="App">
            <Header />
            <main>
                <Calendar onNameSelect={setSelectedName} />
                <FriendGroup selectedName={selectedName} />
            </main>
            <Footer />
        </div>
    );
}

export default App;
