import styled from 'styled-components';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Header, Image, Button, Input, Modal, SignUpHeader } from '@/components';
import { AddPhoto, Profile, KakaoIcon } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate } from 'react-router-dom';

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
  const [birth, setBirth] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const todayString = dayjs().format('YYYY년 M월 D일');
  const navigate = useNavigate();

  const onModalConfirm = () => {
    setModalOpen(false);
    navigate('/', { state: { openLoginModal: true } });
  };

  const [birthError, setBirthError] = useState(null);
  const [nicknameError, setNicknameError] = useState(null);
  const [bioError, setBioError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

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

  const inputFields = [
    {
      label: '이메일',
      name: 'email',
      placeholder: '이메일',
      type: 'email',
      disabled: true,
    },
    {
      label: '이름',
      name: 'name',
      placeholder: '이름',
      type: 'text',
      disabled: true,
    },
    {
      label: '생년월일',
      onChange: (e) => setBirth(e.target.value),
      name: 'birth',
      error: birthError,
      placeholder: 'YYYY-MM-DD',
      type: 'text',
    },
    {
      label: '닉네임',
      onChange: (e) => setNickname(e.target.value),
      name: 'nickname',
      error: nicknameError,
      placeholder: '닉네임',
      type: 'text',
    },
    {
      label: '한 줄 소개',
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
                borderStyle={field.disabled && 'none'}
                bgColor={field.disabled && '#E6E6E6'}
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
                value={field.name}
                onChange={field.onChange}
                errorState={field.error}
                disabled={field.disabled}
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
