import  express from "express";
import {AutoRegisterControllers} from "../index";
import path from "path";
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router()

AutoRegisterControllers({
    router,
    logging: true,
    controllerPath: [path.join(__dirname, "controllers/*.js")],
}).then()

app.use(router)