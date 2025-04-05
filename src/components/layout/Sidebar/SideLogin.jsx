import { Image, Button } from '@/components';
import styled from 'styled-components';
import Profile from '@/assets/profile.svg?url';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  padding-top: 20px;
  font-size: 24px;

  line-height: 160%;
`;

const SidebarText = styled.p`
  font-size: 16px;
  margin-bottom: 35px;
  color: #535252;
  max-width: 200px;
  word-break: keep-all;
  line-height: 160%;
`;

const GitButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 25px;
`;

const SetButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 50px;
  gap: 25px;
`;

const SideLogin = () => {
  return (
    <Container>
      <Image src={Profile} alt='프로필' width='80px' height='80px' radius='50%' />
      <Nickname>닉네임</Nickname>
      <SidebarText>You can make anything by writing</SidebarText>
      <GitButton>
        <Button width='110px' color='#00A1FF' borderStyle='1px solid #00A1FF'>
          나의 깃로그
        </Button>
        <Button width='110px' color='#00A1FF' borderStyle='1px solid #00A1FF'>
          깃로그 쓰기
        </Button>
      </GitButton>
      <SetButton>
        <Button width='110px' color='#909090' borderStyle='1px solid #909090'>
          설정
        </Button>
        <Button width='110px' color='#909090' borderStyle='1px solid #909090'>
          로그아웃
        </Button>
      </SetButton>
    </Container>
  );
};

export default SideLogin;
