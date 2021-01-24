export const getUser = state => state.user;
export const getToken = state => state.token || localStorage.getItem('token');
export const getFriends = state => state.friends;