import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { TagListData } from "../../types/tag";
import { AxiosError } from "axios";

interface Props {
  formTitle: string;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => (name: string, colour: string) => Promise<void>;
  initialTag?: TagListData;
}

function TagForm({ formTitle, handleSubmit, initialTag }: Props) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [colour, setColour] = useState("");

  useEffect(() => {
    if (initialTag) {
      setName(initialTag.name);
      setColour(initialTag.colour);
    }
  }, [initialTag]);

  return (
    <Form
      error={error}
      onClose={() => setError("")}
      handleSubmit={(e) =>
        handleSubmit(e)(name, colour).catch((err: AxiosError) => {
          setError(err.response!.data as string);
        })
      }
    >
      <h1 className="text-xl text-center">{formTitle}</h1>
      <Input
        label="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="grid grid-cols-3">
        <label className="text-right mr-5 col-span-1">Colour</label>
        <input
          type="color"
          className="p-1 col-span-2"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          required
        ></input>
      </div>
      <div className="flex justify-center">
        <Button label="Submit" />
      </div>
    </Form>
  );
}

export default TagForm;
