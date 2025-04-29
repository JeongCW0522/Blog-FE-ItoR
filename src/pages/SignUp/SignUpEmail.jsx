import { useState } from 'react';
import styled from 'styled-components';
import { Header, Image, Button, Input, Modal, SignUpHeader } from '@/components';
import { AddPhoto, Profile } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { EmailSignUp } from '@/api/SignUp';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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

const SignUpEmail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const navigate = useNavigate();
  const todayString = dayjs().format('YYYY년 M월 D일');

  const onModalConfirm = () => {
    setModalOpen(false);
    navigate('/', { state: { openLoginModal: true } });
  };

  const [emailError, setEmailError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [birthError, setBirthError] = useState(null);
  const [nicknameError, setNicknameError] = useState(null);
  const [bioError, setBioError] = useState(null);

  const handleSignUp = async () => {
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
      const response = await EmailSignUp(email, nickname, password, '', birth, name, bio);
      if (response.error) {
        console.log(response.message);
      } else {
        setModalOpen(true);
      }
    }
  };

  const inputFields = [
    {
      label: '이메일',
      onChange: (e) => setEmail(e.target.value),
      value: email,
      name: 'email',
      error: emailError,
      placeholder: '이메일',
      type: 'email',
    },
    {
      label: '비밀번호',
      onChange: (e) => setPassword(e.target.value),
      value: password,
      name: 'password',
      error: null,
      placeholder: '비밀번호',
      type: 'password',
    },
    {
      label: '비밀번호 확인',
      onChange: (e) => setConfirmPassword(e.target.value),
      vlaue: confirmPassword,
      name: 'confirmPassword',
      error: confirmPasswordError,
      placeholder: '비밀번호 확인',
      type: 'password',
    },
    {
      label: '이름',
      onChange: (e) => setName(e.target.value),
      value: name,
      name: 'name',
      error: nameError,
      placeholder: '이름',
      type: 'text',
    },
    {
      label: '생년월일',
      onChange: (e) => setBirth(e.target.value),
      value: birth,
      name: 'birth',
      error: birthError,
      placeholder: 'YYYY-MM-DD',
      type: 'text',
    },
    {
      label: '닉네임',
      onChange: (e) => setNickname(e.target.value),
      value: nickname,
      name: 'nickname',
      error: nicknameError,
      placeholder: '닉네임',
      type: 'text',
    },
    {
      label: '한 줄 소개',
      onChange: (e) => setBio(e.target.value),
      value: bio,
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
        <SignUpHeader />
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
          <br />
          <Button
            width='102%'
            color='#00A1FF'
            borderStyle='1px solid #00A1FF'
            onClick={handleSignUp}
          >
            회원가입 완료
          </Button>
          <Modal
            isOpen={modalOpen}
            title='회원가입이 완료되었습니다.'
            confirmText='로그인하기'
            closeText='확인'
            bgColor='#00A1FF'
            onClose={() => setModalOpen(false)}
            onConfirm={onModalConfirm}
          />
        </Content>
      </Container>
    </>
  );
};

export default SignUpEmail;
