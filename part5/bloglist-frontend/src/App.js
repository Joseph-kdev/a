import { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  const handleLogin = async (username,password) => {
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setMessage("Login successful");
    } catch (exception) {
      setMessage("Login failed");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  Blog.propTypes = {
    blog: PropTypes.func.isRequired,
    updateLikes: PropTypes.func.isRequired,
    username: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
  };

  const updateLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
    } catch (exception) {
      setMessage("error" + exception.response.data.error);
    }
  };

  const handleCreateBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(blog));
      setMessage(`New blog ${blog.title} added successfully`);
    } catch (exception) {
      setMessage("Error adding new blog" + exception.response.data.error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);

      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(updatedBlogs);
      setMessage("Blog removed");
    } catch (exception) {
      setMessage("error" + exception.response.data.error);
    }
  };

  const blogFormRef = useRef();

  if (user === null) {
    return <LoginForm handleLogin={handleLogin}/> ;
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <span>{user.name}</span> logged in {" "}
      <button onClick={handleLogout}>
        logout
      </button>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef} >
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      </div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} username={user.username} />
        )}
    </div>
  );
};


export default App;