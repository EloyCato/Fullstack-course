const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

let db = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)

morgan.token('content', (request,response) =>{
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)})
})

app.get('/info', (request, response) => {
  response.send(`<ul> Phonebook has info for ${db.length} people</ul> <ul>${new Date()}</ul>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = Person.findById(request.params.id)
        .then( person => {
        response.json(person)
    })
    /*
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
    */
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result =>{
      response.status(204).end()
    })
    .catch(error => next(error))
})

const checkName = (name) => {
    return db.find( person => person.name === name )
}

const checkNumber = (number) => {
    return db.find(person => person.number === number)
}

app.post ('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name){
        return( response.status(400).json({
            error: 'name missing'
        }))
    }

    if(!body.number){
        return( response.status(400).json({
            error: 'number missing'
        }))
    }

    /*
    if(checkName(body.name)){
        return( response.status(400).json({
            error: 'name must be unique'
        }))
    }
    */

    const newPerson = new Person ({
        name: body.name,
        number: body.number,
    })

    newPerson.save().then(person => {
        response.json(person)
    })
})


//error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'Unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) =>{
  console.error(error.message)

  if(error.name == 'CastError'){
    return response.status(400).send({error: 'malformatted Id ' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`)
})