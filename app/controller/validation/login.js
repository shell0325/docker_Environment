const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'このメールアドレスは無効です';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '入力してください';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = '入力してください';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
