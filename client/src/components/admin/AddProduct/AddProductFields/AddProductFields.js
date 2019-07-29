import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Grid
} from "@material-ui/core";
import { formFields } from "../helper";
import { styles } from "../styles";
import { FormattedMessage } from "react-intl";

export default function AddProductFields(props) {
  let { errors, product } = props;
  return (
    <div>
      <form noValidate onSubmit={props.onProductSubmit}>
        <Grid container>
          {formFields.map(i => (
            <Grid key={i.keyName} item xs={12} lg={6} sm={6}>
              <FormControl key={i.keyName} style={styles.formStyle} required>
                <InputLabel htmlFor={i.keyName}>
                  {<FormattedMessage id={i.keyName} defaultMessage={i.label} />}
                </InputLabel>
                <Input
                  id={i.keyName}
                  name={i.keyName}
                  type="text"
                  value={product[i.keyName]}
                  autoComplete={i.keyName}
                  onChange={props.onProductChange}
                />
                {errors[i.keyName] && (
                  <div style={styles.warningStyle}>{errors[i.keyName]}</div>
                )}
              </FormControl>
            </Grid>
          ))}
          <Grid item xs={12} lg={6} sm={6}>
            <FormControl style={styles.formStyle} required>
              <InputLabel>
                <FormattedMessage id="selectRam" defaultMessage="Select RAM" />
              </InputLabel>
              <Select
                style={styles.selectStyle}
                inputProps={{
                  name: "ram"
                }}
                value={product.ram}
                onChange={props.handleDrawerChange}
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
                open={props.drawerOpen}
                onRequestChange={props.toggleDrawer}
              />
              {errors.ram && (
                <div style={styles.warningStyle}>{errors.ram}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <FormControl style={styles.formStyle} required>
              <InputLabel>
                <FormattedMessage
                  id="selectMemory"
                  defaultMessage="Select Memory"
                />
              </InputLabel>
              <Select
                style={styles.selectStyle}
                inputProps={{
                  name: "memory"
                }}
                value={product.memory}
                onChange={props.handleDrawerChange}
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
                open={props.drawerOpen}
                onRequestChange={props.toggleDrawer}
              />
              {errors.memory && (
                <div style={styles.warningStyle}>{errors.memory}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <FormControl style={styles.formStyle} required>
              <InputLabel htmlFor="price">
                <FormattedMessage id="price" defaultMessage="Price" />
              </InputLabel>
              <Input
                id="price"
                name="price"
                value={product.price}
                autoComplete="price"
                onChange={props.onProductChange}
              />
              {errors.price && (
                <div style={styles.warningStyle}>{errors.price}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <FormControl style={styles.formStyle} required>
              <InputLabel>
                <FormattedMessage
                  id="selectBrand"
                  defaultMessage="Select Brand"
                />
              </InputLabel>
              <Select
                style={styles.selectStyle}
                inputProps={{
                  name: "brand"
                }}
                value={product.brand}
                onChange={props.handleDrawerChange}
              >
                <MenuItem value="Apple">Apple</MenuItem>
                <MenuItem value="Samsung">Samsung</MenuItem>
                <MenuItem value="Huawei">Huawei</MenuItem>
                <MenuItem value="LG">LG</MenuItem>
                <MenuItem value="HTC">HTC</MenuItem>
              </Select>
              <Drawer
                docked={false}
                open={props.drawerOpen}
                onRequestChange={props.toggleDrawer}
              />
              {errors.brand && (
                <div style={styles.warningStyle}>{errors.brand}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <FormControl style={styles.formStyle}>
              <InputLabel>
                <FormattedMessage
                  id="selectColor"
                  defaultMessage="Select Color"
                />
              </InputLabel>
              <Select
                style={styles.selectStyle}
                value={product.color}
                onChange={props.handleDrawerChange}
                inputProps={{
                  name: "color"
                }}
              >
                <MenuItem value="White">
                  <FormattedMessage id="White" defaultMessage="White" />
                </MenuItem>
                <MenuItem value="Black">
                  <FormattedMessage id="Black" defaultMessage="Black" />
                </MenuItem>
                <MenuItem value="Gray">
                  <FormattedMessage id="Gray" defaultMessage="Gray" />
                </MenuItem>
                <MenuItem value="Blue">
                  <FormattedMessage id="Blue" defaultMessage="Blue" />
                </MenuItem>
              </Select>
              <Drawer
                docked={false}
                open={props.drawerOpen}
                onRequestChange={props.toggleDrawer}
              />
              {errors.color && (
                <div style={styles.warningStyle}>{errors.color}</div>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
