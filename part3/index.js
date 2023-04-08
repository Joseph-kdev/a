const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())

// Create custom token to log request body
morgan.token('req-body', (req, res) => JSON.stringify(req.body))

// Add morgan middleware with custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(cors())
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info' , (request, response) => {
    response.send(`
            <p> Phonebook has info for ${persons.length} people</p>
            ${Date()}
            `)
})

app.get('/api/persons/:id' , (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(400).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    //check if either or both of the fields is empty
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
      }
    //check for a similar name
      const nameExists = persons.find(person => person.name === body.name)
      if (nameExists) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }
    
      const person = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
      }
    
      persons = persons.concat(person)
      response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})