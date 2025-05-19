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

const SetMypage = ({ onSave, onToast, isEditMode, setIsEditMode }) => {
  const handleSave = () => {
    onSave?.();
    onToast?.();
  };

  return (
    <Container>
      {!isEditMode ? (
        <TextButton onClick={() => setIsEditMode(true)}>수정하기</TextButton>
      ) : (
        <>
          <TextButton onClick={() => setIsEditMode(false)} style={{ color: '#FF3F3F' }}>
            취소하기
          </TextButton>
          <TextButton onClick={handleSave}>저장하기</TextButton>
        </>
      )}
    </Container>
  );
};

export default SetMypage;
