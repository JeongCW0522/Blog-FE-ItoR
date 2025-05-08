import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ClearIcon, GITLOG, KakaoIcon } from '@/assets';
import { Input, Button } from '@/components';
import { useLogin } from '@/context/LoginContext';
import { useMutation } from '@tanstack/react-query';
import { KakaoLogin, EmailLogin } from '@/api/Login';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #9492924d;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 110;
`;

const ModalContent = styled.div`
  display: flex;
  background: #111112;
  border-radius: 9px;
  width: 800px;
  min-height: 450px;
  position: relative;
  padding-top: 30px;
  transform: translateY(-60px);

  @media (max-width: 700px) {
    width: 90%;
    height: 60%;
    flex-direction: column;
    padding: 60px 0;
    transform: translateY(-50px);
  }
`;

const CloseButton = styled(ClearIcon)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const LeftContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 30px;

  @media (max-width: 700px) {
    width: 100%;
    height: 50%;
  }
`;

const Text = styled.p`
  color: #909090;
  font-size: 14px;
`;

const RightContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 700px) {
    width: 100%;
    height: 50%;
    text-align: center;
    gap: 5px;
  }
`;

const Sns = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #909090;
  font-size: 12px;
  font-weight: 400;
  width: 80%;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #555;
  }
`;

const SignUpText = styled.p`
  color: #909090;
  font-size: 12px;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorState, setErrorState] = useState(null); // 비밀번호 오류 상태
  const { setIsLogin } = useLogin();

  const loginMutation = useMutation({
    mutationFn: EmailLogin,
    onSuccess: (data) => {
      if (data.error) {
        // status에 따라 에러 메시지 분기
        if (data.status === 400) {
          setErrorState({ message: '이메일을 다시 확인해주세요.' });
        } else if (data.status === 401) {
          setErrorState({ message: '비밀번호를 다시 확인해주세요.' });
        } else {
          setErrorState({ message: data.message });
        }
        setIsLogin(false);
        return;
      }
      setIsLogin(true);
      setErrorState(null);
      onClose();
    },
    onError: (error) => {
      setErrorState({ message: error.message });
      setIsLogin(false);
    },
  });

  const handleLogin = () => {
    if (!email) {
      setErrorState({ message: '이메일을 입력해주세요.' });
      return;
    }
    if (!email.includes('@')) {
      setErrorState({ message: '올바른 이메일 형식이 아닙니다.' });
      return;
    }
    if (!password) {
      setErrorState({ message: '비밀번호를 입력해주세요.' });
      return;
    }
    // 로그인 요청
    loginMutation.mutate({ email, password });
  };

  const onKakaoLogin = () => {
    KakaoLogin();
  };

  if (!isOpen) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <LeftContent>
          <GITLOG />
          <Text>You can make anything by writing</Text>
        </LeftContent>
        <RightContent>
          <div style={{ width: '77%', margin: '0 12px 10px 0' }}>
            <Input
              placeholder='이메일'
              type='email'
              borderStyle='4px'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='비밀번호'
              type='password'
              borderStyle='4px'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorState={errorState} // 상태 전달
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
          </div>
          <Button
            width='80%'
            height='48px'
            borderStyle='none'
            color='white'
            bgColor='#00A1FF'
            radius='6px'
            onClick={handleLogin}
          >
            이메일로 로그인
          </Button>
          <Sns>SNS</Sns>
          <Button
            width='80%'
            height='48px'
            borderStyle='none'
            fontWeight='bold'
            bgColor='#FEE500'
            radius='6px'
            icon={KakaoIcon}
            onClick={onKakaoLogin}
          >
            카카오로 로그인
          </Button>
          <SignUpText>
            <Link to='/signUp' style={{ textDecoration: 'none', color: '#909090' }}>
              또는 회원가입
            </Link>
          </SignUpText>
        </RightContent>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
