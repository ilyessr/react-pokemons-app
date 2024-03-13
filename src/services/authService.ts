import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export const login = async (
  username: string,
  password: string
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/login`,
      {
        username,
        password,
      }
    );

    const { token } = response.data;
    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken .exp && decodedToken.exp > currentTime) {
        return true;
      }
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
    }
  }

  return false;
};
