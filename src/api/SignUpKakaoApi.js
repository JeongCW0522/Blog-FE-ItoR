import api from './auth';

const SignUpKakaoApi = async (email, nickname, profilePicture, birthDate, name, introduction) => {
  try {
    const response = await api.post('/auth/register-oauth', {
      email,
      nickname,
      profilePicture,
      birthDate,
      name,
      introduction,
    });

    // 회원가입 성공 시 localStorage에 사용자 정보 저장
    const userInfo = {
      email,
      nickname,
      profilePicture,
      birth: birthDate,
      name,
      bio: introduction,
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '회원가입에 실패했습니다.',
    };
  }
};

export default SignUpKakaoApi;
