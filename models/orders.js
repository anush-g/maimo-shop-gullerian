import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    total: { type: Number },
    products: { type: Array },
    clientId: { type: String },
  },
  {
    timestamps: true, //esto agrega automaticamente 2 registros más en mi objeto: dos timestamps
  }
);
//le paso un objeto con los datos de la order

//para cuando tengamos que hacer operaciones de grabar, va a usar este product como esquema
export default mongoose.model("Order", orderSchema, "Orders");
//primer parámetro: cómo se va a llamar nuestro modelo: Product
// 3ero: cómo se llama nuestra collection en mongo
