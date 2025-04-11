import styled from 'styled-components';
import { ErrorIcon, DoneIcon } from '@/assets';

const ToastMessage = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  background: white;
  color: ${(props) => (props.type === 'positive' ? '#15DC5E' : '#FF3F3F')};
  border: 1px solid ${(props) => (props.type === 'positive' ? '#15DC5E' : '#FF3F3F')};
  border-radius: 25px;
  opacity: ${(props) => (props.$show ? '1' : '0')};
  transition: opacity 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  z-index: 50;
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Toast = ({ show, text, type }) => {
  const Icon = type === 'positive' ? DoneIcon : ErrorIcon;

  return (
    <ToastMessage $show={show} type={type}>
      <StyledIcon>
        <Icon />
      </StyledIcon>
      {text}
    </ToastMessage>
  );
};

export default Toast;
