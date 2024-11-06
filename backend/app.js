import express from "express"
import cors from "cors"
import {dbConnection} from '../backend/src/utils/dbConnection.js'
import crudRoutes from './src/routes/crudRoutes.js'
import bodyParser from 'body-parser'


dbConnection()

class App {
    constructor() {
        this.app = express();
        this.middlewares()
        this.routes()
        
    }

    middlewares() {
        this.app.use(cors({origin: ['http://localhost:5173'],credentials: true}))
        this.app.use(bodyParser.json());

    
    }

    routes(){
        this.app.use('/api/', crudRoutes)
        
    }
    

}

export default new App().app