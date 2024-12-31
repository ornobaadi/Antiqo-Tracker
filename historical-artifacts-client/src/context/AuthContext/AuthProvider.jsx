import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth";
import auth from "../../Firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password, userName, photoUrl) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // After user creation, update profile with additional information
                return updateProfile(result.user, {
                    displayName: userName,
                    photoURL: photoUrl,
                }).then(() => {
                    // Update user state with updated profile info
                    setUser({
                        name: userName,
                        email: result.user.email,
                        photoURL: photoUrl,
                    });
                    setLoading(false);
                });
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                setLoading(false);
                throw error;
            });
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).catch((error) => {
            console.error("Error logging in:", error);
            setLoading(false);
            throw error;
        });
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser({
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                });
                setLoading(false);
                return result; // Return the result for the component to use
            })
            .catch((error) => {
                console.error("Error logging in with Google:", error);
                setLoading(false);
                throw error;
            });
    };

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => {
                setUser(null);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error logging out:", error);
                setLoading(false);
                throw error;
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Fetch the latest user profile from Firebase
                const { displayName, email, photoURL } = currentUser;
                setUser({
                    name: displayName,
                    email,
                    photoURL,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logoutUser,
        loginWithGoogle,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
