import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";


describe("<Blog />", () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "https://tests.com/",
    likes: 0,
    user: {
      username: "username",
      name: "name",
    },
  };

  let component;
  const likeMockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} updateLikes={likeMockHandler} />
    );
  });

  test("renders title and author but not url or likes by default", () => {
    expect(component.container.querySelector(".title")).toHaveTextContent(
      blog.title
    );
    expect(component.container.querySelector(".author")).toHaveTextContent(
      blog.author
    );
    expect(component.queryByText(blog.url)).not.toBeInTheDocument();
    expect(component.queryByText("like")).not.toBeInTheDocument();
  });

  test("blog URL and number of likes shown after the button is clicked", () => {
    const button = component.container.querySelector("button");
    fireEvent.click(button);
    const blogDetails = component.container.querySelector(".blogDetails");
    expect(blogDetails).toBeInTheDocument;
  });

  test("like button event handler is called twice if the button is clicked twice", () => {
    const showButton = component.container.querySelector("button");
    fireEvent.click(showButton);

    const likeButton = component.container.querySelector(".like");
    console.log(likeButton);
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });


});