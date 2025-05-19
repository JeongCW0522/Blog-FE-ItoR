import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Image, Header, BlogPostList } from '@/components';
import { Profile, SettingIcon } from '@/assets';
import GlobalStyle from '@/styles/global';
import SetMypage from '@/components/layout/Header/EditLog';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 400px;

  @media (max-width: 700px) {
    height: 380px;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 700px;
  padding: 50px 0 0 20px;

  @media (max-width: 700px) {
    min-width: 440px;
    padding-top: 40px 0 0;
  }
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  margin-bottom: 40px;
`;

const Nickname = styled.div`
  padding-top: 20px;
  font-size: 24px;
  line-height: 160%;
`;

const BioText = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: #535252;
  max-width: 200px;
  word-break: keep-all;
  line-height: 160%;
`;

const Content = styled.div`
  width: 700px;
  margin: 60px auto;

  @media (max-width: 700px) {
    min-width: 400px;
    padding: 0 10px;
  }
`;

const MyBlog = () => {
  const nickName = localStorage.getItem('nickname');
  const profilePicture = localStorage.getItem('profilePicture');
  const introduction = localStorage.getItem('introduction');
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header setMypage={<SetMypage />} />
        <ProfileBox>
          <ProfileContent>
            <InputContent>
              <Image
                src={profilePicture || Profile}
                alt='프로필'
                width='64px'
                height='64px'
                radius='50%'
              />
              <Nickname>{nickName}</Nickname>
              <BioText>{introduction}</BioText>
              <Link to='/mypage'>
                <Button
                  icon={SettingIcon}
                  width='110px'
                  height='27px'
                  fontSize='12px'
                  borderStyle='1px solid #E6E6E6'
                  radius='3px'
                  color='#909090'
                  bgColor='#f5f5f5'
                >
                  내 프로필 설정
                </Button>
              </Link>
            </InputContent>
          </ProfileContent>
        </ProfileBox>
        <Content>
          <BlogPostList isOwner={true} />
        </Content>
      </Container>
    </>
  );
};

export default MyBlog;
