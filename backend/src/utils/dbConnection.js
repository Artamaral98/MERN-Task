import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

export const dbConnection = () => {
    mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Servidor conectado")
    }).catch((err) => {
        console.log(err.message, "erro ao conectar ao servidor")
    })
}