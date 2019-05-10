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
  addProductPage: {
    height: "90vh"
  },
  addProduct: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  headerStyle: {
    textAlign: "center"
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: 25
  },
  formStyle: {
    marginTop: 25,
    width: 350
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
      color: ""
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
    return (
      <div style={styles.addProductPage}>
        <h3 style={styles.headerStyle}>Add new product</h3>

        <div>
          <div>
            <form noValidate onSubmit={this.onProductSubmit}>
              <div style={styles.column}>
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
                  </FormControl>
                </div>
              </div>
              <div style={styles.column}>
                <div>
                  <FormControl style={styles.formStyle} required>
                    <InputLabel htmlFor="ram">RAM</InputLabel>
                    <Input
                      id="ram"
                      name="ram"
                      value={this.state.ram}
                      autoComplete="ram"
                      onChange={this.onProductChange}
                    />
                  </FormControl>
                </div>
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
                  </FormControl>
                </div>
                <div>
                  <FormControl style={styles.formStyle} required>
                    <InputLabel htmlFor="memory">Memory</InputLabel>
                    <Input
                      id="memory"
                      name="memory"
                      value={this.state.memory}
                      autoComplete="memory"
                      onChange={this.onProductChange}
                    />
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
                  </FormControl>
                </div>
                <div>
                  <FormControl style={styles.formStyle}>
                    <InputLabel>Select Brand*</InputLabel>
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
                  </FormControl>
                </div>
                <div>
                  <FormControl style={styles.formStyle}>
                    <InputLabel>Select Price tag*</InputLabel>
                    <Select
                      style={{ width: 350 }}
                      value={this.state.pricetag}
                      onChange={this.handleDrawerChange}
                      inputProps={{
                        name: "pricetag"
                      }}
                    >
                      <MenuItem value="<$249">under $249</MenuItem>
                      <MenuItem value="$250-$499">$250-$499</MenuItem>
                      <MenuItem value="$500-$749">$500-$749</MenuItem>
                      <MenuItem value="$750>">$750></MenuItem>
                    </Select>
                    <Drawer
                      docked={false}
                      open={this.state.drawerOpen}
                      onRequestChange={this.toggleDrawer}
                    />
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
        </div>
      </div>
    );
  }
}
