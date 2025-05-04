import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Header, Image, Input } from '@/components';
import { Profile } from '@/assets';
import GlobalStyle from '@/styles/global';
import SetMypage from '@/components/layout/Header/EditLog';

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
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    bio: '',
    email: '',
    password: '',
    name: '',
    birth: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) {
      setUserInfo(storedUser);
    }
  }, []);

  const inputFields = [
    { label: '이메일', value: userInfo?.email || '', placeholder: '이메일' },
    { label: '비밀번호', value: userInfo?.password || '', placeholder: '......', type: 'password' },
    {
      label: '비밀번호 확인',
      value: userInfo?.password || '',
      placeholder: '......',
      type: 'password',
    },
    { label: '이름', value: userInfo?.name || '', placeholder: '이름' },
    { label: '생년월일', value: userInfo?.birth || '', placeholder: 'YYYY-MM-DD' },
  ];

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
                value={userInfo?.nickname || ''}
                disabled
              />
              <Input
                width='100%'
                height='45px'
                radius='3px'
                placeholder='한 줄 소개'
                phSize='14px'
                bgColor='#f5f5f5'
                value={userInfo?.bio || ''}
                disabled
              />
            </InputContent>
          </ProfileContent>
          <Styledgap>
            <Text>이메일</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='이메일'
              phSize='14px'
              value={userInfo?.email || ''}
              disabled
            />
            <Text>비밀번호</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='......'
              phSize='14px'
              value={userInfo?.password || ''}
              type='password'
              disabled
            />
            <Text>비밀번호 확인</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='......'
              phSize='14px'
              value={userInfo?.password || ''}
              type='password'
              disabled
            />
            <Text>이름</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='이름'
              phSize='14px'
              value={userInfo?.name || ''}
              disabled
            />
            <Text>생년월일</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='YYYY-MM-DD'
              phSize='14px'
              value={userInfo?.birth || ''}
              disabled
            />
          </Styledgap>
        </Content>
      </Container>
    </>
  );
};

export default Mypage;
