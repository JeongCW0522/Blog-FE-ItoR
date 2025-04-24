import { useState } from 'react';
import styled from 'styled-components';
import { Button, Image, Modal, Toast } from '@/components';
import { useLogin } from '@/context/LoginContext';
import { MoreIcon } from '@/assets';

const CommentContent = styled.div`
  max-width: 720px;
  width: 100%;
  margin-top: 25px;
`;

const CommentHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
  span {
    color: #007aff;
    margin-left: 4px;
  }
`;

const NoComment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 0;
  color: #c8c8c8;
  margin: 50px 0;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 16px;
`;

const PostedCommetBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0 60px;
`;

const PostedCommentContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentData = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #909090;
  padding-left: 27px;
  margin-top: 0px;
`;

const PostedComment = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #333;
  line-height: 160%;
  padding-left: 25px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: ${({ $disabled }) => ($disabled ? '80px' : '100px')};
  padding: ${({ $disabled }) => ($disabled ? '25px 16px' : '10px 0')};
  margin: ${({ $disabled }) => !$disabled && '10px 0 -10px'};
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border: ${({ $disabled }) => ($disabled ? '1px solid #e6e6e6' : 'none')};
  border-bottom: ${({ $disabled }) => !$disabled && '1px solid #e6e6e6'};
  border-radius: 4px;
  resize: none;
  outline: none;

  &::placeholder {
    color: #909090;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909090;
  gap: 6px;
`;

const StyledMoreIcon = styled(MoreIcon)`
  &:hover {
    opacity: 0.6;
  }
`;

const BlogComment = ({ post }) => {
  const { isLogin } = useLogin();
  const [commentList, setCommentList] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [toastData, setToastData] = useState({ show: false, type: '', message: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const PostComment = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      text: commentInput,
    };
    setCommentList((prev) => [...prev, newComment]);
    setCommentInput('');
  };

  const onToast = (message) => {
    setToastData({ show: true, type: 'positive', message });
    setTimeout(() => setToastData((prev) => ({ ...prev, show: false })), 2000);
  };

  const deleteComment = () => {
    setCommentList((prev) => prev.filter((comment) => comment.id !== deleteId));
    setModalOpen(false);
    setDeleteId(null);
    onToast('삭제가 완료되었습니다!');
  };

  return (
    <CommentContent id='comment'>
      <Toast show={toastData.show} text={toastData.message} type={toastData.type} />
      <CommentHeader>
        댓글 <span>{commentList.length}</span>
      </CommentHeader>
      {commentList.length === 0 && (
        <NoComment>
          <p>작성된 댓글이 없습니다.</p>
          <p>응원의 첫 번째 댓글을 달아주세요.</p>
        </NoComment>
      )}
      {commentList.map((comment) => (
        <PostedCommetBox key={comment.id}>
          <PostedCommentContent>
            <InfoWrapper>
              <Image width='20px' height='20px' src={post.profileImg} alt='프로필' />
              <span style={{ color: '#333' }}>{post.nickname}</span>
            </InfoWrapper>
            <StyledMoreIcon
              onClick={() => {
                setDeleteId(comment.id);
                setModalOpen(true);
              }}
            />
          </PostedCommentContent>
          <CommentData>{post.date}</CommentData>
          <PostedComment>{comment.text}</PostedComment>
        </PostedCommetBox>
      ))}
      {isLogin ? (
        <CommentBox>
          <InfoWrapper>
            <Image width='20px' height='20px' src={post.profileImg} alt='프로필' />
            <span style={{ color: '#333' }}>{post.nickname}</span>
          </InfoWrapper>
          <StyledTextarea
            placeholder='댓글을 입력해주세요.'
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <br />
          <ButtonWrapper>
            <Button
              width='65px'
              borderStyle='1px solid #909090'
              color='#909090'
              radius='25px'
              onClick={PostComment}
            >
              등록
            </Button>
          </ButtonWrapper>
        </CommentBox>
      ) : (
        <StyledTextarea disabled $disabled placeholder='로그인을 하고 댓글을 달아보세요!' />
      )}
      <Modal
        isOpen={modalOpen}
        title='댓글을 삭제할까요?'
        confirmText='삭제하기'
        closeText='취소'
        bgColor='#FF3F3F'
        onClose={() => setModalOpen(false)}
        onConfirm={deleteComment}
      />
    </CommentContent>
  );
};

export default BlogComment;
