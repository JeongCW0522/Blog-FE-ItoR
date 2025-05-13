import styled from 'styled-components';
import { Profile } from '@/assets';
import { Image } from '@/components';

const Nickname = styled.div`
  padding-top: 20px;
  font-size: 24px;
  line-height: 160%;
`;

const BioText = styled.p`
  font-size: 14px;
  margin-bottom: 35px;
  color: #535252;
  max-width: 200px;
  word-break: keep-all;
  line-height: 160%;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 350px;
  padding: 10px 5px;
  margin-top: 100px;
  background-color: #f5f5f5;
`;

const ProfileContent = styled.div`
  width: 720px;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const BlogDetailFooter = () => {
  return (
    <ProfileBox>
      <ProfileContent>
        <Image src={Profile} alt='프로필' width='64px' height='64px' radius='50%' />
        <Nickname>닉네임</Nickname>
        <BioText>한 줄 소개</BioText>
      </ProfileContent>
    </ProfileBox>
  );
};

export default BlogDetailFooter;
