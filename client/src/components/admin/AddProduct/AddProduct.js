import React, { Component } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Grid,
  Card,
  Divider,
  Hidden,
  Tooltip
} from "@material-ui/core";
import { addNewProduct } from "../../../utils/requestManager";
import { initialProductState, formFields } from "./helper";
import { styles } from "./styles";
import {
  KeyboardArrowLeft,
  MobileScreenShareTwoTone
} from "@material-ui/icons";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      product: initialProductState,
      errors: {}
    };
  }
  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };
  handleDrawerChange = e => {
    const drawerInput = { ...this.state.product };
    drawerInput[e.target.name] = e.target.value;
    this.setState({ product: drawerInput });
  };
  onProductChange = e => {
    const inputChange = { ...this.state.product };
    inputChange[e.target.name] = e.target.value;
    this.setState({ product: inputChange });
  };
  onProductSubmit = async e => {
    e.preventDefault();
    try {
      await addNewProduct(this.state.product);
      await this.props.history.push("/dashboard");
    } catch (err) {
      this.setState({ errors: err.response.data });
    }
  };

  render() {
    const { errors, product } = this.state;
    return (
      <div style={styles.pageContainer}>
        <div style={styles.pageMarginTop}>
          <Grid container>
            <Card style={styles.addProductCardStyle}>
              <div style={styles.addProductStyle}>
                <Hidden xsDown>
                  <div style={styles.headerStyle}>
                    <Divider style={{ marginTop: 50 }} />
                    <MobileScreenShareTwoTone style={styles.imgStyle} />
                  </div>
                </Hidden>
                <form noValidate onSubmit={this.onProductSubmit}>
                  <Grid container>
                    {formFields.map(i => (
                      <Grid key={i.keyName} item xs={12} lg={6} sm={6}>
                        <FormControl
                          key={i.keyName}
                          style={styles.formStyle}
                          required
                        >
                          <InputLabel htmlFor={i.keyName}>{i.label}</InputLabel>
                          <Input
                            id={i.keyName}
                            name={i.keyName}
                            type="text"
                            value={product[i.keyName]}
                            autoComplete={i.keyName}
                            onChange={this.onProductChange}
                          />
                          {errors[i.keyName] && (
                            <div style={styles.warningStyle}>
                              {errors[i.keyName]}
                            </div>
                          )}
                        </FormControl>
                      </Grid>
                    ))}
                    <Grid item xs={12} lg={6} sm={6}>
                      <FormControl style={styles.formStyle} required>
                        <InputLabel>Select RAM</InputLabel>
                        <Select
                          style={styles.selectStyle}
                          inputProps={{
                            name: "ram"
                          }}
                          value={product.ram}
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
                    </Grid>
                    <Grid item xs={12} lg={6} sm={6}>
                      <FormControl style={styles.formStyle} required>
                        <InputLabel>Select Memory</InputLabel>
                        <Select
                          style={styles.selectStyle}
                          inputProps={{
                            name: "memory"
                          }}
                          value={product.memory}
                          onChange={this.handleDrawerChange}
                        >
                          <MenuItem value="8 GB">8 GB</MenuItem>
                          <MenuItem value="16 GB">16 GB</MenuItem>
                          <MenuItem value="32 GB">32 GB</MenuItem>
                          <MenuItem value="64 GB">64 GB</MenuItem>
                          <MenuItem value="128 GB">128 GB</MenuItem>
                          <MenuItem value="256 GB">256 GB</MenuItem>
                          <MenuItem value="512 GB">512 GB</MenuItem>
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
                    </Grid>
                    <Grid item xs={12} lg={6} sm={6}>
                      <FormControl style={styles.formStyle} required>
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <Input
                          id="price"
                          name="price"
                          value={product.price}
                          autoComplete="price"
                          onChange={this.onProductChange}
                        />
                        {errors.price && (
                          <div style={styles.warningStyle}>{errors.price}</div>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6} sm={6}>
                      <FormControl style={styles.formStyle} required>
                        <InputLabel>Select Brand</InputLabel>
                        <Select
                          style={styles.selectStyle}
                          inputProps={{
                            name: "brand"
                          }}
                          value={product.brand}
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
                    </Grid>
                    <Grid item xs={12} lg={6} sm={6}>
                      <FormControl style={styles.formStyle}>
                        <InputLabel>Select Color*</InputLabel>
                        <Select
                          style={styles.selectStyle}
                          value={product.color}
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
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Hidden xsDown>
                <Divider />
              </Hidden>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item xs={12} lg={6} sm={6}>
                  <Tooltip disableFocusListener title="Go back">
                    <div>
                      <Button
                        onClick={() => {
                          this.props.history.push("/dashboard");
                        }}
                        style={styles.buttonStyle}
                        variant="contained"
                        color="secondary"
                      >
                        <KeyboardArrowLeft />
                      </Button>
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Button
                    style={styles.buttonStyle}
                    onClick={this.onProductSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}
