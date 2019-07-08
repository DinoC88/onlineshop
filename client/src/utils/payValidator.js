import Validator from "validator";
import isEmpty from "is-empty";

export function validatePaymentInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zapcode = !isEmpty(data.zapcode) ? data.zapcode : "";

  // first name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  } else if (!Validator.isLength(data.firstName, { min: 3, max: 24 })) {
    errors.firstName = "First name must be between 3 and 24 characters";
  }

  // last name checks
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name field is required";
  } else if (!Validator.isLength(data.lastName, { min: 3, max: 24 })) {
    errors.lastName = "Last name must be between 3 and 24 characters";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Phone check
  if (!Validator.isLength(data.phone, { min: 8, max: 30 })) {
    errors.phone = "Phone must be at least 8 characters";
  } else if (!Validator.isNumeric(data.phone)) {
    errors.phone = "Phone must be number";
  }

  //Address checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  } else if (!Validator.isLength(data.address, { min: 5, max: 30 })) {
    errors.address = "Address must be at least 5 characters";
  }
  //city checks
  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  } else if (!Validator.isLength(data.city, { min: 3, max: 30 })) {
    errors.city = "City must be at least 3 characters";
  }
  // Zipcode check
  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zip code field is required";
  } else if (!Validator.isLength(data.zipcode, { min: 5, max: 15 })) {
    errors.zipcode = "Zip code must be at least 5 characters";
  } else if (!Validator.isNumeric(data.zipcode)) {
    errors.zipcode = "Zip code must be number";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
