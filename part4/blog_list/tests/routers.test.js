const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const helper = require("./test.helper");
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach( async () => {
  await Blog.deleteMany({});
  for(let blog of helper.initialBlogPosts){
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
}, 100000);

describe("there are initial blogs saved", () => {
  test("Get all blog posts", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("Contains an id", async () => {
    const blogs = await helper.blogsInDb();
    for(const blog of blogs) {
      expect(blog.id).toBeDefined();
    }
  }, 100000);
});

describe("adding a new blog", () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ name: "someOtherGuy", username: "name", passwordHash }).save();

    const userForToken = { username: user.username , id: user.id };
    token = jwt.sign(userForToken, config.SECRET);

  });

  test("A new blog is created", async () => {
    const newBlog = {
      title: "Learning how to fly",
      author: "Wright Brandon",
      url: "http://www.theblog.html",
      likes: 50
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await helper.blogsInDb();
    const content = response.map(t => t.title);
    expect(response).toHaveLength(helper.initialBlogPosts.length + 1);
    expect(content).toContain(
      "Learning how to fly"
    );
  });

  test("default likes to 0 if not defined", async () => {
    const newBlog = {
      title: "How to build anything",
      author: "Bob the Builder",
      url: "http://www.builders.com"
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogPosts.length + 1);
    expect(allBlogs[allBlogs.length - 1].likes).toBe(0);
  });

  test("respond with a status 400 if title or url are missing", async() => {
    const newBlog = {
      likes: 3,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogPosts.length);
  }, 100000);
});

describe("deleting a blog", () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ name: "someOtherGuy", username: "name", passwordHash }).save();

    const userForToken = { username: user.username, id: user.id };
    token = jwt.sign(userForToken, config.SECRET);

    const newBlog = {
      title: "the blog",
      author: "Sam Author",
      url: "https://www.blogwriters.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    return token;

  });

  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await Blog.find({}).populate("user");
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAfter = await Blog.find({}).populate("user");
    expect(blogsAfter).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAfter.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("fails with status code 401 if user is not authorized", async () => {
    const blogsAtStart = await Blog.find({}).populate("user");
    const blogToDelete = blogsAtStart[0];

    const invalidToken = "invalid-token";

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    const blogsAfter = await Blog.find({}).populate("user");

    expect(blogsAfter).toHaveLength(blogsAtStart.length);
    expect(blogsAtStart).toEqual(blogsAfter);
  });
});

describe("updating a blog", () => {
  test("likes on an individual blog can be updated", async () => {
    const allBlogs = await helper.blogsInDb();
    const blogToUpdate = allBlogs[0];

    blogToSend = {
      ...blogToUpdate,
      likes: 17,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToSend })
      .expect(200);

    const blogsAfter = await helper.blogsInDb();
    const updatedBlog = blogsAfter.find((blog) => blog.id === blogToUpdate.id);
    expect(blogsAfter).toHaveLength(helper.initialBlogPosts.length);
    expect(updatedBlog.likes).toBe(blogToSend.likes);
  });

});


afterAll(() => {
  mongoose.connection.close();
});