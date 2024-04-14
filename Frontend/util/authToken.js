import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';  // Importing the decode function from base-64

const TOKEN_KEY = 'userToken';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving the token", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error fetching the token", error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing the token", error);
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true; // Assume the token is expired if no token is found
  
  const [header, payload, signature] = token.split('.');
  if (!payload) return true; // Invalid token format

  const decodedPayload = JSON.parse(atob(payload));
  const currentTime = Date.now() / 1000; // convert to seconds
  
  return decodedPayload.exp < currentTime; // Check if token is expired
};
