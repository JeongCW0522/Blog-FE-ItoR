import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${(props) => props.width || '500px'};
  height: ${(props) => props.height || '50px'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  color: ${(props) => props.color || 'black'};
  background-color: ${(props) => props.$bgColor || 'white'};
  border: ${(props) => props.$borderStyle || '1px solid #ccc'};
  border-radius: ${(props) => props.radius || '4px'};

  &::placeholder {
    color: #bbb;
    font-size: 12px;
    padding-left: 10px;
  }
`;

const Input = ({
  width,
  height,
  fontSize,
  fontWeight,
  color,
  bgColor,
  borderStyle,
  radius,
  placeholder,
  onFocus,
}) => {
  return (
    <StyledInput
      width={width}
      height={height}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      $bgColor={bgColor}
      $borderStyle={borderStyle}
      radius={radius}
      placeholder={placeholder}
      onFocus={onFocus}
    />
  );
};

export default Input;
