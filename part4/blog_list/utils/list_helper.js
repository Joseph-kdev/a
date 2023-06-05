const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (list) => {
  let sum = 0;
  list.forEach(blog => {
    return sum += blog.likes;
  });
  return sum;
};

const favoriteBlog = (list) => {
  const topBlog = list.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
  return topBlog;
};

const mostBlogs = (list) => {
  const groupedBlogs = _.groupBy(list, "author");
  const authorWithMostBlogs = _.maxBy(_.keys(groupedBlogs), (author) => {
    return groupedBlogs[author].length;
  });

  return {
    author: authorWithMostBlogs,
    blogs: groupedBlogs[authorWithMostBlogs].length
  };
};

const mostLikes = (list) => {
  const authorLikes = _.reduce(list, (result, blog) => {
    result[blog.author] = (result[blog.author] || 0) + blog.likes;
    return result;
  }, {});

  const maxLikes = _.max(_.values(authorLikes));
  const topAuthor = _.findKey(authorLikes, (value) => value === maxLikes);

  return {
    author: topAuthor,
    likes: maxLikes
  };
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};