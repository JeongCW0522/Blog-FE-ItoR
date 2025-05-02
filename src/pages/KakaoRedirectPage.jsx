import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KakaoRedirect } from '@/api/Login';

const KakaoRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const handleKakaoRedirect = async () => {
      try {
        const data = await KakaoRedirect(code);

        if (data?.status === 200) {
          const { accessToken, refreshToken } = data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          navigate('/');
        } else if (data?.status === 201) {
          navigate('/signup');
        }
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
      }
    };

    if (code) handleKakaoRedirect();
  }, [navigate]);

  return <p>카카오 로그인 처리 중입니다...</p>;
};

export default KakaoRedirectPage;
