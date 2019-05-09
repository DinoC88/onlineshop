import React, { Component } from "react";
import Spinner from "../common/Spinner";
import ProductItem from "./ProductItem";
import CheckBox from "./CheckBox";
import SearchIcon from "@material-ui/icons/Search";
import { Select, MenuItem, Button, TextField, Drawer } from "@material-ui/core";
import {
  getProduct,
  sortProductsByAlphabet,
  getProductBySearch
} from "./product-helper";
import {
  brand,
  ram,
  priceTag,
  color,
  internalMemory,
  displaySize,
  displayResolution
} from "../../utils/filters";
const styles = {
  homepageContainer: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "100%",
    margin: "0 6px",
    marginTop: "-72px",
    border: "1px solid #ffffff00"
  },
  filtersListDesktop: {
    width: "25%",
    height: "100%",
    minHeight: "auto",
    marginTop: "90px",
    marginBottom: "40px",
    marginRight: "20px",
    backgroundColor: "#f5f5f5"
  },
  filterHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center"
  },
  products: {
    width: "78%",
    marginTop: "90px",
    marginBottom: "10px"
  },
  search: {
    float: "right",
    marginTop: "-50px"
  },
  productsHandle: {
    borderBottom: "1px solid #81d4fa",
    display: "flex",
    flexDirection: "row"
  },
  productFoundHeader: {
    marginTop: 5,
    fontSize: 20
  },
  clearButton: {
    marginLeft: 40
  },
  productSort: {
    marginLeft: "100px",
    marginBottom: "20px"
  },
  searchPosition: {
    position: "relative",
    marginTop: 10,
    marginRight: -80
  },
  iconStyle: {
    position: "absolute",
    top: 17,
    right: 75,
    width: 40,
    height: 40,
    backgroundColor: "#96999e",
    borderRadius: "5px"
  }
};

export default class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errors: null,
      searchProduct: "",
      searched: false,
      products: [],
      filters: {},
      input: "Name: A-Z",
      sortByName: {},
      drawerOpen: false
    };
  }
  componentWillMount() {
    this.setState({ isLoading: true });
    this.showFilterResults();
  }
  //Sort by alphabet - drawer
  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleDrawerChange = e => {
    let newSort = Object.assign(this.state.sortByName);
    newSort.name = e.target.value;
    this.setState({
      sortByName: newSort,
      isLoading: true,
      input: e.target.value
    });
    this.sortProductByAlphabet(this.state.sortByName);
  };
  //Sort by alphabet - function
  sortProductByAlphabet = sort => {
    sortProductsByAlphabet(sort)
      .then(product => {
        this.setState({ products: product.data, isLoading: false });
      })
      .catch(errors =>
        this.setState({
          errors,
          isLoading: false
        })
      );
  };
  //Searchbox input
  handleSearchInput = e => {
    this.setState({ searchProduct: e.target.value });
  };
  //Searchbox click
  onSearchButtonClick = e => {
    if (this.state.searchProduct) {
      this.showSearchResults({ name: this.state.searchProduct });
    }
  };
  //Searchbox hit enter
  enterKey = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.onSearchButtonClick();
    }
  };
  //Searchbox function
  showSearchResults = search => {
    getProductBySearch(search)
      .then(product => {
        this.setState({ products: product.data, isLoading: false });
      })
      .catch(errors =>
        this.setState({
          errors,
          isLoading: false
        })
      );
  };
  //Filter function
  showFilterResults = filter => {
    getProduct(filter)
      .then(product => {
        this.setState({ products: product.data, isLoading: false });
      })
      .catch(errors =>
        this.setState({
          errors,
          isLoading: false
        })
      );
  };
  //Filter checkbox click function
  onCheckboxClick = e => {
    let newFilters = Object.assign(this.state.filters);
    newFilters[e.target.name] = e.target.value;
    this.setState({
      filters: newFilters,
      isLoading: true
    });
    this.showFilterResults(this.state.filters);
  };
  //Filter handler
  handleFilters = (filters, category) => {
    const newFilters = Object.assign(this.state.filters);
    newFilters[category] = filters;
    this.showFilterResults(newFilters);
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
        productItems = <h4>No products found</h4>;
      }
    }
    return (
      <div style={styles.homepageContainer}>
        <div style={styles.filtersListDesktop}>
          <p style={styles.filterHeader}>Search by</p>
          <CheckBox
            title={<b>Brand</b>}
            list={brand}
            handleFilters={filters => this.handleFilters(filters, "brand")}
          />
          <CheckBox
            title={<b>Price</b>}
            list={priceTag}
            handleFilters={filters => this.handleFilters(filters, "pricetag")}
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
        <div style={styles.products}>
          <div style={styles.search}>
            <div style={styles.searchPosition}>
              <TextField
                id="outlined-search"
                label="Search phone"
                type="search"
                margin="normal"
                variant="outlined"
                onChange={this.handleSearchInput}
                onKeyDown={this.enterKey}
              />
              <Button type="submit" onClick={this.onSearchButtonClick}>
                <SearchIcon style={styles.iconStyle} />
              </Button>
            </div>
          </div>
          <div style={styles.productsHandle}>
            <div style={styles.productFoundHeader}>
              <p>
                <b>Products found:</b> {products.length}
              </p>
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
            <div style={styles.productSort}>
              <span>
                <b>Sort By:</b>
              </span>
              <Select
                className="sort-field"
                value={this.state.input}
                onChange={this.handleDrawerChange}
              >
                <MenuItem name="Name: A-Z" value="asc">
                  Name: A-Z
                </MenuItem>
                <MenuItem name="Name: Z-A" value="desc">
                  Name: Z-A
                </MenuItem>
              </Select>
              <Drawer
                docked={false}
                open={this.state.drawerOpen}
                onRequestChange={this.toggleDrawer}
              />
            </div>
          </div>
          {productItems}
        </div>
      </div>
    );
  }
}
