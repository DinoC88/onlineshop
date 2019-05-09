import React, { Component } from "react";
import Spinner from "../common/Spinner";
import ProductItem from "./ProductItem";
import SearchBox from "./SearchBox";
import CheckBox from "./CheckBox";
import { Select, MenuItem, Button, Drawer } from "@material-ui/core";
import { getProduct, sortProductsByName } from "./product-helper";
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
      input: "Name: A-Z",
      sortByName: {},
      drawerOpen: false
    };
  }
  componentWillMount() {
    this.setState({ isLoading: true });
    this.showFilterResults();
  }

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
    this.showProductsByAlphabetOrder(this.state.sortByName);
  };

  handleSearchInput = e => {
    this.setState({ searchProduct: e.target.value });
    console.log(this.state.searchProduct);
  };

  onSearchButtonClick = e => {
    let newFilters = Object.assign(this.state.filters);
    newFilters.brand = this.state.searchProduct;
    console.log(newFilters);
    this.setState({
      filters: newFilters,
      isLoading: true
    });
    this.showFilterResults(this.state.filters);
  };

  showProductsByAlphabetOrder = sort => {
    sortProductsByName(sort)
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

  onCheckboxClick = e => {
    let newFilters = Object.assign(this.state.filters);
    newFilters[e.target.name] = e.target.value;
    this.setState({
      filters: newFilters,
      isLoading: true
    });
    this.showFilterResults(this.state.filters);
  };

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
            <SearchBox
              handleInput={this.handleSearchInput}
              enterSearch={this.enterKeyPressed}
              handleClick={this.onSearchButtonClick}
            />
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
