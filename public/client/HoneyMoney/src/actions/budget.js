import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
  POST_CREATE_BUDGET_LINE_FAILURE,
  POST_CREATE_BUDGET_LINE_SUCCESS,
  GET_BUDGET_FAILURE,
  GET_BUDGET_SUCCESS,
  PUT_BUDGET_FAILURE,
  PUT_BUDGET_SUCCESS,
  GET_BUDGET_LINES_FAILURE,
  GET_BUDGET_LINES_SUCCESS,
  DELETE_BUDGET_LINE_FAILURE,
  DELETE_BUDGET_LINE_SUCCESS,
} from './actionTypes';
import {api} from '../config';

export const delete_budget_line = id => dispatch => {
  try {
    api.delete_budget_line(id).then(res => {
      if (res.status > 199 && res.status < 300) {
        return dispatch({
          type: DELETE_BUDGET_LINE_SUCCESS,
          payload: id,
        });
      } else {
        return dispatch({
          type: DELETE_BUDGET_LINE_FAILURE,
        });
      }
    });
  } catch (e) {
    return dispatch({
      type: DELETE_BUDGET_LINE_FAILURE,
    });
  }
};

export const get_budget_lines = () => dispatch => {
  try {
    api.get_budget_lines().then(res => {
      if (res.status > 199 && res.status < 300) {
        const {results} = res.data;
        return dispatch({
          type: GET_BUDGET_LINES_SUCCESS,
          payload: results,
        });
      } else {
        return dispatch({
          type: GET_BUDGET_LINES_FAILURE,
        });
      }
    });
  } catch (e) {
    return dispatch({
      type: GET_BUDGET_LINES_FAILURE,
    });
  }
};

export const put_Budget = data => dispatch => {
  try {
    api.put_budget(data).then(res => {
      if (res.status > 199 && res.status < 300) {
        const {data} = res;
        const {
          full_income,
          full_expense,
          full_difference,
          limit_left,
          spending_limit,
          expense_categories,
        } = data;
        return dispatch({
          type: PUT_BUDGET_SUCCESS,
          payload: {
            full_income,
            full_expense,
            full_difference,
            limit_left,
            spending_limit,
            expense_categories,
          },
        });
      }
    });
  } catch (e) {
    return dispatch({
      type: PUT_BUDGET_FAILURE,
    });
  }
};

export const get_budget = () => dispatch => {
  try {
    api.get_budget().then(res => {
      if (res.status > 199 && res.status < 300) {
        const {data} = res;
        const {
          full_income,
          full_expense,
          full_difference,
          limit_left,
          spending_limit,
          expense_categories,
        } = data;
        return dispatch({
          type: GET_BUDGET_SUCCESS,
          payload: {
            full_income,
            full_expense,
            full_difference,
            limit_left,
            spending_limit,
            expense_categories,
          },
        });
      } else {
        return dispatch({
          type: GET_BUDGET_FAILURE,
        });
      }
    });
  } catch (e) {
    return dispatch({
      type: GET_BUDGET_FAILURE,
    });
  }
};

export const post_create_budget_line = data => dispatch => {
  try {
    api.post_create_budget_line(data).then(res => {
      if (res.status > 199 && res.status < 300) {
        return dispatch({
          type: POST_CREATE_BUDGET_LINE_SUCCESS,
        });
      } else {
        return dispatch({
          type: POST_CREATE_BUDGET_LINE_FAILURE,
        });
      }
    });
  } catch (e) {
    return dispatch({
      type: POST_CREATE_BUDGET_LINE_FAILURE,
    });
  }
};

export const get_categories = () => dispatch => {
  try {
    api.get_categories().then(res => {
      if (res.status > 199 && res.status < 300) {
        const {data} = res;
        const edit_data = data.map(el => ({
          label: el.name,
          value: el.id,
          is_income: el.is_income_category,
        }));
        return dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: edit_data,
        });
      } else {
        return dispatch({
          type: GET_CATEGORIES_FAILURE,
        });
      }
    });
  } catch (e) {
    return dispatch({
      type: GET_CATEGORIES_FAILURE,
    });
  }
};

export const create_category = data => dispatch => {
  try {
    api.create_category(data).then(res => {
      if (res.status > 199 && res.status < 300) {
        const nData = {
          label: res.data.name,
          value: res.data.id,
          is_income: res.data.is_income_category,
        };
        return dispatch({
          type: CREATE_CATEGORY_SUCCESS,
          payload: nData,
        });
      } else {
        return dispatch({
          type: CREATE_CATEGORY_FAILURE,
        });
      }
    });
  } catch (e) {
    return dispatch({
      type: CREATE_CATEGORY_FAILURE,
    });
  }
};
