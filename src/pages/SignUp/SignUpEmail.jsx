import { useState } from 'react';
import styled from 'styled-components';
import { Header, Image, Button, Input } from '@/components';
import { AddPhoto, Profile } from '@/assets';
import GlobalStyle from '@/styles/global';
import SignUpModal from '@/components/Modal/SignUpModal';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
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
  margin: 0 0 30px 30%;

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
    margin-top: 160px 0 0 -20px;
  }
`;

const Text = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin: 15px 0 13px 7px;
`;

const Styledgap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SignUpEmail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const today = new Date();
  const todayString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const [emailError, setEmailError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [birthError, setBirthError] = useState(null);
  const [nicknameError, setNicknameError] = useState(null);
  const [bioError, setBioError] = useState(null);

  const handleSignUp = () => {
    let isValid = true;

    if (email.trim() === '') {
      setEmailError({ message: '반드시 입력해야하는 필수 사항입니다.' });
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError({ message: '비밀번호가 일치하지 않습니다.' });
      isValid = false;
    } else {
      setConfirmPasswordError(null);
    }

    if (name.trim() === '') {
      setNameError({ message: '반드시 입력해야하는 필수 사항입니다.' });
      isValid = false;
    } else {
      setNameError(null);
    }

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

  const inputFields = [
    {
      label: '이메일',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      name: 'email',
      error: emailError,
      placeholder: '이메일',
      type: 'email',
    },
    {
      label: '비밀번호',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      name: 'password',
      error: null,
      placeholder: '비밀번호',
      type: 'password',
    },
    {
      label: '비밀번호 확인',
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      name: 'confirmPassword',
      error: confirmPasswordError,
      placeholder: '비밀번호 확인',
      type: 'password',
    },
    {
      label: '이름',
      value: name,
      onChange: (e) => setName(e.target.value),
      name: 'name',
      error: nameError,
      placeholder: '이름',
      type: 'text',
    },
    {
      label: '생년월일',
      value: birth,
      onChange: (e) => setBirth(e.target.value),
      name: 'birth',
      error: birthError,
      placeholder: 'YYYY-MM-DD',
      type: 'text',
    },
    {
      label: '닉네임',
      value: nickname,
      onChange: (e) => setNickname(e.target.value),
      name: 'nickname',
      error: nicknameError,
      placeholder: '닉네임',
      type: 'text',
    },
    {
      label: '한 줄 소개',
      value: bio,
      onChange: (e) => setBio(e.target.value),
      name: 'bio',
      error: bioError,
      placeholder: '한 줄 소개',
      type: 'text',
    },
  ];

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <ProfileContainer>
          <Title>회원가입</Title>
          <SubTitle>가입을 위해 회원님의 정보를 입력해주세요</SubTitle>
        </ProfileContainer>
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
            {inputFields.map((field) => (
              <div key={field.name}>
                <Text>{field.label}</Text>
                <Input
                  width='100%'
                  height='45px'
                  radius='3px'
                  placeholder={field.placeholder}
                  phSize='14px'
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  type={field.type}
                  errorState={field.error}
                />
              </div>
            ))}
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

export default SignUpEmail;
