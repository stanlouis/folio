export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_PORTFOLIOS':
      return { ...state, list: action.payload };
    case 'ADD_PORTFOLIO':
      return { ...state, newPortfolio: action.payload };
    case 'CLEAR_NEWPORTFOLIO':
      return { ...state, newPortfolio: action.payload };
    default:
      return state;
  }
}
