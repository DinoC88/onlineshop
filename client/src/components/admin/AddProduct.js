import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { addNewProduct } from "./admin-helper";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      displayResolution: "",
      displaySize: "",
      cpu: "",
      memory: "",
      ram: "",
      camera: "",
      price: ""
    };
  }

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
      memory: this.state.memory
    };
    addNewProduct(newProduct)
      .then(res => this.props.history.push("/dashboard"))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    return (
      <div className="addproduct">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-5 mx-auto">
              <h3 style={{ textAlign: "center" }}>Add new product</h3>
              <form noValidate onSubmit={this.onProductSubmit}>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={this.state.name}
                    autoComplete="name"
                    onChange={this.onProductChange}
                  />
                </FormControl>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="image">Photo Link</InputLabel>
                  <Input
                    id="image"
                    name="image"
                    value={this.state.image}
                    autoComplete="image"
                    onChange={this.onProductChange}
                  />
                </FormControl>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
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
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
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
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="cpu">CPU</InputLabel>
                  <Input
                    id="cpu"
                    name="cpu"
                    value={this.state.cpu}
                    autoComplete="cpu"
                    onChange={this.onProductChange}
                  />
                </FormControl>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="ram">RAM</InputLabel>
                  <Input
                    id="ram"
                    name="ram"
                    value={this.state.ram}
                    autoComplete="ram"
                    onChange={this.onProductChange}
                  />
                </FormControl>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="camera">Camera</InputLabel>
                  <Input
                    id="camera"
                    name="camera"
                    value={this.state.camera}
                    autoComplete="camera"
                    onChange={this.onProductChange}
                  />
                </FormControl>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="memory">Memory</InputLabel>
                  <Input
                    id="memory"
                    name="memory"
                    value={this.state.memory}
                    autoComplete="memory"
                    onChange={this.onProductChange}
                  />
                </FormControl>
                <FormControl
                  style={{ marginTop: 25 }}
                  className="input-field col s12"
                  required
                >
                  <InputLabel htmlFor="price">Price</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    value={this.state.price}
                    autoComplete="price"
                    onChange={this.onProductChange}
                  />
                </FormControl>
                <div
                  className="row"
                  style={{ paddingTop: 25, paddingLeft: 25 }}
                >
                  <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                      Add new product
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
