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
  padding-left: 12px;

  &::placeholder {
    color: #bbb;
    font-size: ${(props) => props.$phSize || '12px'};
  }
`;

const ErrorText = styled.p`
  color: #ff3f3f;
  font-size: 12px;
  font-weight: 300;
  padding-left: 10px;
  width: 80%;
  text-align: left;
  margin: 4px 0;
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
  phSize,
  type,
  errorState,
  onFocus,
  onChange,
  disabled = false,
  value,
}) => {
  return (
    <>
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
        $phSize={phSize}
        type={type}
        $errorState={errorState}
        onFocus={onFocus}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
      {errorState && <ErrorText>* {errorState.message}</ErrorText>}
    </>
  );
};

export default Input;
