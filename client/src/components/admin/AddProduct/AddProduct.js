import React, { Component } from "react";
import {
  Button,
  Grid,
  Card,
  Divider,
  Hidden,
  Tooltip
} from "@material-ui/core";
import { initialProductState } from "./helper";
import { styles } from "./styles";
import {
  KeyboardArrowLeft,
  MobileScreenShareTwoTone
} from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import AddProductFields from "./AddProductFields/AddProductFields";
import { addNewProd } from "../../../actions/productAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCart } from "../../../actions/cartActions";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      product: initialProductState,
      hoverBack: false
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
    await this.props.addNewProd(this.state.product, this.props.history);
  };
  onHoverBack = () => {
    this.setState({
      hoverBack: !this.state.hoverBack
    });
  };
  render() {
    const { errors } = this.props;
    const { product, hoverBack, drawerOpen } = this.state;
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
                <AddProductFields
                  errors={errors}
                  product={product}
                  onProductSubmit={this.onProductSubmit}
                  onProductChange={this.onProductChange}
                  handleDrawerChange={this.handleDrawerChange}
                  drawerOpen={drawerOpen}
                  toggleDrawer={this.toggleDrawer}
                />
              </div>
              <Hidden xsDown>
                <Divider />
              </Hidden>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item xs={12} lg={6} sm={6}>
                  <Tooltip
                    disableFocusListener
                    title={
                      <FormattedMessage id="goBack" defaultMessage="Go back" />
                    }
                  >
                    <Button
                      onClick={() => {
                        this.props.history.push("/dashboard");
                      }}
                      variant="contained"
                      style={
                        hoverBack
                          ? styles.onHoverButtonStyle
                          : styles.hoverButtonStyle
                      }
                      onMouseEnter={this.onHoverBack}
                      onMouseLeave={this.onHoverBack}
                    >
                      <KeyboardArrowLeft />
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Button
                    style={styles.buttonStyle}
                    onClick={this.onProductSubmit}
                    variant="contained"
                    color="primary"
                  >
                    <FormattedMessage id="confirm" defaultMessage="Confirm" />{" "}
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

AddProduct.propTypes = {
  addNewProd: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchCart, addNewProd }
)(AddProduct);
