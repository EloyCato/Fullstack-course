const mongoose = require('mongoose')

//console.log(`mongo db: ${process.env.MONGODB_URI}`)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const personName= process.argv[3]

const personNumber= process.argv[4]

const url = `mongodb+srv://eloycatao_db_user:${password}@cluster0.h4h9o0u.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv[3] && process.argv[4]){
  const person = new Person({
    name: personName,
    number: personNumber,
  })
  person.save().then(result => {
    console.log('person saved!')
    console.log(result)
    mongoose.connection.close()
  })
}

if(!process.argv[3] && !process.argv[4]){
  Person.find({}).then(result => {
    console.log('phonebook: ')
    result.forEach(person => {
      //console.log(person)
      console.log(person.name,' ', person.number)
    })
    mongoose.connection.close()
  })
}

