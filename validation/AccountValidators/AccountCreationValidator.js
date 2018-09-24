const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateAccountCreationParams(body) {
    let errors = {};

    // Check email validity
    if (!Validator.isEmail(body.email)) {
        errors.email = `Invalid email address`;
    }

    // Check password length
    if (!Validator.isLength(body.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be between 6 to 30 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
