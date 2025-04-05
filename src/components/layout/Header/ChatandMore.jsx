import { ChatIcon, MoreIcon } from '@/assets';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  gap: 20px;
  color: #909090;
  &:hover {
    cursor: pointer;
  }
`;

const ChatandMore = () => {
  return (
    <Container>
      <ChatIcon />
      <MoreIcon />
    </Container>
  );
};

export default ChatandMore;
