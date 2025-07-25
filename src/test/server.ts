import express, {Router} from "express";
import {AutoRegisterControllers} from "../index";
import path from "path";
import compression from "compression";

(async function Server()  {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(compression())

    const router: Router = Router()

    await AutoRegisterControllers({
        router,
        logging: true,
        controllerPath: [path.join(__dirname, "controllers/*.js")],
        classTransform: true
    })

    app.use(router)
    app.listen(5000, () => {
        console.log("Listening on port 5000");
    })
})()
