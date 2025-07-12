import  express from "express";
import {AutoRegisterControllers} from "../index";
import path from "path";

(async function Server()  {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    const router = express.Router()

    await AutoRegisterControllers({
        router,
        logging: true,
        controllerPath: [path.join(__dirname, "controllers/*.js")],
    })

    app.use(router)
    app.listen(5000, () => {
        console.log("Listening on port 5000");
    })
})()
