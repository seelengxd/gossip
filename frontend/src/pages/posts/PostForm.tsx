import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { PostData } from "../../types/post";

interface Props {
  formTitle: string;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => (title: string, content: string) => void;
  initialPost?: PostData;
}

function PostForm({ formTitle, handleSubmit, initialPost }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setContent(initialPost.content);
    }
  }, [initialPost]);
  return (
    <Form
      error={error}
      onClose={() => setError("")}
      handleSubmit={(e) => handleSubmit(e)(title, content)}
    >
      <h1 className="text-xl text-center">{formTitle}</h1>
      <Input
        label="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div className="grid grid-cols-3">
        <label className="text-right mr-5 col-span-1">Content:</label>
        <textarea
          className="p-1 col-span-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="your content..."
          required
        />
      </div>
      <div className="flex justify-center">
        <button className="bg-cyan-500 px-3 border hover:bg-cyan-300">
          Submit!
        </button>
      </div>
    </Form>
  );
}

export default PostForm;
