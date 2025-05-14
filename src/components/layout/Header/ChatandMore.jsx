import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChatIcon, MoreIcon } from '@/assets';
import { Modal } from '@/components';
import styled from 'styled-components';
import { deletePost } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

const MenuBox = styled.div`
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
  color: red;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  font-size: 14px;
  padding: 6px 0;
  color: black;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const ChatandMore = ({ postId }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const openTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const scrollToComment = () => {
    const comment = document.getElementById('comment');
    if (comment) {
      comment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const { mutation: handleDeletePost } = useMutation({
    mutationFn: () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error();
      }
      return deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList'] });
      navigate('/');
    },
    onError: () => {
      setModalOpen(false);
    },
  });

  return (
    <>
      <Container>
        <StyledChatIcon onClick={scrollToComment} />
        <StyledMoreIcon onClick={openTooltip} />
        {showTooltip && (
          <MenuBox>
            <StyledLink to='./edit'>수정하기</StyledLink>
            <TextItem onClick={() => setModalOpen(true)}>삭제하기</TextItem>
          </MenuBox>
        )}
      </Container>
      <Modal
        isOpen={modalOpen}
        title='해당 블로그를 삭제하시겠어요?'
        description='삭제된 블로그는 다시 확인할 수 없어요.'
        confirmText='삭제하기'
        closeText='취소'
        bgColor='#FF3F3F'
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeletePost}
      />
    </>
  );
};

export default ChatandMore;
