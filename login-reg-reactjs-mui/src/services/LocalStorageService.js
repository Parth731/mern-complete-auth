export const storeToken = (value) => {
  localStorage.setItem('token', JSON.stringify(value));
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem('token'));
};

export const removeToken = () => {
  localStorage.removeItem('token');
  // window.location.reload();
};
