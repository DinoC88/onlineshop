import React, { Component } from "react";
import Spinner from "../../utils/Spinner";
import ProductCard from "./productcard/ProductCard";
import FiltersList from "./filterlist/FiltersList";
import ProductHandle from "./producthandle/ProductHandle";
import { Grid } from "@material-ui/core";
import { price } from "../../utils/filters";
import { styles } from "./styles";
import Pagination from "./pagination/Pagination";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { fetchCart, addCart } from "../../actions/cartActions";
import { fetchProducts } from "../../actions/productAction";
import { fetchCurrentUser } from "../../actions/userActions";
import setAuthToken from "../../utils/setAuthToken";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar/SearchBar";
import decode from "jwt-decode";
class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errors: null,
      searchProduct: "",
      products: [],
      filters: {},
      sort: { name: "asc" },
      limit: 5,
      currentPage: 1,
      totalPages: 0,
      totalProducts: 0,
      sortInput: "Name: A-Z",
      limitInput: "5",
      drawerSortOpen: false,
      drawerShowOpen: false
    };
  }

  async componentWillMount() {
    this.setState({ isLoading: true });
    await this.showFilterResults(
      this.state.filters,
      this.state.sort,
      this.state.limit,
      this.state.currentPage
    );
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    let decoded = decode(token);
    await this.props.fetchCart(decoded._id);
    await this.props.fetchCurrentUser();
  }
  //Sort drawer controller
  toggleSortDrawer = () => {
    this.setState({ drawerSortOpen: !this.state.drawerSortOpen });
  };
  //Limit drawer controller
  toggleLimitDrawer = () => {
    this.setState({ drawerShowOpen: !this.state.drawerLimitOpen });
  };
  //Sort products
  handleDrawerChange = e => {
    let newSort = {};
    if (e.target.value === "Name: A-Z") {
      newSort.name = "asc";
    } else if (e.target.value === "Name: Z-A") {
      newSort.name = "desc";
    } else if (e.target.value === "Price: Low to High") {
      newSort.price = "asc";
    } else {
      newSort.price = "desc";
    }
    this.setState({
      sort: newSort,
      isLoading: true,
      sortInput: e.target.value
    });
    this.showFilterResults(this.state.filters, newSort, this.state.limit, 1);
  };
  //Show handle drawer
  handleLimitDrawerChange = e => {
    let newLimit = this.state.limit;
    if (e.target.value === "5") {
      newLimit = 5;
    } else if (e.target.value === "10") {
      newLimit = 10;
    } else if (e.target.value === "20") {
      newLimit = 20;
    } else {
      newLimit = 50;
    }
    this.setState({
      limit: newLimit,
      isLoading: true,
      limitInput: e.target.value
    });
    this.showFilterResults(this.state.filters, this.state.sort, newLimit, 1);
  };
  //Searchbox input
  handleSearchInput = e => {
    this.setState({ searchProduct: e.target.value });
  };
  //Searchbox on hit enter
  enterKey = (event, filters) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleFilters(filters, "name");
    }
  };
  //Remove search input
  removeSearch = () => {
    this.setState({ searchProduct: "" });
  };
  //Filter function
  showFilterResults = async (filter, sort, show, currentPage) => {
    try {
      await this.props.fetchProducts(filter, sort, show, currentPage);
      this.setState({
        products: this.props.products,
        totalPages: this.props.totalPages,
        totalProducts: this.props.totalProducts,
        isLoading: false
      });
    } catch (errors) {
      this.setState({
        errors,
        isLoading: false
      });
    }
  };
  // handle price function for handleFilters
  handlePrice = value => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };
  //Filters handler
  handleFilters = (filters, category, e) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;
    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    } else if (category === "name") {
      let search = this.state.searchProduct;
      newFilters[category] = search;
    }
    this.showFilterResults(newFilters, this.state.sort, this.state.limit, 1);
    this.setState({
      filters: newFilters,
      currentPage: 1
    });
  };

  nextPage = pageNumber => {
    this.setState({
      currentPage: pageNumber
    });
    this.showFilterResults(
      this.state.filters,
      this.state.sort,
      this.state.limit,
      pageNumber
    );
  };

  render() {
    let productItems;
    const { products, totalProducts, totalPages } = this.props;
    const { currentPage, limit } = this.state;
    if (products === null || products === undefined || this.props.isLoading) {
      productItems = <Spinner />;
    } else {
      if (products.length > 0) {
        productItems = products.map(product => (
          <ProductCard key={product._id} product={product} />
        ));
      } else {
        productItems = (
          <h4 style={styles.noProductFound}>
            <FormattedMessage
              id="productNotFound"
              defaultMessage="No products found"
            />
          </h4>
        );
      }
    }
    return (
      <div style={styles.pageContainer}>
        <div style={styles.homepageContainer}>
          <Grid container>
            <Grid item xs={12} lg={3}>
              <FiltersList handleFilters={this.handleFilters} />
            </Grid>
            <Grid item xs={12} lg={9}>
              <div>
                <Grid container>
                  <Grid item xs={12} lg={12}>
                    <SearchBar
                      searchProduct={this.state.searchProduct}
                      handleSearchInput={this.handleSearchInput}
                      enterKey={this.enterKey}
                      removeSearch={this.removeSearch}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <ProductHandle
                      limitInput={this.state.limitInput}
                      handleLimitDrawerChange={this.handleLimitDrawerChange}
                      drawerShowOpen={this.state.drawerShowOpen}
                      toggleLimitDrawer={this.toggleLimitDrawer}
                      sortInput={this.state.sortInput}
                      handleDrawerChange={this.handleDrawerChange}
                      drawerSortOpen={this.state.drawerSortOpen}
                      toggleSortDrawer={this.toggleSortDrawer}
                      totalProducts={totalProducts}
                    />
                  </Grid>
                </Grid>
                {productItems}
                {totalProducts > limit ? (
                  <Pagination
                    pages={Math.ceil(totalPages)}
                    nextPage={this.nextPage}
                    limit={limit}
                    totalProducts={totalProducts}
                    currentPage={currentPage}
                  />
                ) : (
                  ""
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Mainpage.propTypes = {
  addCart: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.product.products,
  isLoading: state.product.isLoading,
  totalPages: state.product.totalPages,
  totalProducts: state.product.totalProducts
});

export default connect(
  mapStateToProps,
  { fetchCart, fetchProducts, addCart, fetchCurrentUser }
)(Mainpage);
