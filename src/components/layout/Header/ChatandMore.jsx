import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatIcon, MoreIcon } from '@/assets';
import { Button, Modal, ModalText, ButtonContainer } from '@/components';
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

const TooltipBox = styled.div`
  position: absolute;
  top: 60px;
  right: 15px;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  padding: 12px;
  z-index: 100px;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  min-height: 70px;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 12px;
    border-width: 0 8px 8px 8px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

const TextItem = styled.div`
  font-size: 14px;
  padding: 6px 0;
  color: ${(props) => props.color || 'black'};
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const ChatandMore = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const scrollToComment = () => {
    const comment = document.getElementById('comment');
    if (comment) {
      comment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <Container>
        <StyledChatIcon onClick={scrollToComment} />
        <StyledMoreIcon onClick={openTooltip} />
        {showTooltip && (
          <TooltipBox>
            <StyledLink to='./edit'>
              <TextItem color='black'>수정하기</TextItem>
            </StyledLink>
            <TextItem color='red' onClick={() => setModalOpen(true)}>
              삭제하기
            </TextItem>
          </TooltipBox>
        )}
      </Container>
      <Modal isOpen={modalOpen}>
        <ModalText>
          <h4>해당 블로그를 삭제하시겠어요?</h4>
          <p>삭제된 블로그는 다시 확인할 수 없어요.</p>
        </ModalText>
        <ButtonContainer>
          <Button
            onClick={() => setModalOpen(false)}
            width='150px'
            borderStyle='1px solid #dfdada'
            radius='3px'
          >
            취소
          </Button>
          <Button width='150px' borderStyle='none' radius='3px' color='white' bgColor='#FF3F3F'>
            삭제하기
          </Button>
        </ButtonContainer>
      </Modal>
    </>
  );
};

export default ChatandMore;
