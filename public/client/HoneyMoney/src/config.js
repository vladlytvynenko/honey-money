import axios from 'axios';

export const api = {
  sign_up: data =>
    axios.post(
      'https://honey-money.herokuapp.com/api/v1/accounts/registration/',
      data,
    ),
  byToken: () =>
    axios.get('https://honey-money.herokuapp.com/api/v1/accounts/me/'),
  sign_in: data =>
    axios.post(
      'https://honey-money.herokuapp.com/api/v1/accounts/login/',
      data,
    ),
  create_category: data =>
    axios.post(
      'https://honey-money.herokuapp.com/api/v1/category/create/',
      data,
    ),
  get_categories: () =>
    axios.get('https://honey-money.herokuapp.com/api/v1/categories/'),
  post_create_budget_line: data =>
    axios.post(
      'https://honey-money.herokuapp.com/api/v1/budget-line/create/',
      data,
    ),
  get_budget: () =>
    axios.get('https://honey-money.herokuapp.com/api/v1/budget/'),
  get_budget_lines: () =>
    axios.get('https://honey-money.herokuapp.com/api/v1/budget-lines/'),
  put_budget: data =>
    axios.put('https://honey-money.herokuapp.com/api/v1/budget/', data),
  delete_budget_line: id =>
    axios.delete(
      `https://honey-money.herokuapp.com/api/v1/budget-line/${id}/delete/`,
    ),
};
