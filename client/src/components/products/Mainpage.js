import React, { Component } from "react";
import Spinner from "../common/Spinner";
import ProductItem from "./productitem/ProductItem";
import CheckBox from "./checkbox/CheckBox";
import CheckBoxPrice from "./checkbox/CheckBoxPrice";
import SearchIcon from "@material-ui/icons/Search";
import { Select, MenuItem, Button, TextField, Drawer } from "@material-ui/core";
import { getProduct } from "./product-helper";
import {
  brand,
  ram,
  price,
  color,
  internalMemory,
  displaySize,
  displayResolution
} from "../../utils/filters";

const styles = {
  homepageContainer: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "100vh",
    border: "1px solid #ffffff00",
    marginTop: "-70px"
  },
  filtersList: {
    width: "25%",
    height: "100%",
    minHeight: "auto",
    margin: "90px 20px 40px 0px",
    backgroundColor: "#f5f5f5"
  },
  filtersListHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center"
  },
  productList: {
    width: "78%",
    marginTop: "90px",
    marginBottom: "10px"
  },
  productsHandle: {
    borderBottom: "1px solid #333333",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  productFound: {
    fontSize: 20,
    marginTop: 10
  },
  search: {
    marginTop: -20,
    justifyContent: "flex-end"
  },
  clearButton: {
    color: "white",
    marginBottom: 17
  },
  iconStyle: {
    width: 40,
    height: 40,
    backgroundColor: "#333333",
    color: "white",
    borderRadius: "5px"
  },
  noProductFound: {
    fontSize: "50px",
    fontWeight: "bold",
    marginTop: 50,
    display: "flex",
    justifyContent: "center"
  }
};

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
      input: "",
      drawerOpen: false
    };
  }
  componentWillMount() {
    this.setState({ isLoading: true });
    this.showFilterResults(this.state.filters, this.state.sort);
  }
  //Sort drawer controller
  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
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
      input: e.target.value
    });
    this.showFilterResults(this.state.filters, newSort);
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
  showFilterResults = (filter, sort) => {
    getProduct(filter, sort)
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
    this.showFilterResults(newFilters, this.state.sort);
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

          <CheckBoxPrice
            title={<b>Price</b>}
            list={price}
            handleFilters={filters => this.handleFilters(filters, "price")}
          />
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
              <Button
                style={styles.clearButton}
                color="secondary"
                variant="contained"
                href="/dashboard"
              >
                Clear filters
              </Button>
            </div>
            <div>
              <span>
                <b>Sort By:</b>
              </span>
              <Select
                value={this.state.input}
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
                variant="outlined"
                onChange={this.handleSearchInput}
                onKeyDown={this.enterKey}
              />
              <Button
                type="submit"
                onClick={filters => this.handleFilters(filters, "name")}
              >
                <SearchIcon style={styles.iconStyle} />
              </Button>
            </div>
          </div>
          {productItems}
        </div>
      </div>
    );
  }
}
