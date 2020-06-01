import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_BUDGET_SUCCESS,
  GET_BUDGET_FAILURE,
  POST_CREATE_BUDGET_LINE_SUCCESS,
  PUT_BUDGET_SUCCESS,
  PUT_BUDGET_FAILURE,
  GET_BUDGET_LINES_SUCCESS,
  GET_BUDGET_LINES_FAILURE,
    DELETE_BUDGET_LINE_SUCCESS,
    DELETE_BUDGET_LINE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  categories: [],
  categoriesStatus: false,
  createBudget: true,
  budget: {
    spending_limit: 0,
    full_income: 0,
    full_expense: 0,
    full_difference: 0,
    limit_left: 0,
    expense_categories: [],
  },
  results: [],
};

export const budget = (state = initialState, {type, payload}) => {
  switch (type) {
    case DELETE_BUDGET_LINE_FAILURE:
      return {
        ...state
      };
    case DELETE_BUDGET_LINE_SUCCESS:
      return {
        ...state,
        results: [...state.results.filter(el => el.id !== payload)]
      }
    case GET_BUDGET_LINES_FAILURE:
      return {
        ...state,
      };
    case GET_BUDGET_LINES_SUCCESS:
      return {
        ...state,
        results: [...payload],
      };
    case PUT_BUDGET_FAILURE:
      return {
        ...state,
      };
    case PUT_BUDGET_SUCCESS:
      return {
        ...state,
        budget: {...payload},
      };
    case POST_CREATE_BUDGET_LINE_SUCCESS:
      return {
        ...state,
        createBudget: !state.createBudget,
      };
    case GET_BUDGET_FAILURE:
      return {
        ...state,
      };
    case GET_BUDGET_SUCCESS:
      return {
        ...state,
        budget: {...payload},
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, payload],
        categoriesStatus: 'success',
      };
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        categoriesStatus: 'failure',
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [...payload],
        categoriesStatus: true,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
        categoriesStatus: true,
      };
    default:
      return state;
  }
};
