import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/layout/Landing/Landing";
import Footer from "./components/layout/Footer/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/layout/NotFound/NotFound";
import Mainpage from "./components/mainpage/Mainpage";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import Product from "./components/product/Product";
import Account from "./components/user/Account/Account";
import EditAccount from "./components/user/EditAccount/EditAccount";
import Cart from "./components/user/Cart/Cart";
import AddProduct from "./components/admin/AddProduct/AddProduct";
import Checkout from "./components/checkout/Checkout";
import Orders from "./components/admin/Orders/Orders";
import Order from "./components/user/Order/Order";
import OrderHistory from "./components/user/OrderHistory/OrderHistory";
import { getCartData } from "./utils/requestManager";
import setAuthToken from "./utils/setAuthToken";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCartNum: 0
    };
  }
  async componentWillMount() {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    const cartData = await getCartData();
    let cartQuantity = cartData.data.items
      ? cartData.data.items.reduce((acc, item) => (acc += item.quantity), 0)
      : 0;
    this.setState({ currentCartNum: cartQuantity });
  }
  getCartNum = async () => {
    const cartData = await getCartData();
    let cartQuantity = cartData.data.items
      ? cartData.data.items.reduce((acc, item) => (acc += item.quantity), 0)
      : 0;
    this.setState({ currentCartNum: cartQuantity });
  };

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/(.+)"
          render={() => <Navbar currentCartNum={this.state.currentCartNum} />}
        />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/dashboard"
            render={props => (
              <Mainpage {...props} getCartNum={this.getCartNum} />
            )}
          />
          <Route
            exact
            path="/product/:id"
            render={props => (
              <Product {...props} getCartNum={this.getCartNum} />
            )}
          />
          <PrivateRoute exact path="/users/current" component={Account} />
          <PrivateRoute path="/user/:userId" component={EditAccount} />
          <PrivateRoute path="/orderhistory" component={OrderHistory} />
          <PrivateRoute
            path="/cart"
            component={Cart}
            getCartNum={this.getCartNum}
          />
          <PrivateRoute
            path="/checkout"
            component={Checkout}
            getCartNum={this.getCartNum}
          />
          <AdminRoute path="/addproduct" component={AddProduct} />
          <AdminRoute path="/orders" component={Orders} />
          <PrivateRoute path="/order/:id" component={Order} />
          <Route component={NotFound} />
        </Switch>
        <Route path="/(.+)" render={() => <Footer />} />
      </BrowserRouter>
    );
  }
}

export default App;
