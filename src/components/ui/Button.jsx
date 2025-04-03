import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || 'normal'}; //bold or normal
  color: ${(props) => props.color || 'black'};
  background-color: ${({ $bgColor }) => $bgColor || 'white'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || '40px'};
  border: ${(props) => props.$borderStyle || '1px solid black'};
  border-radius: ${(props) => props.radius || '25px'};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  outline: 0;

  &:hover {
    filter: ${({ $buttonColor }) => ($buttonColor ? 'brightness(0.9)' : 'none')};
  }
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = ({
  children,
  width,
  height,
  radius,
  color,
  bgColor,
  fontSize,
  fontWeight,
  borderStyle,
  icon: Icon,
  onClick,
  buttonColor = false,
}) => {
  return (
    <StyledButton
      width={width}
      height={height}
      radius={radius}
      color={color}
      $bgColor={bgColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      $borderStyle={borderStyle}
      onClick={onClick}
      $buttonColor={buttonColor}
    >
      {Icon && (
        <StyledIcon>
          <Icon />
        </StyledIcon>
      )}
      {children}
    </StyledButton>
  );
};

export default Button;
