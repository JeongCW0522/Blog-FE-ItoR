import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  gap: 20px;
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

const SetMypage = ({ onSave, onToast }) => {
  const [isOpen, setOpen] = useState(false);

  const handleSave = () => {
    if (onSave) onSave();
    setOpen(false);
  };

  return (
    <Container>
      {!isOpen ? (
        <TextButton onClick={() => setOpen(true)}>수정하기</TextButton>
      ) : (
        <>
          <TextButton onClick={() => setOpen(false)} style={{ color: '#FF3F3F' }}>
            취소하기
          </TextButton>
          <TextButton
            onClick={() => {
              onToast?.();
              handleSave();
            }}
          >
            저장하기
          </TextButton>
        </>
      )}
    </Container>
  );
};

export default SetMypage;
