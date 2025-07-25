# express-router-controller-khmer

A lightweight, TypeScript-first decorator-based controller library for Express.js. Inspired by frameworks like NestJS and routing-controllers, this library makes it easy to organize your Express routes using classes and decorators.

---

## Features

- **Class-based controllers** with route decorators (`@Get`, `@Post`, etc.)
- **Parameter decorators** for easy access to request data (`@Body`, `@Param`, `@Query`, `@Req`, `@Res`)
- **Prefix and middleware support** at the controller and method level
- **TypeScript support** out of the box
- **Pluggable error and response interceptors**
- **Automatic class transformation and property decorators** — Seamlessly transform and validate request data into class instances using decorators like `@Transform` (with callbacks such as `ToNumber`) for type conversion and custom logic.

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
  classTransform: true, // Enable class transformation feature
});

app.use(router);
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
```

---

### 2. Create a Controller and Use Class Transform

You can define DTO (Data Transfer Object) classes with property decorators to automatically transform and validate incoming request data. This is especially useful for type conversion and input sanitization.

#### Example DTO with Property Decorators
```ts
import { Transform, ToNumber } from "express-router-controller-khmer";

export default class UserDto {
  @Transform(ToNumber)
  age: number;

  @Transform(value => value.trim())
  name: string;
}
```

#### Example Controller Using DTO
```ts
import { Prefix, Post, Body } from "express-router-controller-khmer";
import UserDto from "./dto/user.dto";

@Prefix("/users")
export default class UserController {
  @Post("")
  createUser(@Body() data: UserDto) {
    // data.age is a number, data.name is trimmed
    return data;
  }
}
```

**How it works:**
- When `classTransform: true` is enabled, the library will automatically instantiate your DTO classes and apply all property transformations defined by `@Transform` and built-in decorators.
- This ensures that incoming data is properly typed and formatted before it reaches your business logic.
- You can create your own custom property decorators using the `@Transform` utility.

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
- `@Transform(fn)` — Transform a property value when using class transformation.
- `ToNumber` — A callback function for `@Transform` that converts a value to a number (usage: `@Transform(ToNumber)`).

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

---

## Best Practices

- Always use `express.json()` and `express.urlencoded()` before registering controllers.
- Do not mutate shared state in your controllers or handlers.
- Use TypeScript for best experience and type safety.
- Use class transformation and property decorators to ensure your input data is clean and correctly typed. Use transformation callbacks like `ToNumber` with `@Transform` for type conversion.

---

## License

MIT

---

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## Author

Xiao Din 🔥