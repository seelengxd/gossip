import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function restoreSession() {
  return axios
    .get(`${baseUrl}/session`, { withCredentials: true })
    .then((response) => response.data);
}

export function destroySession() {
  return axios.get(`${baseUrl}/logout`, { withCredentials: true });
}

export function signUp(username: string, password: string) {
  return axios
    .post(
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
    )
    .then((response) => response.data);
}

export function logIn(username: string, password: string) {
  return axios
    .post(
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
    )
    .then((response) => response.data);
}
