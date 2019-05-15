const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProductInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  data.displaySize = !isEmpty(data.displaySize) ? data.displaySize : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.displayResolution = !isEmpty(data.displayResolution)
    ? data.displayResolution
    : "";
  data.cpu = !isEmpty(data.cpu) ? data.cpu : "";
  data.memory = !isEmpty(data.memory) ? data.memory : "";
  data.ram = !isEmpty(data.ram) ? data.ram : "";
  data.camera = !isEmpty(data.camera) ? data.camera : "";
  data.brand = !isEmpty(data.brand) ? data.brand : "";
  data.color = !isEmpty(data.color) ? data.color : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }
  if (Validator.isEmpty(data.image)) {
    errors.image = "Image field is required.";
  } else if (!Validator.isURL(data.image)) {
    errors.image = "Image field must be url.";
  }
  if (Validator.isEmpty(data.displaySize)) {
    errors.displaySize = "Display size field is required";
  } else if (/^\d{0,1}(\.\d{1,1})?(")$/g.test(data.displaySize) === false) {
    errors.displaySize = 'Invalid display size. Example 5.3"';
  }
  if (Validator.isEmpty(data.displayResolution)) {
    errors.displayResolution = "Display resolution field is required.";
  } else if (
    /^(\d{3,4})( x )(\d{3,4})/g.test(data.displayResolution) === false
  ) {
    errors.displayResolution =
      "Invalid display resolution. Example 1080 x 1920";
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required.";
  } else if (!Validator.isNumeric(data.price)) {
    errors.price = "Price must be number.";
  }
  if (Validator.isEmpty(data.cpu)) {
    errors.cpu = "CPU field is required.";
  }
  if (Validator.isEmpty(data.memory)) {
    errors.memory = "Memory field is required.";
  }
  if (Validator.isEmpty(data.ram)) {
    errors.ram = "RAM field is required.";
  }
  if (Validator.isEmpty(data.camera)) {
    errors.camera = "Camera field is required.";
  }
  if (Validator.isEmpty(data.brand)) {
    errors.brand = "Brand field is required.";
  }
  if (Validator.isEmpty(data.color)) {
    errors.color = "Color field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
