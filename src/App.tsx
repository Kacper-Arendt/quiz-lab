import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React, {useEffect, useState} from 'react';

import {Register} from './components/User/Register';
import {UserLogin} from './components/User/UserLogin';
import {UserProfile} from './components/User/UserProfile';
import {useAppDispatch} from './redux/hooks';
import {getUserDocument} from "./components/firebase";
import firebase from "firebase";
import {login} from "./redux/user/userSlice";
import {IUser} from "./models/User";

function App() {
    const dispatch = useAppDispatch();
    const [fetchedUser, setFetchedUser] = useState({
        id: '',
        name: '',
        email: '',
        isAuth: false,
    });

    const onAuthStateChange = () => {
        return firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                const response = await getUserDocument(user.uid);
                if (response) {
                    setFetchedUser({
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        isAuth: true,
                    })
                }
            }
        });
    }

    useEffect(() => {
        onAuthStateChange()
    }, []);

    useEffect(() => {
        dispatch(login(fetchedUser as IUser))
    }, [fetchedUser])

    return (
        <>
            <Router>
                <Switch>
                    <Route path='/user' component={UserProfile}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/" component={UserLogin}/>
                </Switch>
            </Router>
        </>
    )
}

export default App;