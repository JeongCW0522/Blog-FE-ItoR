import styled from 'styled-components';
import { Header, Image, Input } from '@/components';
import { Profile } from '@/assets';
import GlobalStyle from '@/styles/global';
import SetMypage from '@/components/layout/Header/SetMypage';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 420px;

  @media (max-width: 700px) {
    height: 390px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 37%;
  min-width: 600px;
  min-height: 1000px;
  padding: 40px;
  gap: 20px;

  @media (max-width: 700px) {
    min-width: 300px;
    width: 90%;
    margin-left: 0;
    padding: 20px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  padding-top: 100px;
  gap: 20px;

  @media (max-width: 700px) {
    min-width: 440px;
    padding-top: 80px;
  }
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  margin-bottom: 40px;
  gap: 40px;
`;

const Styledgap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Text = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 7px;
`;

const Mypage = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header setMypage={<SetMypage />} />
        <Content>
          <ProfileContent>
            <Image src={Profile} alt='프로필' width='64px' height='64px' radius='50%' />
            <InputContent>
              <Input
                width='100%'
                height='60px'
                fontSize='24px'
                radius='3px'
                placeholder='닉네임'
                phSize='24px'
                bgColor='#f5f5f5'
              />
              <Input
                width='100%'
                height='45px'
                radius='3px'
                placeholder='한 줄 소개'
                phSize='14px'
                bgColor='#f5f5f5'
              />
            </InputContent>
          </ProfileContent>
          <Styledgap>
            <Text>이메일</Text>
            <Input width='100%' height='45px' radius='3px' placeholder='이메일' phSize='14px' />

            <Text>비밀번호</Text>
            <Input width='100%' height='45px' radius='3px' placeholder='......' phSize='14px' />
            <Text>비밀번호 확인</Text>
            <Input width='100%' height='45px' radius='3px' placeholder='......' phSize='14px' />
            <Text>이름</Text>
            <Input width='100%' height='45px' radius='3px' placeholder='이름' phSize='14px' />
            <Text>생년월일</Text>
            <Input width='100%' height='45px' radius='3px' placeholder='YYYY-MM-DD' phSize='14px' />
          </Styledgap>
        </Content>
      </Container>
    </>
  );
};

export default Mypage;
