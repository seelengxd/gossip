import React from "react";
import { useNavigate } from "react-router-dom";
import { tagCreate } from "../../services/tagService";
import TagForm from "./TagForm";

function CreateTagForm() {
  const navigate = useNavigate();
  const handleSubmit =
    (e: React.FormEvent<HTMLFormElement>) => (name: string, colour: string) => {
      e.preventDefault();
      return tagCreate(name, colour).then((response) => navigate("/tags"));
    };
  return <TagForm formTitle="Create Tag" handleSubmit={handleSubmit} />;
}

export default CreateTagForm;
