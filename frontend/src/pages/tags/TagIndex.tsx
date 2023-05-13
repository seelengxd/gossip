import { useEffect, useState } from "react";
import LinkButton from "../../components/LinkButton";
import { Add } from "@mui/icons-material";
import { TagListData } from "../../types/tag";
import { tagDelete, tagIndex, tagUpdate } from "../../services/tagService";
import TagListCard from "./TagListCard";

function TagsIndex() {
  const [tags, setTags] = useState<TagListData[]>([]);

  const loadTags = () =>
    tagIndex()
      .then((tags) => setTags(tags))
      .catch((err) => console.log(err));

  useEffect(() => {
    loadTags();
  }, []);

  const handleDelete =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("Are you sure you want to delete this tag?")) {
        tagDelete(id)
          .then(() => loadTags())
          .catch((err) => console.log(err));
      }
    };

  const handleUpdate =
    (id: number) =>
    (e: React.FormEvent<HTMLFormElement>) =>
    (name: string, colour: string) => {
      e.preventDefault();
      return tagUpdate(id, name, colour).then(() => loadTags());
    };

  return (
    <div className="container min-h-full mx-auto space-y-4">
      <h1 className="text-3xl mt-5">Tags</h1>
      <LinkButton
        to="/tags/new"
        label={
          <span>
            <Add className="mr-1" />
            New Tag
          </span>
        }
      />
      {tags.map((tag) => (
        <TagListCard
          key={tag.id}
          tag={tag}
          handleDelete={handleDelete(tag.id)}
          handleUpdate={handleUpdate(tag.id)}
        />
      ))}
    </div>
  );
}

export default TagsIndex;
