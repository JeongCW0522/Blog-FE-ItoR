import styled from 'styled-components';

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

const DeleteandLog = () => {
  return (
    <Container>
      <TextButton style={{ color: '#FF3F3F' }}>삭제하기</TextButton>
      <TextButton>게시하기</TextButton>
    </Container>
  );
};

export default DeleteandLog;
