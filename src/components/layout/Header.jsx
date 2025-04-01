import React from 'react';
import styled from 'styled-components';
import HeaderBar from '@/assets/reorder.svg?react';
import HeaderLogo from '@/assets/GITLOG2.svg?react';
import CreateIcon from '@/assets/create.svg?react';
import Button from '../ui/Button';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  width: 100%;
  max-width: 100vw;
  position: fixed;
  margin: 0 auto;
  padding-left: 20px;
  box-sizing: border-box;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

const Header = ({ onClick }) => {
  return (
    <HeaderContainer>
      <IconWrapper>
        <HeaderBar onClick={onClick} />
        <HeaderLogo />
      </IconWrapper>
      <Button width='150px' color='#909090' borderStyle='none' icon={CreateIcon}>
        깃로그 쓰기
      </Button>
    </HeaderContainer>
  );
};

export default Header;
