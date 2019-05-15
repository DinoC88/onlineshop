import React, { Component } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Drawer
} from "@material-ui/core";
import { addNewProduct } from "./admin-helper";

const styles = {
  addProductContainer: {
    height: "90vh"
  },
  addProductForm: {
    display: "flex",
    justifyContent: "space-around"
  },
  inputColumn: {
    height: "90vh",
    display: "flex",
    flexDirection: "column"
  },
  headerStyle: {
    textAlign: "center"
  },
  buttonStyle: {
    paddingTop: 25
  },
  formStyle: {
    marginTop: 25,
    width: 350
  },
  warningStyle: {
    color: "red",
    fontSize: "12px"
  }
};

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      input: "",
      inputChange: "",
      name: "",
      image: "",
      displayResolution: "",
      displaySize: "",
      cpu: "",
      memory: "",
      ram: "",
      camera: "",
      price: "",
      brand: "",
      pricetag: "",
      color: "",
      errors: {}
    };
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleDrawerChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.color);
  };
  onProductChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onProductSubmit = e => {
    e.preventDefault();
    const newProduct = {
      name: this.state.name,
      image: this.state.image,
      displayResolution: this.state.displayResolution,
      displaySize: this.state.displaySize,
      cpu: this.state.cpu,
      ram: this.state.ram,
      camera: this.state.camera,
      price: this.state.price,
      memory: this.state.memory,
      pricetag: this.state.pricetag,
      color: this.state.color,
      brand: this.state.brand
    };
    addNewProduct(newProduct)
      .then(res => this.props.history.push("/dashboard"))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { errors } = this.state;

    return (
      <div style={styles.addProductContainer}>
        <h3 style={styles.headerStyle}>Add new product</h3>
        <form
          noValidate
          onSubmit={this.onProductSubmit}
          style={styles.addProductForm}
        >
          <div style={styles.inputColumn}>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  value={this.state.name}
                  autoComplete="name"
                  onChange={this.onProductChange}
                />
                {errors.name && (
                  <div style={styles.warningStyle}>{errors.name}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="image">Photo Link</InputLabel>
                <Input
                  id="image"
                  name="image"
                  value={this.state.image}
                  autoComplete="image"
                  onChange={this.onProductChange}
                />
                {errors.image && (
                  <div style={styles.warningStyle}>{errors.image}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="displayResolution">
                  Display Resolution
                </InputLabel>
                <Input
                  id="displayResolution"
                  name="displayResolution"
                  type="text"
                  value={this.state.displayResolution}
                  autoComplete="displayResolution"
                  onChange={this.onProductChange}
                />
                {errors.displayResolution && (
                  <div style={styles.warningStyle}>
                    {errors.displayResolution}
                  </div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="displaySize">Display Size</InputLabel>
                <Input
                  id="displaySize"
                  name="displaySize"
                  type="text"
                  value={this.state.displaySize}
                  autoComplete="displaySize"
                  onChange={this.onProductChange}
                />
                {errors.displaySize && (
                  <div style={styles.warningStyle}>{errors.displaySize}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="cpu">CPU</InputLabel>
                <Input
                  id="cpu"
                  name="cpu"
                  value={this.state.cpu}
                  autoComplete="cpu"
                  onChange={this.onProductChange}
                />
                {errors.cpu && (
                  <div style={styles.warningStyle}>{errors.cpu}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel>Select RAM</InputLabel>
                <Select
                  style={{ width: 350 }}
                  inputProps={{
                    name: "ram"
                  }}
                  value={this.state.ram}
                  onChange={this.handleDrawerChange}
                >
                  <MenuItem value="1 GB">1 GB</MenuItem>
                  <MenuItem value="2 GB">2 GB</MenuItem>
                  <MenuItem value="3 GB">3 GB</MenuItem>
                  <MenuItem value="4 GB">4 GB</MenuItem>
                  <MenuItem value="5 GB">5 GB</MenuItem>
                  <MenuItem value="6 GB">6 GB</MenuItem>
                  <MenuItem value="7 GB">7 GB</MenuItem>
                  <MenuItem value="8 GB">8 GB</MenuItem>
                </Select>
                <Drawer
                  docked={false}
                  open={this.state.drawerOpen}
                  onRequestChange={this.toggleDrawer}
                />
                {errors.ram && (
                  <div style={styles.warningStyle}>{errors.ram}</div>
                )}
              </FormControl>
            </div>
          </div>

          <div style={styles.inputColumn}>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="camera">Camera</InputLabel>
                <Input
                  id="camera"
                  name="camera"
                  value={this.state.camera}
                  autoComplete="camera"
                  onChange={this.onProductChange}
                />
                {errors.camera && (
                  <div style={styles.warningStyle}>{errors.camera}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel>Select Memory</InputLabel>
                <Select
                  style={{ width: 350 }}
                  inputProps={{
                    name: "memory"
                  }}
                  value={this.state.memory}
                  onChange={this.handleDrawerChange}
                >
                  <MenuItem value="8 GB">8 GB</MenuItem>
                  <MenuItem value="16 GB">16 GB</MenuItem>
                  <MenuItem value="32 GB">32 GB</MenuItem>
                  <MenuItem value="64 GB">64 GB</MenuItem>
                  <MenuItem value="128 GB">128 GB</MenuItem>
                  <MenuItem value="256 GB">256 GB</MenuItem>
                  <MenuItem value="512 GB">256 GB</MenuItem>
                </Select>
                <Drawer
                  docked={false}
                  open={this.state.drawerOpen}
                  onRequestChange={this.toggleDrawer}
                />
                {errors.memory && (
                  <div style={styles.warningStyle}>{errors.memory}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel htmlFor="price">Price</InputLabel>
                <Input
                  id="price"
                  name="price"
                  value={this.state.price}
                  autoComplete="price"
                  onChange={this.onProductChange}
                />
                {errors.price && (
                  <div style={styles.warningStyle}>{errors.price}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle} required>
                <InputLabel>Select Brand</InputLabel>
                <Select
                  style={{ width: 350 }}
                  inputProps={{
                    name: "brand"
                  }}
                  value={this.state.brand}
                  onChange={this.handleDrawerChange}
                >
                  <MenuItem value="Apple">Apple</MenuItem>
                  <MenuItem value="Samsung">Samsung</MenuItem>
                  <MenuItem value="Huawei">Huawei</MenuItem>
                  <MenuItem value="LG">LG</MenuItem>
                  <MenuItem value="HTC">HTC</MenuItem>
                </Select>
                <Drawer
                  docked={false}
                  open={this.state.drawerOpen}
                  onRequestChange={this.toggleDrawer}
                />
                {errors.brand && (
                  <div style={styles.warningStyle}>{errors.brand}</div>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl style={styles.formStyle}>
                <InputLabel>Select Color*</InputLabel>
                <Select
                  style={{ width: 350 }}
                  value={this.state.color}
                  onChange={this.handleDrawerChange}
                  inputProps={{
                    name: "color"
                  }}
                >
                  <MenuItem value="White">White</MenuItem>
                  <MenuItem value="Black">Black</MenuItem>
                  <MenuItem value="Gray">Gray</MenuItem>
                  <MenuItem value="Blue">Blue</MenuItem>
                </Select>
                <Drawer
                  docked={false}
                  open={this.state.drawerOpen}
                  onRequestChange={this.toggleDrawer}
                />
                {errors.color && (
                  <div style={styles.warningStyle}>{errors.color}</div>
                )}
              </FormControl>
            </div>
            <div style={styles.buttonStyle}>
              <Button type="submit" variant="contained" color="primary">
                Add new product
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
