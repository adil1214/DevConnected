const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

  if (validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = 'degree field is required';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  // TODO: add more validation.

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
