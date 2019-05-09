const express = require("express");
const router = express.Router();

//Load model
const Product = require("../models/Product");

//@route POST /product/list
//@desc  POST list of products
//@access Public
router.post("/list", (req, res) => {
  let findArgs = {};
  for (let key in req.body) {
    if (req.body[key].length > 0) {
      findArgs[key] = req.body[key];
    }
  }
  Product.find(findArgs)
    .then(product => {
      if (!product) {
        errors.noproduct = "There are no products";
        return res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.json(err));
});

//@route POST /product/search
//@desc  POST searched product
//@access Public
router.post("/search", (req, res) => {
  let search = { name: { $regex: req.body.name, $options: "i" } };
  Product.find(search)
    .then(product => {
      if (!product) {
        errors.noproduct = "There are no products";
        return res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.json(err));
});

//@route POST /product
//@desc  POST sort Products Name By Alphabet
//@access Public
router.post("/", (req, res) => {
  Product.find()
    .sort(req.body)
    .then(product => {
      if (!product) {
        errors.noproduct = "There are no products";
        return res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.json(err));
});

//@route POST /product/product
//@desc  POST product
//@access public (should change to private)
router.post("/addproduct", (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    image: req.body.image,
    displaySize: req.body.displaySize,
    price: req.body.price,
    displayResolution: req.body.displayResolution,
    cpu: req.body.cpu,
    memory: req.body.memory,
    ram: req.body.ram,
    camera: req.body.camera,
    brand: req.body.brand,
    color: req.body.color,
    pricetag: req.body.pricetag
  });

  newProduct
    .save()
    .then(product => res.json({ status: product.name + " has added" }))
    .catch(err => console.log(err));
});

//@route GET /product/:product_id
//@desc  Get product by id
//@access Public
router.get("/:id", (req, res) => {
  const errors = {};
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        errors.noproduct = "There is no information for this product";
        res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => err => res.json(err));
});

module.exports = router;
