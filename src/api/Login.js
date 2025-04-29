import Axios from './auth';

const loginRequest = async ({ email, password }) => {
  try {
    const response = await Axios.post('/auth/login', {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;

    // 토큰 로컬 스토리지에 저장
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '로그인에 실패했습니다.',
    };
  }
};

export { loginRequest };
