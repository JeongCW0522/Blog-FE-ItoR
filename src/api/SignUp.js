import { Axios } from './auth';

const EmailSignUp = async (resisterData) => {
  try {
    const response = await Axios.post('/auth/register', resisterData);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '회원가입에 실패했습니다.',
    };
  }
};

const KakaoSignUp = async (kakaoData) => {
  try {
    const response = await Axios.post('/auth/register-oauth', kakaoData);

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '회원가입에 실패했습니다.',
    };
  }
};

export { EmailSignUp, KakaoSignUp };
