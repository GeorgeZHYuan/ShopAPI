const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateAccountUpdateParams(body) {
    let errors = {};

    // Check email validity
    if (!body.accountId) {
        errors.accountId = `No account id found.`
    } else if (!Validator.isInt(body.accountId)) {
        errors.email = `Invalid email address`;
    }

    // Check email length
    if (body.email && !Validator.isEmail(body.email)) {
      errors.email = 'Email format is invalid';
    }

    // Check password length
    if (body.password && !Validator.isLength(body.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be between 6 to 30 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
