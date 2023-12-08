**Install With Express**
```TypeScript
import express, {Express, Router} from "express";

const app: Express = express();  
const port: number = 3090;  
const router: Router = express.Router();

//Map router to express app
app.use(router);
// Add this AutoRegisterControllers
const config = {
	router, 
	logging: true, 
	controllerPath: [UserController, path.join(__dirname, "controllers/*.js")]}
};
AutoRegisterControllers(config);  

```

### Examples

##### Basic
1. Create a file `UserController.ts`
```TypeScript
import {Get, Post} from "express-router-controller-khmer";

export default class UserController {  
  @Get('/users')  
  getUsers(req: Request, res: Response) {  
	  return res.send('Get all users');  
  }
}
 
 @Post('/users')  
  getUsers(req: Request, res: Response) {  
	  const body = request.body;
	  return res.send(body);  
  }
}
 ```
#####  With Prefix route
    Note: Prefix can only be defined on controller class.
```TypeScript
import {Get, Post, Prefix} from "express-router-controller-khmer";

@Prefix("/api")
export default class UserController {  
  @Get('/users')  
  getUsers(req: Request, res: Response) {  
	  return res.send('Get all users');  
  }
}
 
 @Post('/users')  
  getUsers(req: Request, res: Response) {  
	  const body = request.body;
	  return res.send(body);  
  }
}
 ```
#####  Middleware on single route
    Note: Prefix can only be defined on methods.
```TypeScript
import {Get, Post, Prefix, AuthMiddleware} from "express-router-controller-khmer";
import authMiddleware from "./authMiddleware";

@Prefix("/api")
export default class UserController {  
  @Get('/users')  
  @AuthMiddleware(authMiddleware)
  getUsers(req: Request, res: Response) {  
	  return res.send('Get all users');  
  }
}
 
 @Post('/users')  
  getUsers(req: Request, res: Response) {  
	  const body = request.body;
	  return res.send(body);  
  }
}
 ```
#####  Sample Middleware function
Example file `authMiddleware.ts`
```TypeScript
import {Request, Response, NextFunction} from "express";

export default authMiddleware(req: Request, res: Response, next: NextFunction) {  
  const token = req.body.token;  
  if (token) {  
	 next();  
  } else {  
	 res.send("Unauthorized token!");  
  }
}
 ```