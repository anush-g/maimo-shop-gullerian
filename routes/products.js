import express from "express";
const router = express.Router();

import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
  //esta es una función asincrónica
  try {
    const products = await Product.find().select("_id name"); //con esto va a ir y buscar las cosas. con el select le decimos qué campitos queremos que traiga
    return res.status(200).send({ message: "All products", products });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).select("_id name"); //quiero encontrar un producto que como criterio tenga que su id sea igual al id que me vino en req.params
    return res.status(200).send({ message: "Product info", product });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const addProduct = async (req, res) => {
  const { name } = req.body; //obtenemos el name desde el req.body
  try {
    const product = new Product({ name });
    await product.save();

    return res.status(200).send({ message: `Product Created ${name}` });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }

  //Agregar magia para crear el producto en la base de datos!!
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    //chequeo si existe
    const productToUpdate = await Product.findOne({ _id: id });

    if (!productToUpdate) {
      return res.status(501).send({ message: "Error product not found" });
    }

    productToUpdate.name = name; //esto se llama mutación
    await productToUpdate.save();

    return res
      .status(200)
      .send({ message: "Product Updated", product: productToUpdate });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productToDelete = await Product.findOne({ _id: id });

    if (!productToDelete) {
      return res.status(501).send({ message: "Error product not found" });
    }
    //buscamos el producto, chequeamos que existe: si el producto existe, va a ser un objeto - si no existe, va a ser null y no va a entrar en este if, y si existe hacemos el deleteOne
    await Product.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "Product deleted", product: productToDelete });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};

//CRUD (Create, Read, Update, Delete)
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
