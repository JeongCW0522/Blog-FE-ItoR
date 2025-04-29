import api from './auth';

export const kakaoLogin = async (authCode) => {
  try {
    const response = await api.get('/auth/kakao/redirect', {
      params: { code: authCode },
    });
    return response.data;
  } catch (error) {
    console.log('kakao login error', error);
    throw error;
  }
};
