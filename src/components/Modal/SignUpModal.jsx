import { Button, Modal, ModalText, ButtonContainer } from '@/components';
import { Link } from 'react-router-dom';

const SignUpModal = ({ isOpen: madalOpen, onClose }) => {
  return (
    <Modal isOpen={madalOpen}>
      <ModalText>
        <h4>회원가입이 완료되었습니다.</h4>
      </ModalText>
      <ButtonContainer>
        <Button onClick={onClose} width='150px' borderStyle='1px solid #dfdada' radius='3px'>
          확인
        </Button>
        <Link to='/' state={{ openLoginModal: true }}>
          <Button width='150px' borderStyle='none' radius='3px' color='white' bgColor='#00A1FF'>
            로그인하기
          </Button>
        </Link>
      </ButtonContainer>
    </Modal>
  );
};

export default SignUpModal;
