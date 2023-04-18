const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();

const Person = require("./models/contact");

// Create custom token to log request body
morgan.token("req-body", (request, _response) => JSON.stringify(request.body));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.json());
// Add morgan middleware with custom token
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :req-body"));
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then(contact => {
    response.json(contact);
  });
});

app.get("/api/info" , (request, response) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date();
      const info = `<p>Phonebook has info for ${count} people</p><p>${date}</p>`;
      response.send(info);
    });
});

app.get("/api/persons/:id" , (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person);
    } else {
      response.status(400).end();
    }
  })
    .catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  // Create a new person object
  const contact = new Person({
    name: body.name,
    number: body.number
  });

  // Save the new person object to the database
  contact.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => next(error));
});


app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(_result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request,response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedEntry => {
      response.json(updatedEntry);
    })
    .catch(error => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});