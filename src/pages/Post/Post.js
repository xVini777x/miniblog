// CSS
import styles from "./Post.module.css";

// hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

export const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div>
        {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1 className="mb-4">{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <h4>Este post trata sobre:</h4>
          {post.tagsArray.map((tag) => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </>
      )}
    </div>
  );
};
