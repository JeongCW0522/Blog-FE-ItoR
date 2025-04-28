import api from './auth';

const SignUp = async (email, nickname, password, profilePicture, birthDate, name, introduction) => {
  try {
    const response = await api.post('/auth/register', {
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

export default SignUp;
