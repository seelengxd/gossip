import { Delete, Edit } from "@mui/icons-material";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { TagListData } from "../../types/tag";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TagForm from "./TagForm";

interface Props {
  tag: TagListData;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleUpdate: (
    e: React.FormEvent<HTMLFormElement>
  ) => (name: string, colour: string) => Promise<void>;
}

function TagListCard({ tag, handleDelete, handleUpdate }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);

  return user && isEditing ? (
    <TagForm
      formTitle="Update Tag"
      handleSubmit={(e) => (name, colour) =>
        handleUpdate(e)(name, colour).then(() => setIsEditing(false))}
      initialTag={tag}
    />
  ) : (
    <Card colour={tag.colour}>
      <p>{tag.name}</p>
      <div className="space-x-5">
        <Button label={<Edit />} onClick={() => setIsEditing(true)} />
        <Button label={<Delete />} onClick={handleDelete} danger={true} />
      </div>
    </Card>
  );
}

export default TagListCard;
