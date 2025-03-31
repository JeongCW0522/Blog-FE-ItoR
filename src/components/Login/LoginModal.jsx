import React from 'react';
import styled from 'styled-components';
import Clear from '@/assets/clear.svg?react';
import GITLOG from '@/assets/GITLOG.svg?react';
import KakaoIcon from '@/assets/kakaologo.svg?react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #9492924d;
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  background: #111112;
  border-radius: 9px;
  width: 800px;
  min-height: 450px;
  position: relative;
  padding-top: 30px;
`;

const CloseButton = styled(Clear)`
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
    background-color: #555; /* 선 색상 */
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
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <LeftContent>
          <GITLOG />
          <Text>You can make anything by writing</Text>
        </LeftContent>
        <RightContent>
          <Input width='80%' height='45px' placeholder='이메일' />
          <Input width='80%' height='45px' placeholder='비밀번호' />
          <Button
            width='82%'
            height='48px'
            borderStyle='none'
            color='white'
            bgColor='#00A1FF'
            radius='6px'
          >
            이메일로 로그인
          </Button>
          <Sns>SNS</Sns>
          <Button
            width='82%'
            height='48px'
            borderStyle='none'
            fontWeight='bold'
            bgColor='#FEE500'
            radius='6px'
            icon={KakaoIcon}
          >
            카카오로 로그인
          </Button>
          <SignUpText>또는 회원가입</SignUpText>
        </RightContent>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
