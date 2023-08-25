import { useState } from "react";

const Blog = ({ blog, updateLikes, username, deleteBlog }) => {
  const [details, setDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleDetails = () => {
    setDetails(!details);
  };


  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateLikes(blog.id, blogToUpdate);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div>
      <div style={blogStyle}>
        <span className="title"> {blog.title} </span>
        <span className="author"> {blog.author} </span>
        <button onClick={toggleDetails}>{details ? "hide" : "View"}</button>
      </div>
      {details && (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div>likes: {blog.likes}</div>
          <div><button id="like-btn" onClick={handleLike} className="like">like</button></div>
        </div>,
        <div>{blog.user.name}</div>,
        <div>
          {blog.user.username === username && (
            <button id="delete-btn" onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      )};
    </div>
  );
};


export default Blog;