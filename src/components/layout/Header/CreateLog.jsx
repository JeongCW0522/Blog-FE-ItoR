import { useState } from 'react';
import { CreateIcon } from '@/assets';
import { LoginModal } from '@/components';
import styled from 'styled-components';
import { useLogin } from '@/context/LoginContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  gap: 4px;
  color: #909090;

  &:hover {
    cursor: pointer;
  }
`;

const TextButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  color: #909090;

  &:hover {
    opacity: 0.6;
  }
`;

const CreateLog = () => {
  const [isLoginModal, setIsLoginModal] = useState(false);

  const openLoginModal = () => {
    if (isLogin) {
      navigate('/write');
    } else {
      setIsLoginModal(true);
    }
  };
  const closeLoginModal = () => setIsLoginModal(false);

  const navigate = useNavigate();
  const { isLogin } = useLogin();

  return (
    <>
      <Container onClick={openLoginModal}>
        <CreateIcon />
        <TextButton>깃로그 쓰기</TextButton>
      </Container>
      {isLoginModal && <LoginModal isOpen={isLoginModal} onClose={closeLoginModal} />}
    </>
  );
};

export default CreateLog;
