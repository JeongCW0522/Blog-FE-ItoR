import { useState } from 'react';
import { Header, Image, Button, Input, Modal, SignUpHeader } from '@/components';
import { AddPhoto, Profile, KakaoIcon } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate } from 'react-router-dom';
import { KakaoSignUp } from '@/api/SignUp';
import { useMutation } from '@tanstack/react-query';
import { createInputFields } from '@/constant/SignupFields';
import { onValiadation } from '@/utils/validation';
import { Container, Content, Text, SocialBox } from '@/styles/SignupStyles';

const SignUpKakao = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birth: '',
    nickname: '',
    bio: '',
  });

  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  const onModalConfirm = () => {
    setModalOpen(false);
    navigate('/', { state: { openLoginModal: true } });
  };

  const signupMutation = useMutation({
    mutationFn: () =>
      KakaoSignUp({
        email: formData.email,
        nickname: formData.nickname,
        profilePicture: '',
        birthDate: formData.birth,
        name: formData.name,
        introduction: formData.bio,
      }),
    onSuccess: (data) => {
      if (data.error) {
        onValiadation(formData, setFormError, data.message);
        console.log(data.message);
      } else {
        setModalOpen(true);
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSignUp = () => {
    const isValid = onValiadation(formData, setFormError); //먼저 실행
    if (isValid) {
      signupMutation.mutate();
    }
  };

  const inputFields = createInputFields(formData, setFormData, formError);
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
