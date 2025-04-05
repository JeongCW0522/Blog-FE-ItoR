import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  gap: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

const DeleteandLog = () => {
  return (
    <Container>
      <Text style={{ color: '#FF3F3F' }}>삭제하기</Text>
      <Text>게시하기</Text>
    </Container>
  );
};

export default DeleteandLog;
