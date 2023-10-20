import "dotenv/config";
import express from "express";
import createError from "http-errors";
import cors from "cors";
import indexRoutes from "./routes/index.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import { connectDb } from "./db.js";

/* Clear the console  */
console.log("\x1Bc");

const app = express();
const port = 4000;

app.set("port", process.env.PORT || port); //va a ver si existe el port. si existe, sino,
//sirve para garantizarnos que en vercel va a funcionar.

connectDb(); //llamo a la función que importé de db.js

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "local"
        ? [`http://${process.env.FRONT_URL}`] //si es local, entonces usá esta url
        : [
            `https://${process.env.FRONT_URL}`, //y si no es local, usá la que le pongas pero con httpS. esto nos permite tener ENTORNOS
            `https://www.${process.env.FRONT_URL}`, //o sea si no es local permite los orígenes desde estos dominios
          ],
    credentials: true,
    exposedHeaders: "Authorization", //con esto nos aseguramos cuando estamos haciendo un pedido de un mpoint de que el cors no nos salte error
  })
);

/* Routes */
app.use("/", indexRoutes); //acá adentro puedo agregar el middleware, que se usa para autenticar si esta ruta está protegida, si tiene autorización
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

/* Error handler  */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ message: err.message || "error" });
});

/* Starting server */
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
