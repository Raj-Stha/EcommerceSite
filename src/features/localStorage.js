const addUser = (user) => {
  return localStorage.setItem('users', JSON.stringify(user));
}

const upUser = (user) => {
  return localStorage.setItem('users', JSON.stringify(user));
}

const addToCart = (cart) => {
  return localStorage.setItem('cart', JSON.stringify(cart));
}

const removeCart = () => {
  return localStorage.removeItem('cart');
}

const clearALL = () => {
  return localStorage.clear();
}

const getUser = () => {
  const data = localStorage.getItem('users');
  return data === null ? null : JSON.parse(data);
}

const getCart = () => {
  const data = localStorage.getItem('cart');
  return data === null ? [] : JSON.parse(data);
}


export const storage = { addUser, addToCart, removeCart, clearALL, getUser, getCart, upUser };