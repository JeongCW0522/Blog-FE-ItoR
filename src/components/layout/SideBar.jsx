import React from 'react';
import styled from 'styled-components';
import Image from '../ui/Image';
import Button from '../ui/Button';
import Profile from '@/assets/profile.svg?url';

const SideOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  z-index: 50;
`;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.5s ease-in-out;
  z-index: 100;
`;

const SidebarText = styled.p`
  font-size: 16px;
  margin-bottom: 40px;
  color: #535252;
  max-width: 200px;
  word-break: keep-all;
`;

const SideBar = ({ isOpen, onClose }) => {
  return (
    <SideOverlay $isOpen={isOpen} onClick={onClose}>
      <SidebarContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <Image src={Profile} alt='프로필' width='80px' height='80px' radius='50%' />
        <SidebarText>You can make anything by writing</SidebarText>
        <Button width='130px' color='#00A1FF' borderStyle='1px solid #00A1FF'>
          깃로그 시작하기
        </Button>
      </SidebarContainer>
    </SideOverlay>
  );
};

export default SideBar;
