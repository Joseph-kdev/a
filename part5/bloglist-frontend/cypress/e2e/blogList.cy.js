describe('template spec', () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Joseph Kinuthia",
      username: "Joey",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3001")
  })


  it('Login form is shown', () => {
    cy.contains("Blogs")
    cy.contains("Log in to application")
  })

  describe("Login" ,function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type("Joey")
      cy.get('#password').type("password")
      cy.get('#login-button').click()
      cy.contains('Joseph Kinuthia logged in')

    })

    it('fails  with wrong credentials', function () {
      cy.get('#username').type("Joey")
      cy.get('#password').type("password")
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Joseph Kinuthia logged in")
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username:"Joey", password:"password"})
    })

    it("a blog can be created", function () {
      cy.createBlog({
        title: "A new blog",
        author: "Blogger",
        url: "www.blogs.com"
      })

      cy.contains("A new blog")
    })

  })

  describe('multiple blogs exist', () => {
    beforeEach(function () {
      cy.createBlog({
        title: "This is the first one",
        author : "Da Vinci",
        url: "www.art.com"
      })
      cy.createBlog({
        title: "This is the second one",
        author : "Da Vinci",
        url: "www.art.com"
      })
      cy.createBlog({
        title: "This is the third one",
        author : "Da Vinci",
        url: "www.art.com"
      })
    })

    it("one of the blogs can be liked", function () {
      cy.contains("This is the third one")
      cy.get('#like-btn').click()
    })

    it("one of the blogs can be deleted", function () {
      cy.contains("This is the second one").parent().find("button").click();
      cy.get("#delete-btn").click();
      cy.get("html").should("not.contain", "This is the second one");
    })

    it("they are ordered by the number of likes in descending order", async function () {
      cy.contains("This is the third one").parent().find("button").click();
      cy.get("#like-btn").click().wait(500).click().wait(500);
      cy.contains("This is the third one").parent().find("button").click();

      cy.contains("This is the second one").parent().find("button").click();
      cy.get("#like-btn")
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500);

      cy.get(".blog").eq(0).should("contain", "This is the first one");
      cy.get(".blog").eq(1).should("contain", "This is the second one");
      cy.get(".blog").eq(2).should("contain", "This is the third one");
    });
  });

  })
})
