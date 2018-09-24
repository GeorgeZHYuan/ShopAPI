const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePaginationParams(query) {
    let errors = {};

    if (query.sort !== 'asc' || query.sort !== 'desc') {
        errors.sort == `invalid sorting method. choose between 'asc' and 'desc'.`;
    }

    if (!Validator.isInt(query.limit)) {
        console.log('Number', query.limit);
        errors.limit = `Invalid paginiation limit. Limit must be an integer.`;
    } else if (query.limit < 1) {
        errors.limit = `Invalid paginiation limit. Limit must be a positive integer.`;
    }

    if (!Validator.isInt(query.offset)) {
        errors.offset = `Invalid paginiation offset. Offset must be an integer.`;
    } else if (query.offset < 1) {
        errors.offset = `Invalid paginiation offset. Offset must be a positive integer.`;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
