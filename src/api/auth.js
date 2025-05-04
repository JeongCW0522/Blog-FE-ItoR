import axios from 'axios';

const BaseUrl = import.meta.env.VITE_API_URL;

const Axios = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { BaseUrl, Axios };

const getRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); //기존 스토리지에서 refreshToken 꺼내옴
    if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

    const response = await Axios.post(`/auth/reissue`, { refreshToken }); // /auth/reissue에 요청보내 재발급

    if (response.data.code === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    }
    throw new Error('새로운 리프레시 토큰을 받아오지 못했습니다. ');
  } catch (error) {
    console.error('리프레시 토큰 요청 실패: ', error);
    throw error;
  }
};

//모든 Axios 요청에 대해 accessToken과 refreshToken 자동으로 헤더에 추가
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['Authorization_refresh'] = `Bearer ${refreshToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

//accessToken 만료 시 재발급
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    //accessToekn 만료
    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      try {
        const { accessToken, refreshToken } = await getRefreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization_refresh'] = `Bearer ${refreshToken}`;

        return Axios(originalRequest);
      } catch (refreshError) {
        console.error('새로운 엑세스 토큰 발행에 실패했습니다!');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('로그인이 만료되었습니다');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);
