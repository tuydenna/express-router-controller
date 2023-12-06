
import createHttpError from "http-errors";
import express, {Express, Router} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import {AutoRegisterController} from "./routes/router";

const app: Express = express();
const port: number = 3090;
const router: Router = express.Router();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public')));
app.use(router);

//new AutoRegisterController(router, true);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function (){
  console.log("server is running on port:" + port);
})
