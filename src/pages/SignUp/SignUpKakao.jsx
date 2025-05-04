import styled from 'styled-components';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Header, Image, Button, Input, Modal, SignUpHeader } from '@/components';
import { AddPhoto, Profile, KakaoIcon } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate } from 'react-router-dom';
import { KakaoSignUp } from '@/api/SignUp';
import { useMutation } from '@tanstack/react-query';

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
    margin-top: 160px;
    margin-left: -20px;
  }
`;

const Text = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin: 15px 0 13px 7px;
`;

const SocialBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 15px;
  margin-top: -20px;
  height: 45px;
  background: #e6e6e6;
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  color: #b3b3b3;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const SignUpKakao = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const todayString = dayjs().format('YYYY년 M월 D일');
  const navigate = useNavigate();

  const onModalConfirm = () => {
    setModalOpen(false);
    navigate('/', { state: { openLoginModal: true } });
  };

  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [birthError, setBirthError] = useState(null);
  const [nicknameError, setNicknameError] = useState(null);
  const [bioError, setBioError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const signupMutation = useMutation({
    mutationFn: () =>
      KakaoSignUp({
        email,
        nickname,
        profilePicture: '',
        birthDate: birth,
        name,
        introduction: bio,
      }), //실행할 함수
    onSuccess: (data) => {
      if (data.error) {
        onValidation(data.message);
        console.log(data.message);
      } else {
        setModalOpen(true);
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onValidation = (msg) => {
    if (email.trim() === '') setEmailError({ message: '반드시 입력해야하는 필수 사항입니다.' });
    else if (msg.includes('이메일')) setEmailError({ message: msg });
    else setEmailError(null);

    if (name.trim() === '') setNameError({ message: '반드시 입력해야하는 필수 사항입니다.' });
    else if (msg.includes('이름')) setNameError({ message: msg });
    else setNameError(null);

    if (birth === '' || dayjs(birth).isAfter(dayjs()))
      setBirthError({ message: `${todayString} 이전의 날짜만 입력 가능합니다.` });
    else setBirthError(null);

    if (nickname.trim() === '')
      setNicknameError({ message: '반드시 입력해야하는 필수 사항입니다.' });
    else if (msg.includes('닉네임')) setNicknameError({ message: msg });
    else setNicknameError(null);

    if (bio.length > 30) setBioError({ message: '소개는 최대 30자 이하여야 합니다.' });
    else setBioError(null);
  };

  const handleSignUp = () => {
    signupMutation.mutate();
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
          <Text>소셜 로그인</Text>
          <SocialBox disabled>
            <KakaoIcon />
            카카오 로그인
          </SocialBox>
          {inputFields.map((field) => (
            <div key={field.name}>
              <Text>{field.label}</Text>
              <Input
                width='100%'
                height='45px'
                radius='3px'
                phSize='14px'
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
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

export default SignUpKakao;
