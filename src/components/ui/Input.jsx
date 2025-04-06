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
    font-size: ${(props) => props.$phSize || '12px'};
    padding-left: 15px;
  }
`;

const ErrorText = styled.p`
  color: #ff3f3f;
  font-size: 12px;
  font-weight: 300;
  padding-left: 2px;
  margin-top: 6px;
  width: 80%;
  text-align: left;
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
  fieldState,
  onFocus,
  onChange,
  disabled = false,
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
        $fieldState={fieldState}
        onFocus={onFocus}
        onChange={onChange}
        disabled={disabled}
      />
      {fieldState && <ErrorText>* {fieldState.message}</ErrorText>}
    </>
  );
};

export default Input;
