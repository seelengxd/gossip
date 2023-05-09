import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function postIndex() {
  const response = await axios.get(`${baseUrl}/posts`, {
    withCredentials: true,
  });
  return response.data;
}

export async function postCreate(title: string, content: string) {
  const response = await axios.post(
    `${baseUrl}/posts`,
    { title, content },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function postShow(id: number) {
  const response = await axios.get(`${baseUrl}/posts/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function postUpdate(id: number, title: string, content: string) {
  const response = await axios.put(
    `${baseUrl}/posts/${id}`,
    { title, content },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function postDestroy(id: number) {
  const response = await axios.delete(`${baseUrl}/posts/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
