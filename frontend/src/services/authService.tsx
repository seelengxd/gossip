import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function restoreSession() {
  const response = await axios.get(`${baseUrl}/session`, {
    withCredentials: true,
  });
  return response.data;
}

export function destroySession() {
  return axios.get(`${baseUrl}/logout`, { withCredentials: true });
}

export async function signUp(username: string, password: string) {
  const response = await axios.post(
    `${baseUrl}/signup`,
    {
      username,
      password,
    },
    {
      headers: {
        // content-type is set or backend can't read it
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // this is to ensure cookies are sent over
      withCredentials: true,
    }
  );
  return response.data;
}

export async function logIn(username: string, password: string) {
  const response = await axios.post(
    `${baseUrl}/login`,
    {
      username,
      password,
    },
    {
      headers: {
        // content-type is set or backend can't read it
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // this is to ensure cookies are sent over
      withCredentials: true,
    }
  );
  return response.data;
}
