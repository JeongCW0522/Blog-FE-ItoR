import { useState } from 'react';
import { Header, Button, Input, Modal, SignUpHeader, SignUpProfile } from '@/components';
import { AddPhoto, KakaoIcon } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate, useLocation } from 'react-router-dom';
import { KakaoSignUp } from '@/api/SignUp';
import { useMutation } from '@tanstack/react-query';
import { createInputFields } from '@/constant/SignupFields';
import { onValidation } from '@/utils/validation';
import { Container, Content, Text, SocialBox } from '@/styles/SignupStyles';

const SignUpKakao = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { kakaoId, nickname, picture } = location.state || {};
  const [formData, setFormData] = useState({
    email: '',
    name: nickname || '',
    birth: '',
    nickname: '',
    bio: '',
  });

  const [formError, setFormError] = useState({});
  const [profileImage, setProfileImage] = useState('');
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
        profilePicture: profileImage || picture,
        birthDate: formData.birth,
        name: formData.name,
        introduction: formData.bio,
        kakaoId: kakaoId,
      }),
    onSuccess: (data) => {
      if (data.error) {
        onValidation(formData, setFormError, data.message, false, true);
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
    const isValid = onValidation(formData, setFormError, '', false, true); //먼저 실행
    if (isValid) {
      signupMutation.mutate();
    }
  };

  const inputFields = createInputFields(formData, setFormData, formError, true);
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <SignUpHeader />
        <Content>
          <SignUpProfile setProfileImage={setProfileImage} picture={picture} />
          <Text>소셜 로그인</Text>
          <SocialBox disabled>
            <KakaoIcon />
            카카오 로그인
          </SocialBox>
          {inputFields.map((field) => (
            <div key={field.name}>
              <Text>{field.label}</Text>
              <Input
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
