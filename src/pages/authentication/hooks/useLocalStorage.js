import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if(value) {
                return value
            } else {
                window.localStorage.setItem(keyName, defaultValue);
                return defaultValue
            }
        } catch (err) {
            return defaultValue
        }
    })
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, newValue)
        } catch (err) {
            console.log(err)
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue]
}


export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = payload.exp * 1000;
        return Date.now() > expirationDate;
    } catch (e) {
        console.error('Invalid token format:', e);
        return true;
    }
};
