# express-router-controller-khmer

A lightweight, TypeScript-first decorator-based controller library for Express.js. Inspired by frameworks like NestJS and routing-controllers, this library makes it easy to organize your Express routes using classes and decorators.

---

## Features

- **Class-based controllers** with route decorators (`@Get`, `@Post`, etc.)
- **Parameter decorators** for easy access to request data (`@Body`, `@Param`, `@Query`, `@Req`, `@Res`)
- **Prefix and middleware support** at the controller and method level
- **TypeScript support** out of the box
- **Pluggable error and response interceptors**

---

## Installation

```bash
npm install express-router-controller-khmer
```

---

## Quick Start

### 1. Setup Express

```ts
import express from "express";
import { AutoRegisterControllers } from "express-router-controller-khmer";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

await AutoRegisterControllers({
  router,
  controllerPath: [path.join(__dirname, "controllers/*.js")],
  logging: true,
});

app.use(router);
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
```

---

### 2. Create a Controller

```ts
import { Prefix, Get, Post, Body, Param, Res } from "express-router-controller-khmer";

@Prefix("/users")
export default class UserController {
  @Post("")
  createUser(@Body() data, @Res() res) {
    // handle user creation
    return data
  }

  @Get("/:id")
  getUser(@Param("id") id: string, @Res() res) {
    // handle get user
    return {id}
  }
}
```

---

## Decorators

- `@Prefix(path: string)` — Set a base path for the controller.
- `@Get(path: string)` — Handle GET requests.
- `@Post(path: string)` — Handle POST requests.
- `@Delete(path: string)` — Handle DELETE requests.
- `@Put(path: string)` — Handle PUT requests.
- `@Param(name?: string)` — Inject route parameter(s).
- `@Query(name?: string)` — Inject query parameter(s).
- `@Body()` — Inject request body.
- `@Req()` — Inject the raw Express request object.
- `@Res()` — Inject the raw Express response object.
- `@Middleware(fn)` — Attach middleware to a route.

---

## Middleware

You can add middleware at the method level using the `@Middleware` decorator:

```ts
import { Middleware } from "express-router-controller-khmer";
import authMiddleware from "./authMiddleware";

@Middleware(authMiddleware)
@Delete(":/id")
deleteUser(@Param("id") id: string, @Res() res) {
  // ...
}
```

---

## Error and Response Interceptors

You can provide your own error and response interceptors for custom handling:

```ts
// Response Interceptor Example
import {IResponseInterceptor} from "express-router-controller-khmer";
import {Request, Response} from "express";

export default class ResponseInterceptor implements IResponseInterceptor {
    response(data: any, req: Request, res: Response) {
        res.json({data});
    }
}
```
```ts
// Error Interceptor Example
import {IErrorInterceptor} from "express-router-controller-khmer";
import {Request, Response} from "express";

class ErrorInterceptor implements IErrorInterceptor {
    errorException(error: any, req: Request, res: Response) {
        res.status(error.code || 500).json({message: error.message || "internal error"});
    }
}
```

```ts
await AutoRegisterControllers({
  router,
  controllerPath: [path.join(__dirname, "controllers/*.js")],
  responseInterceptor: new myResponseInterceptor(),
  errorInterceptor: new myErrorInterceptor(),
});
```

---

## Best Practices

- Always use `express.json()` and `express.urlencoded()` before registering controllers.
- Do not mutate shared state in your controllers or handlers.
- Use TypeScript for best experience and type safety.

---

## License

MIT

---

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## Author

Xiao Din 🔥