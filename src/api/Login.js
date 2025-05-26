import { Axios, BASE_URL } from './auth';
import { storeInfo, storeTokens } from '@/utils/storeTokens';

const EmailLogin = async ({ email, password }) => {
  try {
    const response = await Axios.post('/auth/login', {
      email,
      password,
    });

    const { accessToken, refreshToken, nickname, introduction, profilePicture } =
      response?.data?.data || {};

    // 로컬 스토리지에 저장
    storeTokens(accessToken, refreshToken);
    storeInfo(nickname, introduction, profilePicture);
    console.log('로그인 정보', response.data);

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
    const url = `${BASE_URL}/auth/kakao`;
    window.location.href = url;
  } catch (error) {
    console.error('카카오 로그인 URL 요청 실패:', error);
  }
};

const KakaoRedirect = async (code) => {
  try {
    const response = await Axios.get('/auth/kakao/redirect', {
      params: { code },
    });

    return response.data;
  } catch (error) {
    console.error('카카오 리다이렉트 처리 실패:', error);
    throw error;
  }
};

export { EmailLogin, KakaoLogin, KakaoRedirect };
