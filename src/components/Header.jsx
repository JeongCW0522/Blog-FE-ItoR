import React from 'react';
import styled from 'styled-components';
import HeaderBar from '@/assets/reorder.svg?react';
import HeaderLogo from '@/assets/GITLOG2.svg?react';
import CreateIcon from '@/assets/create.svg?react';
import Button from './ui/Button';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <IconWrapper>
        <HeaderBar />
        <HeaderLogo />
      </IconWrapper>
      <Button width='150px' color='#909090' borderStyle='none' icon={CreateIcon}>
        깃로그 쓰기
      </Button>
    </HeaderContainer>
  );
};

export default Header;
