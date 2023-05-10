import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { CommentListData } from "../../types/comment";

interface Props {
  formTitle: string;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => (content: string) => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  initialComment?: CommentListData;
}

function CommentForm({
  formTitle,
  handleSubmit,
  handleCancel,
  initialComment,
}: Props) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialComment) {
      setContent(initialComment.content);
    }
  }, [initialComment]);
  return (
    <Form
      error={error}
      onClose={() => setError("")}
      handleSubmit={(e) => handleSubmit(e)(content)}
    >
      <h1 className="text-xl text-center">{formTitle}</h1>
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
      <div className="flex justify-between">
        <Button label="Cancel" onClick={handleCancel} />
        <Button label="Submit" />
      </div>
    </Form>
  );
}

export default CommentForm;
