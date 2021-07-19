import {firestore} from '../firebase';

export const UpdateUserTotalScore = async (id: string, totalGames: number, pointsScored: number) => {
    const userRef = firestore.doc(`users/${id}`);
    const snapshot = await userRef.get();
    if (snapshot.exists) {
        try {
            await userRef.update({totalGames, pointsScored});
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
};
