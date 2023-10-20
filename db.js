import mongoose from "mongoose";
import chalk from "chalk";
import "dotenv/config";

// DB Connection
const connectDb = async () => {
  let connectionString = process.env.DB_PROTOCOL;
  if (process.env.DB_USER && process.env.DB_PASS) {
    connectionString += `${process.env.DB_USER}:${process.env.DB_PASS}@`;
  }
  connectionString += `${process.env.DB_HOST}/${process.env.DB_NAME}`;
  //   este es el string de conexión

  //una vez que tenemos la conexión a la base de datos no hay que volver a conectarla
  mongoose //va a hacer la conexión a la base de datos
    .connect(`${connectionString}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    //then y catch son formas de llamar a las promesas async y await
    //si esto conectó, va a ir por el then y va a ejecutar este callback
    //si hubo un error porq está mal el pass o el user, va a ir por el catch y va a tirar ese consoleLog en rojo (chalk)
    .then(() => console.log(chalk.green("Conected to database")))
    .catch((err) =>
      console.log(
        chalk.bgRed.white("Database not connected", err.code, err.input)
      )
    );
};

const disconnectDb = async () => {
  try {
    await mongoose.connection.close();
    console.log(chalk.green("Disconnected from Database"));
  } catch (err) {
    console.log(err);
  }
};

export { connectDb, disconnectDb };
