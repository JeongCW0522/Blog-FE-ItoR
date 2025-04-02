import styled from 'styled-components';
import { Header, Image, Button, Input } from '@/components';
import { AddPhoto, Profile } from '@/assets';
import GlobalStyle from '@/styles/global';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  height: 150px;

  @media (max-width: 700px) {
    padding-left: 20px;
    height: 120px;
  }
`;

const Title = styled.h1`
  display: flex;
  padding-top: 30px;
  font-size: 24px;
  font-weight: bold;
  margin-left: 30%;

  @media (max-width: 700px) {
    padding-top: 15px;
    margin-left: 0px;
  }
`;

const SubTitle = styled.div`
  display: flex;
  font-size: 14px;
  color: #706e6e;
  margin-left: 30%;
  margin-bottom: 30px;

  @media (max-width: 700px) {
    margin-left: 0px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 210px auto;
  width: 40%;
  min-width: 600px;
  min-height: 800px;
  padding: 40px;
  gap: 20px;

  @media (max-width: 700px) {
    min-width: 300px;
    width: 90%;
    margin-top: 160px;
    margin-left: -20px;
  }
`;

const Text = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 7px;
`;

const Styledgap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SignUpEmail = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <TitleContainer>
          <Title>회원가입</Title>
          <SubTitle>가입을 위해 회원님의 정보를 입력해주세요</SubTitle>
        </TitleContainer>
        <Content>
          <Text>프로필 사진</Text>
          <Image src={Profile} alt='프로필' width='90px' height='90px' radius='50%' />
          <Button
            width='145px'
            height='27px'
            borderStyle='1px solid #E6E6E6'
            color='#9e9e9e'
            radius='3px'
            icon={AddPhoto}
          >
            프로필 사진 추가
          </Button>
          <Styledgap>
            <Text>이메일</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='이메일'
              phSize='14px'
            ></Input>
            <Text>비밀번호</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='......'
              phSize='14px'
            ></Input>
            <Text>비밀번호 확인</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='......'
              phSize='14px'
            ></Input>
            <Text>이름</Text>
            <Input width='100%' height='45px' radius='3px' placeholder='이름' phSize='14px'></Input>
            <Text>생년월일</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='YYYY-MM-DD'
              phSize='14px'
            ></Input>
            <Text>닉네임</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='닉네임'
              phSize='14px'
            ></Input>
            <Text>한 줄 소개</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='한 줄 소개'
              phSize='14px'
            ></Input>
          </Styledgap>
          <br />
          <Button width='102%' color='#00A1FF' borderStyle='1px solid #00A1FF'>
            회원가입 완료
          </Button>
        </Content>
      </Container>
    </>
  );
};

export default SignUpEmail;
