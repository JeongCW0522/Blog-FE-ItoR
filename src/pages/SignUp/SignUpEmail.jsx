import { useState } from 'react';
import { Header, Button, Input, Modal, SignUpHeader, SignUpProfile } from '@/components';
import GlobalStyle from '@/styles/global';
import { useNavigate } from 'react-router-dom';
import { EmailSignUp } from '@/api/SignUp';
import { useMutation } from '@tanstack/react-query';
import { createInputFields } from '@/utils/SignupFields';
import { onValidation } from '@/utils/validation';
import { Container, Content, Text } from '@/styles/SignupStyles';
import { useToast } from '@/context/ToastContext';

const SignUpEmail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();
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
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  const onModalConfirm = () => {
    setModalOpen(false);
    navigate('/', { state: { openLoginModal: true } }); //로그인하기 버튼 누르면 홈으로 이동하면서 로그인 모달 띄움
  };

  const signupMutation = useMutation({
    mutationFn: () =>
      EmailSignUp({
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
        profilePicture: profileImage || '',
        birthDate: formData.birth,
        name: formData.name,
        introduction: formData.bio,
      }),
    onSuccess: (data) => {
      if (data.error) {
        onValidation(formData, setFormError, data.message); // 사용 중인 이메일, 닉네임 여부 확인
        console.log(data.message);
      } else {
        setModalOpen(true);
        showToast('positive', '회원가입이 완료되었습니다.');
      }
    },
    onError: () => {
      showToast('error', '회원가입에 실패했습니다.');
    },
  });

  const handleSignUp = () => {
    const isValid = onValidation(formData, setFormError); //먼저 실행
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
          <SignUpProfile setProfileImage={setProfileImage} />
          {inputFields.map((field) => (
            <div key={field.name}>
              <Text>{field.label}</Text>
              <Input
                placeholder={field.placeholder}
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
