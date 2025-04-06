import { Button, Modal, ModalText, ButtonContainer } from '@/components';
import { Link } from 'react-router-dom';

const LogoutModal = ({ isOpen: madalOpen, onClose }) => {
  return (
    <Modal isOpen={madalOpen}>
      <ModalText>
        <h4>로그아웃을 진행할게요</h4>
      </ModalText>
      <ButtonContainer>
        <Button onClick={onClose} width='150px' borderStyle='1px solid #dfdada' radius='3px'>
          취소
        </Button>
        <Link to='/' state={{ openLoginModal: true }}>
          <Button width='150px' borderStyle='none' radius='3px' color='white' bgColor='#00A1FF'>
            로그아웃
          </Button>
        </Link>
      </ButtonContainer>
    </Modal>
  );
};

export default LogoutModal;
