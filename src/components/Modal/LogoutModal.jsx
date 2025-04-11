import { Button, Modal, ModalText, ButtonContainer } from '@/components';
import { useLogin } from '@/context/LoginContext';

const LogoutModal = ({ isOpen: madalOpen, onClose }) => {
  const { setIsLogin } = useLogin();

  const goLogout = () => {
    setIsLogin(false); // 로그인 상태 false로 변경
  };

  return (
    <Modal isOpen={madalOpen}>
      <ModalText>
        <h4>로그아웃을 진행할게요</h4>
      </ModalText>
      <ButtonContainer>
        <Button onClick={onClose} width='150px' borderStyle='1px solid #dfdada' radius='3px'>
          취소
        </Button>
        <Button
          width='150px'
          borderStyle='none'
          radius='3px'
          color='white'
          bgColor='#00A1FF'
          onClick={() => {
            goLogout();
            onClose();
          }}
        >
          로그아웃
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

export default LogoutModal;
