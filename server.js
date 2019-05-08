const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const path = require("path");

//Routes
const users = require("./routes/users");
const product = require("./routes/product");
const cart = require("./routes/cart");
const orders = require("./routes/orders");

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

//db connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Use routes
app.use("/users", users);
app.use("/product", product);
app.use("/cart", cart);
app.use("/order", orders);

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on ` + PORT));
