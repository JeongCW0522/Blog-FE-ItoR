import { Axios, BaseUrl } from './auth';

const EmailLogin = async ({ email, password }) => {
  try {
    const response = await Axios.post('/auth/login', {
      email,
      password,
    });

    const { accessToken, refreshToken } = response?.data?.data || {};

    // 토큰 로컬 스토리지에 저장
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
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
  try {
    const response = await Axios.get('/auth/kakao');
    const redirectUrl = response.data.data.redirectUrl;

    window.location.href = redirectUrl;
  } catch (error) {
    console.error('카카오 로그인 URL 요청 실패:', error);
  }
};

const KakaoRedirect = async (authCode) => {
  try {
    const response = await Axios.get(`/auth/kakao/redirect?code=${authCode}`);
    const { accessToken, refreshToken } = response?.data?.data || {};

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return {
      ...response.data,
      status: response.status,
    };
  } catch (error) {
    console.error('카카오 리다이렉트 처리 실패:', error);
    throw error;
  }
};

export { EmailLogin, KakaoLogin, KakaoRedirect };
