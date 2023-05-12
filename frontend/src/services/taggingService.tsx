import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function taggingCreate(postId: number, tagId: number) {
  const response = await axios.post(`${baseUrl}/taggings/${postId}/${tagId}`);
  return response.data;
}

export async function taggingDelete(postId: number, tagId: number) {
  const response = await axios.delete(`${baseUrl}/taggings/${postId}/${tagId}`);
  return response.data;
}
