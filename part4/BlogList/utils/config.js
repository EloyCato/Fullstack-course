require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = `${process.env.MONGODB_URI}/blogApp?retryWrites=true&w=majority&appName=Cluster0`

module.exports = { MONGODB_URI, PORT }