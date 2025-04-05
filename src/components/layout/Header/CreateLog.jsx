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

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

const CreateLog = () => {
  return (
    <Container>
      <CreateIcon />
      <Text>깃 로그 쓰기</Text>
    </Container>
  );
};

export default CreateLog;
