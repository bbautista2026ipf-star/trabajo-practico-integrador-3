import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Se establecio la conexion a la base de datos"))
  .catch((error) =>
    console.error("Error al establecer conexion con la base de datos", error),
  );
