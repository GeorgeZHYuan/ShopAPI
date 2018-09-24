const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePaginationParams(query) {
    let errors = {};

    // Check sort order
    if (query.sort !== 'asc' || query.sort !== 'desc') {
        errors.sort == `invalid sorting method. choose between 'asc' and 'desc'.`;
    }

    // Check pagination limit
    if (!Validator.isInt(query.limit)) {
        errors.limit = `Invalid paginiation limit. Limit must be an integer.`;
    } else if (query.limit < 1) {
        errors.limit = `Invalid paginiation limit. Limit must be bigger than 0.`;
    }

    // Check pagination offset
    if (!Validator.isInt(query.offset)) {
        errors.offset = `Invalid paginiation offset. Offset must be an integer.`;
    } else if (query.offset < 0) {
        errors.offset = `Invalid paginiation offset. Offset cannot be negative.`;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
