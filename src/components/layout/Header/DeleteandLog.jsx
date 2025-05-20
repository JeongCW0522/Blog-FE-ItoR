import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  gap: 20px;

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

  &:hover {
    opacity: 0.6;
  }
`;

const DeleteandLog = ({ onToast, onPost }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <TextButton
        style={{ color: '#FF3F3F' }}
        onClick={() => {
          navigate(`/`, {
            state: {
              toastData: {
                show: true,
                type: 'positive',
                message: '삭제되었습니다!',
              },
            },
          });
        }}
      >
        삭제하기
      </TextButton>
      <TextButton
        onClick={() => {
          onToast?.();
          onPost();
        }}
      >
        게시하기
      </TextButton>
    </Container>
  );
};

export default DeleteandLog;
