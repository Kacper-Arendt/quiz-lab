import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {createGlobalStyle} from 'styled-components'

import {Register} from './components/User/Register';
import {UserLogin} from './components/User/UserLogin';
import {UserProfile} from './components/User/UserProfile';
import {useAppDispatch} from './redux/hooks';
import {auth, getUserDocument} from "./components/firebase";
import {login} from "./redux/user/userSlice";
import {IUser} from "./models/User";
import {Game} from "./components/Game/Game";
import {AddQuestion} from "./components/Question/AddQuestion";
import {Questions} from "./components/Question/Questions";
import {Home} from "./components/HomePage/Home";
import background from './images/question-mark-background.jpg'
import {device} from './models/MediaQueries';

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    width: 100%;
    height: 100%;
    background-size: cover;
    background: url(${background}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

   @media${device.mobileM} {
     font-size: 71.25%;
   }
  @media${device.tablet} {
     font-size: 81.25%;
   }
  }

  body {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    letter-spacing: 1.5px;
    color: white;
  }
`

function App() {
    const dispatch = useAppDispatch();
    const [fetchedUser, setFetchedUser] = useState({
        id: '',
        name: '',
        email: '',
        isAuth: false,
    });

    useEffect(() => {
        onAuthStateChange();
    }, []);

    useEffect(() => {
        dispatch(login(fetchedUser as IUser));
    }, [fetchedUser, dispatch]);

    const onAuthStateChange = () => {
        return auth.onAuthStateChanged(async user => {
            if (user) {
                const response = await getUserDocument(user.uid);
                if (response) {
                    setFetchedUser({
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        isAuth: true,
                    });
                }
            }
        });
    };

    return (
        <>
            <GlobalStyles/>
            <Router>
                <Switch>
                    <Route path='/user' component={UserProfile}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={UserLogin}/>
                    <Route exact path="/questions" component={Questions}/>
                    <Route exact path="/questions/add" component={AddQuestion}/>
                    <Route path='/game' component={Game}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </Router>
        </>
    )
}

export default App;