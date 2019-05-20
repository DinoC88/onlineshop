import React, { Component } from "react";
import Spinner from "../../utils/Spinner";
import ProductItem from "./productcard/ProductCard";
import CheckBox from "./filterlist/CheckBox";
import CheckBoxPrice from "./filterlist/CheckBoxPrice";
import { Select, MenuItem, Button, TextField, Drawer } from "@material-ui/core";
import { getProduct } from "../../utils/requestManager";
import {
  brand,
  ram,
  price,
  color,
  internalMemory,
  displaySize,
  displayResolution
} from "../../utils/filters";
import { styles } from "./styles";

export default class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errors: null,
      searchProduct: "",
      products: [],
      filters: {},
      sort: {},
      limit: 10,
      sortInput: "",
      limitInput: "10",
      drawerOpen: false,
      drawerShowOpen: false,
      snackbarOpen: false
    };
  }
  componentWillMount() {
    this.setState({ isLoading: true });
    this.showFilterResults(
      this.state.filters,
      this.state.sort,
      this.state.limit
    );
  }
  //Sort drawer controller
  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
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
    this.showFilterResults(this.state.filters, newSort, this.state.limit);
  };
  //Show handle drawer
  handleLimitDrawerChange = e => {
    let newLimit = this.state.limit;
    if (e.target.value === "10") {
      newLimit = 10;
    } else if (e.target.value === "20") {
      newLimit = 20;
    } else if (e.target.value === "30") {
      newLimit = 30;
    } else {
      newLimit = 40;
    }
    this.setState({
      limit: newLimit,
      isLoading: true,
      limitInput: e.target.value
    });
    this.showFilterResults(this.state.filters, this.state.sort, newLimit);
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
  //Filter function
  showFilterResults = (filter, sort, show) => {
    getProduct(filter, sort, show)
      .then(products => {
        this.setState({ products: products.data, isLoading: false });
      })
      .catch(errors =>
        this.setState({
          errors,
          isLoading: false
        })
      );
  };
  // handle price function for handleFilters
  handlePrice = value => {
    const data = price;
    let array = [];
    console.log(data);
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
    this.showFilterResults(newFilters, this.state.sort, this.state.limit);
    this.setState({
      filters: newFilters
    });
  };

  render() {
    let productItems;
    const { products } = this.state;
    if (products === null || this.state.isLoading) {
      productItems = <Spinner />;
    } else {
      if (products.length > 0) {
        productItems = products.map(product => (
          <ProductItem key={product._id} product={product} />
        ));
      } else {
        productItems = <h4 style={styles.noProductFound}>No products found</h4>;
      }
    }
    return (
      <div style={styles.homepageContainer}>
        <div style={styles.filtersList}>
          <p style={styles.filtersListHeader}>Search by</p>
          <div>
            <CheckBoxPrice
              title={<b>Price</b>}
              list={price}
              handleFilters={filters => this.handleFilters(filters, "price")}
            />
          </div>
          <CheckBox
            title={<b>Brand</b>}
            list={brand}
            handleFilters={filters => this.handleFilters(filters, "brand")}
          />
          <CheckBox
            title={<b>Color</b>}
            list={color}
            handleFilters={filters => this.handleFilters(filters, "color")}
          />
          <CheckBox
            title={<b>Internal Memory</b>}
            list={internalMemory}
            handleFilters={filters => this.handleFilters(filters, "memory")}
          />
          <CheckBox
            title={<b>RAM</b>}
            list={ram}
            handleFilters={filters => this.handleFilters(filters, "ram")}
          />
          <CheckBox
            title={<b>Display size</b>}
            list={displaySize}
            handleFilters={filters =>
              this.handleFilters(filters, "displaySize")
            }
          />
          <CheckBox
            title={<b>Display Resolution</b>}
            list={displayResolution}
            handleFilters={filters =>
              this.handleFilters(filters, "displayResolution")
            }
          />
        </div>
        <div style={styles.productList}>
          <div style={styles.productsHandle}>
            <div style={styles.productFound}>
              <b>Products found:</b> {products.length}
            </div>
            <div>
              <b>Show:</b>
              <Select
                value={this.state.limitInput}
                onChange={this.handleLimitDrawerChange}
              >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="30">30</MenuItem>
                <MenuItem value="40">40</MenuItem>
              </Select>
              <Drawer
                docked={false}
                open={this.state.drawerShowOpen}
                onRequestChange={this.toggleLimitDrawer}
              />
            </div>
            <div>
              <Button
                style={styles.clearButton}
                color="primary"
                variant="contained"
                href="/dashboard"
              >
                Clear filters
              </Button>
            </div>
            <div>
              <b>Sort By:</b>
              <Select
                value={this.state.sortInput}
                onChange={this.handleDrawerChange}
              >
                <MenuItem name="name" id="name" value="Name: A-Z">
                  Name: A-Z
                </MenuItem>
                <MenuItem name="name" id="name" value="Name: Z-A">
                  Name: Z-A
                </MenuItem>
                <MenuItem name="name" id="name" value="Price: Low to High">
                  Price: Low to High
                </MenuItem>
                <MenuItem name="name" id="name" value="Price: High to Low">
                  Price: High to Low
                </MenuItem>
              </Select>
              <Drawer
                docked={false}
                open={this.state.drawerOpen}
                onRequestChange={this.toggleDrawer}
              />
            </div>
            <div style={styles.search}>
              <TextField
                label="Search phone"
                type="search"
                variant="filled"
                onChange={this.handleSearchInput}
                onKeyDown={this.enterKey}
              />
            </div>
          </div>
          {productItems}
        </div>
      </div>
    );
  }
}
