import styled from 'styled-components';
import { useState } from 'react';
import { Header, Image, Button, Input, SignUpModal } from '@/components';
import { AddPhoto, Profile, KakaoIcon } from '@/assets';
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

const SocialBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 15px;
  height: 45px;
  background: #e6e6e6;
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  color: #b3b3b3;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const SignUpKakao = () => {
  const [birth, setBirth] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const today = new Date();
  const todayString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const [birthError, setBirthError] = useState(null);
  const [nicknameError, setNicknameError] = useState(null);
  const [bioError, setBioError] = useState(null);

  const handleSignUp = () => {
    let isValid = true;

    if (birth.trim() === '') {
      setBirthError({ message: `${todayString} 이전의 날짜만 입력 가능합니다.` });
      isValid = false;
    } else {
      setBirthError(null);
    }

    if (nickname.trim() === '' || nickname.length > 20) {
      setNicknameError({ message: '닉네임은 최대 20글자입니다.' });
      isValid = false;
    } else {
      setNicknameError(null);
    }

    if (bio.trim() === '' || bio.length > 30) {
      setBioError({ message: '한 줄 소개는 최대 30글자입니다.' });
      isValid = false;
    } else {
      setBioError(null);
    }

    if (isValid) {
      setModalOpen(true);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

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
            <Text>소셜 로그인</Text>
            <SocialBox disabled>
              <KakaoIcon />
              카카오 로그인
            </SocialBox>
            <Text>이메일</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='jcw0522@gachon.ac.kr'
              phSize='14px'
              borderStyle='none'
              bgColor='#E6E6E6'
              disabled={true}
            />
            <Text>이름</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='정찬원'
              phSize='14px'
              borderStyle='none'
              bgColor='#E6E6E6'
              disabled={true}
            />
            <Text>생년월일</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='YYYY-MM-DD'
              phSize='14px'
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              fieldState={birthError}
            />
            <Text>닉네임</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='닉네임'
              phSize='14px'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              fieldState={nicknameError}
            />
            <Text>한 줄 소개</Text>
            <Input
              width='100%'
              height='45px'
              radius='3px'
              placeholder='한 줄 소개'
              phSize='14px'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fieldState={bioError}
            />
          </Styledgap>
          <br />
          <Button
            width='102%'
            color='#00A1FF'
            borderStyle='1px solid #00A1FF'
            onClick={handleSignUp}
          >
            회원가입 완료
          </Button>
          <SignUpModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </Content>
      </Container>
    </>
  );
};

export default SignUpKakao;
