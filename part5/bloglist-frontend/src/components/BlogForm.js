import { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (event) => {
    event.preventDefault();
    handleCreateBlog(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input type="text" value={title} name='title'
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author:
          <input type="text" value={author} name='author'
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input type="text" value={url} name='url'
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default BlogForm;
