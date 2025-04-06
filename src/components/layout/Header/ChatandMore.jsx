import { ChatIcon, MoreIcon } from '@/assets';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  gap: 20px;
  color: #909090;
`;

const StyledChatIcon = styled(ChatIcon)`
  &:hover {
    opacity: 0.6;
  }
`;

const StyledMoreIcon = styled(MoreIcon)`
  &:hover {
    opacity: 0.6;
  }
`;

const ChatandMore = () => {
  return (
    <Container>
      <StyledChatIcon />
      <StyledMoreIcon />
    </Container>
  );
};

export default ChatandMore;
