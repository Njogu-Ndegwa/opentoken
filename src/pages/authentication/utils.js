import { USER_PREF_STORAGE_KEY, TOKEN_STORAGE_KEY } from "./constants/auth";

export const setUserPref = (userPref) => {
    localStorage.setItem(USER_PREF_STORAGE_KEY, JSON.stringify(userPref));
  };

export const addToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

export const removeToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  export const setToken = (token) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  };
  