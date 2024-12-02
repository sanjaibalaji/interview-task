export const getAuthToken = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    return auth ? auth.token : null;
  };
  
  export const getAuthUser = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    return auth ? auth.user : null;
  };
  