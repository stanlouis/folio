import axios from 'axios';

export function getPortfolios(limit = 10, start = 0, order = 'asc', list = '') {
  const request = axios
    .get(`/api/portfolios?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });

  return {
    type: 'GET_PORTFOLIOS',
    payload: request
  };
}

/*========= USER ===========*/

export function loginUser({email,password}){
    const request = axios.post('/api/login',{email,password})
                .then(response => response.data)

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                .then(response => response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }

}