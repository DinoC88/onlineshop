import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/layout/NotFound";
import Mainpage from "./components/mainpage/Mainpage";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import Product from "./components/product/Product";
import Account from "./components/user/Account/Account";
import EditAccount from "./components/user/EditAccount/EditAccount";
import Cart from "./components/user/Cart/Cart";
import AddProduct from "./components/admin/AddProduct";
import Checkout from "./components/checkout/Checkout";
import Orders from "./components/admin/Orders";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Mainpage} />
              <Route exact path="/product/:id" component={Product} />
              <PrivateRoute exact path="/users/current" component={Account} />
              <PrivateRoute path="/user/:userId" component={EditAccount} />
              <PrivateRoute path="/cart" component={Cart} />
              <PrivateRoute path="/checkout" component={Checkout} />
              <AdminRoute path="/addproduct" component={AddProduct} />
              <AdminRoute path="/orders" component={Orders} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
