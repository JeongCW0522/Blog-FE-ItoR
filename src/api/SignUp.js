import { Axios } from './auth';

const EmailSignUp = async (
  email,
  nickname,
  password,
  profilePicture,
  birthDate,
  name,
  introduction,
) => {
  try {
    const response = await Axios.post('/auth/register', {
      email,
      nickname,
      password,
      profilePicture,
      birthDate,
      name,
      introduction,
    });

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '회원가입에 실패했습니다.',
    };
  }
};

const KakaoSignUp = async (email, nickname, profilePicture, birthDate, name, introduction) => {
  try {
    const response = await Axios.post('/auth/register-oauth', {
      email,
      nickname,
      profilePicture,
      birthDate,
      name,
      introduction,
    });

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '회원가입에 실패했습니다.',
    };
  }
};

export { EmailSignUp, KakaoSignUp };
