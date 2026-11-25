const mongoose = require('mongoose')

require('dotenv').config()

mongoose.set('strictQuery', false)

const url = `${process.env.MONGODB_URI}/personApp?retryWrites=true&w=majority&appName=Cluster0`

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{7,8}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id //deletando para não é interessante aparecer no objeto
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)