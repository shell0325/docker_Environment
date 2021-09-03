const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateDashboardInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.content = !isEmpty(data.content) ? data.content : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = '入力してください';
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = '入力してください';
  }

  if (!Validator.isLength(data.content, { max: 140 })) {
    errors.content = '140文字以内で入力してください';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
