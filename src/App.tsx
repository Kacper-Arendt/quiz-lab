import React from 'react';
import { Register } from './components/User/Register';
import { UserLogin } from './components/User/UserLogin';
import { UserProfile } from './components/User/UserProfile';

function App() {
    return (
        <>
            <Register />
            <UserLogin />
            <UserProfile />
        </>
    )
}

export default App;