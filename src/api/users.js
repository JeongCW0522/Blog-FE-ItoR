import { Axios } from './auth';

export const getUserInfo = async () => {
  const response = await Axios.get('/users/me');
  return response.data.data; // { id, email, nickname, profilePicture }
};

export const updateUserInfo = async (userData) => {
  console.log('보낼 유저 데이터:', userData);
  const response = await Axios.patch('/users', userData);
  return response.data;
};

export const updateNickname = async (nickname) => {
  const response = await Axios.patch('/users/nickname', { nickname });
  return response.data;
};

export const updatePassword = async (password) => {
  const response = await Axios.patch('/users/password', { password });
  return response.data;
};
