import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiousPublic";
import { QueryClient, QueryClientProvider } from "react-query";
import { app } from "./firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, googleProvider, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.mail;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            setLoading(false)
            if (currentUser) {
                useAxiosPublic.post('/jwt', loggedUser)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const queryClient = new QueryClient(); // Create a new instance of QueryClient

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
                {children}
            </QueryClientProvider>
        </AuthContext.Provider>
    );
};

export default AuthProvider;