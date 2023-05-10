import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function commentCreate(postId: number, content: string) {
  const response = await axios.post(
    `${baseUrl}/posts/${postId}/comments`,
    {
      content,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function commentDelete(postId: number, commentId: number) {
  const response = await axios.delete(
    `${baseUrl}/posts/${postId}/comments/${commentId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function commentUpdate(
  postId: number,
  commentId: number,
  content: string
) {
  const response = await axios.put(
    `${baseUrl}/posts/${postId}/comments/${commentId}`,
    {
      content,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    }
  );
  return response.data;
}
