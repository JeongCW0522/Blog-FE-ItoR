import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KakaoRedirect } from '@/api/Login';

const KakaoRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const handleRedirect = async () => {
      try {
        const { accessToken, refreshToken } = await KakaoRedirect(code);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/'); // 홈으로 이동
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
      }
    };

    code && handleRedirect();
  }, []);

  return <p>카카오 로그인 처리 중입니다...</p>;
};

export default KakaoRedirectPage;
