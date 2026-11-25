const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

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

app.get('/api/persons/:id', (request, response, next) => {
  //const id = request.params.id
  const person = Person.findById(request.params.id)
    .then( person => { 
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
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

app.post ('/api/persons', (request, response, next) => {
  const body = request.body

  /*
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
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body
  Person.findById(request.params.id)
    .then(person => {
      console.log('Person Id:', request.params.id)
      if(!person){    
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatePerson) => {
        response.json(updatePerson)
      })
    })
    .catch(error => next(error))
})


//error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'Unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) =>{
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted Id ' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`)
})