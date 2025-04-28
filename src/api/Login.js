import Axios from './auth';

const loginRequest = async ({ email, password }) => {
  try {
    const response = await Axios.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '로그인에 실패했습니다.',
    };
  }
};

export { loginRequest };
