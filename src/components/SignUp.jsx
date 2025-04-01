import styled from 'styled-components';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import KakaoIcon from '@/assets/kakaologo.svg?react';
import GITLOG from '@/assets/GITLOG2.svg?react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 680px 1fr;
  background-color: #f5f5f5;
  height: 120px;
  contain: strict;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding-left: 20px;
    height: 100px;
  }
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  grid-column: 2;

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

const Content = styled.div`
  display: flex;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  min-height: 450px;
  will-change: transform;

  @media (max-width: 700px) {
    top: 55%;
    width: 90%;
    height: 60%;
    flex-direction: column;
  }
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
  gap: 10px;

  @media (max-width: 700px) {
    margin-top: -25px;
    width: 100%;
    height: 30%;
  }
`;

const SubText = styled.div`
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
    background-color: #c5c3c3;
  }
`;

const Signup = () => {
  return (
    <Container>
      <Header />
      <TitleContainer>
        <Title>회원가입</Title>
      </TitleContainer>
      <Content>
        <LeftContent>
          <GITLOG width='284' height='77' />
          <Text>You can make anything by writing</Text>
        </LeftContent>
        <RightContent>
          <Button
            width='82%'
            height='48px'
            borderStyle='none'
            color='white'
            bgColor='#00A1FF'
            radius='6px'
          >
            이메일로 회원가입
          </Button>
          <SubText>또는</SubText>
          <Button
            width='82%'
            height='48px'
            borderStyle='none'
            fontWeight='bold'
            bgColor='#FEE500'
            radius='6px'
            icon={KakaoIcon}
          >
            카카오로 회원가입
          </Button>
        </RightContent>
      </Content>
    </Container>
  );
};

export default Signup;
