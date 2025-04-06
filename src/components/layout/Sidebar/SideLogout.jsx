import { Image, Button } from '@/components';
import styled from 'styled-components';
import Profile from '@/assets/profile.svg?url';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
`;

const SidebarText = styled.p`
  font-size: 16px;
  margin-bottom: 35px;
  color: #535252;
  max-width: 200px;
  word-break: keep-all;
  line-height: 160%;
`;

const SideLogout = ({ openLoginModal }) => {
  return (
    <Container>
      <Image src={Profile} alt='프로필' width='80px' height='80px' radius='50%' />
      <SidebarText>You can make anything by writing</SidebarText>
      <Button
        width='130px'
        color='#00A1FF'
        borderStyle='1px solid #00A1FF'
        onClick={openLoginModal}
      >
        깃로그 시작하기
      </Button>
    </Container>
  );
};

export default SideLogout;
