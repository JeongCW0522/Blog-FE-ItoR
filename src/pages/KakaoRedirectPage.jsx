import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KakaoRedirect } from '@/api/Login';
import { useLogin } from '@/context/LoginContext';
import { storeInfo, storeTokens } from '@/utils/storeTokens';
import { useToast } from '@/context/ToastContext';

const KakaoRedirectPage = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useLogin();
  const { showToast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    // 중복 요청 방지를 위해 URL에서 code 제거
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    const handleKakaoRedirect = async () => {
      try {
        const Auth = await KakaoRedirect(code);
        if (Auth?.code === 200) {
          setIsLogin(true);
          localStorage.setItem('isKakao', 'true');
          storeTokens(Auth.data.accessToken, Auth.data.refreshToken);
          storeInfo(Auth.data.nickname, Auth.data.introduction, Auth.data.profilePicture);
          navigate('/');
          showToast('positive', '로그인 되었습니다.');
        } else if (Auth?.code === 401) {
          const { kakaoId, nickname, picture } = Auth.data;
          navigate('/signup/Kakao', { state: { kakaoId, nickname, picture } });
        }
      } catch (error) {
        showToast('error', '로그인에 실패했습니다.');
      }
    };

    handleKakaoRedirect();
  }, []);

  return <p>카카오 로그인 중입니다...</p>;
};

export default KakaoRedirectPage;
