import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String},
})

//para cuando tengamos que hacer operaciones de grabar, va a usar este product como esquema
export default mongoose.model("Product", productSchema, "Products")
//primer parámetro: cómo se va a llamar nuestro modelo: Product
// 3ero: cómo se llama nuestra collection en mongo