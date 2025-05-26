import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 65px;
`;

export const AddPhotoButton = styled.button`
  display: flex;
  align-items: center;
  color: #909090;
  gap: 4px;
  padding: 10px;
  margin-top: 5px;
  font-size: 14px;
  background-color: white;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const Line = styled.div`
  width: 100vw;
  height: 1px;
  background-color: #f5f5f5;
  margin-top: 5px;
`;

export const TitleWrapper = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 70px auto 50px;

  @media screen {
    padding-left: 20px;
  }
`;

export const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 24px;
  color: black;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: -0.25%;
  border: none;
  outline: none;

  &::placeholder {
    color: #909090;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const Content = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 60px auto;

  @media screen {
    padding-left: 20px;
  }
`;

export const ContentText = styled(TextareaAutosize)`
  min-height: 30px;
  width: 100%;
  font-size: 14px;
  color: #696969;
  font-weight: 300;
  line-height: 160%;
  letter-spacing: -0.5%;
  word-break: keep-all;
  border: none;
  resize: none;
  outline: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::placeholder {
    color: #b3b3b3;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  border: ${(props) => (props.selected ? '2px solid #00A1FF' : 'none')};
  box-sizing: border-box;
  cursor: pointer;
`;

export const DeleteBox = styled.div`
  position: absolute;
  top: -70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 15px 30px;
  border-radius: 4px;
  box-shadow: 0 3px 15px rgba(73, 69, 90, 0.301);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;
