import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getToken, isTokenExpired, removeToken } from '../util/authToken'; // Adjust the import path as necessary

const useAuthCheck = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const verifyToken = async () => {
      const token = await getToken();
      if (!token || isTokenExpired(token)) {
        await removeToken();
        navigation.navigate('SignIn');
      }
    };

    verifyToken();
  }, [navigation]); // Added navigation as a dependency

  return null; // Since this is a hook, it does not return any JSX
};

export default useAuthCheck;
