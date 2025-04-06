import { CreateIcon } from '@/assets';
import styled from 'styled-components';

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
  return (
    <Container>
      <CreateIcon />
      <TextButton>깃 로그 쓰기</TextButton>
    </Container>
  );
};

export default CreateLog;
