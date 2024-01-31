import styles from "./CreatePost.module.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [FormError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image url
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    // criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (FormError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page

    navigate("/");
  };

  return (
    <div className={styles.CreatePost}>
      <h2 className={styles.title}>Criar post</h2>
      <p className={styles.TextInicial}>
        Escreva o que você quiser e compartilhe os seus conhecimentos!
      </p>
      <form onSubmit={handleSubmit} className={styles.FormCreatePost}>
        <label className={styles.FormCreatePost__label}>
          <span>Título</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Informe o título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label className={styles.FormCreatePost__label}>
          <span>URL da Imagem</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Informe a url da imagem..."
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label className={styles.FormCreatePost__label}>
          <span>Conteúdo do post</span>
          <textarea
            type="text"
            name="body"
            required
            placeholder="Informe o conteúdo do post..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label className={styles.FormCreatePost__label}>
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button disabled className="btn">
            Aguarde...
          </button>
        )}
      </form>
      {response.error && <p className="error">{response.error}</p>}
      {FormError && <p className="error">{FormError}</p>}
    </div>
  );
}

export default CreatePost;
