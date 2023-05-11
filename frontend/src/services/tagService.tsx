import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function tagIndex() {
  const response = await axios.get(`${baseUrl}/tags`, {
    withCredentials: true,
  });
  return response.data;
}

export async function tagCreate(name: string, colour: string) {
  const response = await axios.post(
    `${baseUrl}/tags`,
    {
      name,
      colour,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

export async function tagUpdate(
  id: number,
  name: string,
  colour: string
): Promise<void> {
  const response = await axios.put(
    `${baseUrl}/tags/${id}`,
    { name, colour },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    }
  );

  return response.data;
}

export async function tagDelete(id: number) {
  const response = await axios.delete(`${baseUrl}/tags/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
