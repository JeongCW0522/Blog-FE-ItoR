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
    console.log(response.data);

    return response.data;
  } catch (error) {
    const status = error.response?.status;
    return {
      error: true,
      status,
      message: error.response?.data?.message || '로그인에 실패했습니다.',
    };
  }
};

const KakaoLogin = async () => {
  const url = `${import.meta.env.VITE_API_URL}/auth/kakao`;
  window.location.href = url;
};

const KakaoRedirect = async (authCode) => {
  const response = await api.get('/auth/kakao/redirect', {
    params: { authCode },
  });
  return response.data;
};

export { loginRequest, KakaoLogin, KakaoRedirect };
