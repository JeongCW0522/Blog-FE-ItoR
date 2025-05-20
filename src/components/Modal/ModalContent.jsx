// src/components/CommentModal.jsx
import { Modal } from '@/components';

export const CommentModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      title='댓글을 삭제할까요?'
      confirmText='삭제하기'
      closeText='취소'
      bgColor='#FF3F3F'
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};
