const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.repassword = !isEmpty(data.repassword) ? data.repassword : '';

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'usernameは2文字以上３０文字以内で入力してください';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = '入力してください';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '入力してください';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'このメールアドレスは無効です';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = '入力してください';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = '６文字以上、３０文字以内で入力してください';
  }

  if (Validator.isEmpty(data.repassword)) {
    errors.repassword = '入力してください';
  }

  if (!Validator.equals(data.repassword, data.repassword)) {
    errors.repassword = 'passwordが一致しません';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
