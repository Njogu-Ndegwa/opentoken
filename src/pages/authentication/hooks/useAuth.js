import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage";
import { useMutation } from '@apollo/client';
import { signInLoginUserMutation } from "../mutation";
import { handleGQLErrors } from "../../../utils/gqlErrors";
import { isUndefinedOrNull } from "../../../utils";
import { Notify } from 'notiflix';
import { USER_TYPE, USER_TYPES, TOKEN_STORAGE_KEY } from "../constants/auth";
import { setUserPref, addToStorage, setToken } from "../utils";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage(TOKEN_STORAGE_KEY, "") 
    const [loggedInUserDetails, setLoggedInUserDetails] = useState("") 
    // const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [signIn, {data, loading}] = useMutation(signInLoginUserMutation, {
        onCompleted: (result) => {
            if(result) {
                if (result.signInUser) {
                    const user = result.signInUser;
                    const firstName = !isUndefinedOrNull(user?.firstName)
                      ? user.firstName
                      : user.name || '';
                    const lastName = !isUndefinedOrNull(user.lastName) ? user.lastName : '';

                    addToStorage(USER_TYPE, result.signInUser.type || '');
                    setUser(result?.signInUser?.accessToken || '');
                    const rest = user.type === USER_TYPES.DISTRIBUTOR ? { distributorId: user._id } : {}
                    setUserPref({ ...user, firstName, lastName, ...rest });
                    localStorage.setItem("user_id", user?._id)
                    setLoggedInUserDetails(user?._id)
                    Notify.success("User Logged in successfully")
                    navigate("/dashboard/reports");
            }
            // setLoading(false)
        }
    },
        onError: (data) => {
            Notify.failure("Invalid Credentials")
            // handleGQLErrors(data)
            // setLoading(false)
        }
    })
    const login = async (signInCredentials) => {
       signIn({ variables: { signInCredentials: { email:signInCredentials.email, password:signInCredentials.password } },
        })
    };

    const logout = () => {
        setUser(null);
        navigate("/", {replace: true})
    }

    const value = useMemo (
        () => ({
            user,
            login,
            logout,
            loading,
            loggedInUserDetails
        }),
        [user, loading, loggedInUserDetails]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
}