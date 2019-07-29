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
import Order from "./components/user/Order/Order";
import OrderHistory from "./components/user/OrderHistory/OrderHistory";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import english from "./utils/english";
import german from "./utils/german";

import { setLocale } from "./actions/locale";
class App extends Component {
  render() {
    const { lang } = this.props;
    return (
      <IntlProvider
        locale={this.props.lang}
        messages={lang === "de" ? german : english}
      >
        <BrowserRouter>
          <Route path="/(.+)" render={() => <Navbar />} />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Mainpage} />
            <Route exact path="/product/:id" component={Product} />
            <PrivateRoute exact path="/users/current" component={Account} />
            <PrivateRoute path="/user/:userId" component={EditAccount} />
            <PrivateRoute path="/orderhistory" component={OrderHistory} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/checkout" component={Checkout} />
            <AdminRoute path="/addproduct" component={AddProduct} />
            <PrivateRoute path="/order/:id" component={Order} />
            <Route component={NotFound} />
          </Switch>
          <Route path="/(.+)" render={() => <Footer />} />
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

App.propType = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  lang: state.locale.lang
});
export default connect(
  mapStateToProps,
  { setLocale }
)(App);
