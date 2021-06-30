import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {IUser} from "../models/User";

const firebaseConfig = {
    apiKey: "AIzaSyA5a5WuH6_DH2-7ZVYDh8twPp-LH4KwK5g",
    authDomain: "quiz-lab-23749.firebaseapp.com",
    projectId: "quiz-lab-23749",
    storageBucket: "quiz-lab-23749.appspot.com",
    messagingSenderId: "868035074179",
    appId: "1:868035074179:web:dcc275bf573f5e801b63b6"
};
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithRedirect(provider);
};

export const generateUserDocument = async (user: IUser, id: string) => {
    if (!id) return;
    const userRef = firestore.doc(`users/${id}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const {email, name} = user;
        try {
            await userRef.set({
                id,
                email,
                name,
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
};


export const getUserDocument = async (id: string) => {
    try {
        const userDocument = await firestore.doc(`users/${id}`).get();
        const response = userDocument.data();
        return response as IUser;
    } catch (error) {
        console.error("Error fetching user", error);
    }
};
