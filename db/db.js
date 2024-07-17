const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos')
  } catch (err) {
    console.log('Error al conectar con la base de datos')
  }
}

module.exports = connectDB;