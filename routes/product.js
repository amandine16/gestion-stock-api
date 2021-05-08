const express = require("express");
const router = express.Router();

// Import du model
const Product = require("../models/Product");

router.post("/product/create", async (req, res) => {
  // Permet de créer un nouveau produit
  try {
    const { name, brand, price, quantity } = req.fields;
    //   On vérifie que tous les champs nécessaires sont remplis
    if (name && brand && price && quantity) {
      //   Test si le nom du produit existe déjà
      const nameProduct = new RegExp(name, "i");
      const existingProduct = await Product.findOne({
        product_name: nameProduct,
      });
      if (existingProduct === null) {
        const newProduct = new Product({
          product_name: name,
          product_brand: brand,
          product_price: price,
          product_quantity: quantity,
        });
        await newProduct.save();
        res.status(200).json(newProduct);
      } else {
        res.status(400).json({ message: "This product already exists" });
      }
      // console.log(existingProduct.product_brand.toLowerCase());
      // console.log(brand.toLowerCase());
      // Si le produit existe déja,je vérifie si c'est la même marque,si oui, j'augmente sa quantité
      //     if (
      //       existingProduct.product_brand.toLowerCase() === brand.toLowerCase()
      //     ) {
      //       console.log("ok");
      //       existingProduct.product_quantity =
      //         existingProduct.product_quantity + Number(quantity);
      //       await existingProduct.save();
      //       res.status(200).json({ existingProduct });
      //     } else {
      //       // si ce n'est pas la même marque, alors j'ajoute le nouveau produit dans la bdd
      //       const newProduct = new Product({
      //         product_name: name,
      //         product_brand: brand,
      //         product_price: price,
      //         product_quantity: quantity,
      //       });
      //       await newProduct.save();
      //       res.status(200).json(newProduct);
      //     }
      //   }
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/products", async (req, res) => {
  // récupère le stock total
  try {
    const allProduct = await Product.find();
    res.status(200).json(allProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.post("/product/addQuantity", async (req, res) => {
//   // Permet d'augmenter la quantité d'un produit
//   try {
//     const product = await Product.findById(req.fields._id);
//     if (product) {
//       product.product_quantity += req.fields.quantity;
//       product.save();
//       res.status(200).json(product);
//     } else {
//       res.status(400).json({ message: "Product does not exist" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// router.post("/product/removeQuantity", async (req, res) => {
//     // Permet de réduire la quantité
//   try {
//     const product = await Product.findById(req.fields._id);
//     if (product) {
//       if (product.product_quantity > 0) {
//         product.product_quantity -= req.fields.quantity;
//       }
//       product.save();
//       res.status(200).json(product);
//     } else {
//       res.status(400).json({ message: "Product does not exist" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.put("/product/update/:id", async (req, res) => {
  // Permet de modifier un produit (name, brand, quantity ...)
  try {
    const { name, brand, price, quantity } = req.fields;
    //   On récupère le produit ciblé
    const product = await Product.findById(req.params.id);
    if (product) {
      if (name) {
        product.product_name = name;
      }
      if (brand) {
        product.product_brand = brand;
      }
      if (price) {
        if (typeof price === "number") {
          //   Si le prix est bien un nombre
          product.product_price = price;
        } else {
          res.status(400).json({ message: "The price can be a number" });
        }
      }
      if (quantity) {
        if (typeof quantity === "number") {
          product.product_quantity = quantity;
        } else {
          res.status(400).json({ message: "The quantity can be a number" });
        }
      }
      product.save();
      res.status(200).json(product);
    } else {
      res.status(400).json({ message: "Product does not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
