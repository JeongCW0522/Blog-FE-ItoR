import { Axios } from './auth';

export const getUserInfo = async () => {
  const response = await Axios.get('/users/me');
  return response.data.data; // { id, email, nickname, profilePicture }
};

export const updateUserInfo = async (userData) => {
  const { email, name, birthDate, introduction, profilePicture, nickname, password } = userData;

  const response = await Axios.patch('/users', {
    email,
    name,
    birthDate,
    introduction,
    profilePicture,
    nickname,
    password,
  });
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
