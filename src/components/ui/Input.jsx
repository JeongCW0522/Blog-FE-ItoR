import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
`;

const StyledInput = styled.input`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '45px'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  color: ${(props) => props.color || 'black'};
  background-color: ${(props) => props.$bgColor || 'white'};
  border: ${(props) => props.$borderStyle || '1px solid #ccc'};
  border-radius: ${(props) => props.radius || '3px'};
  padding-left: 12px;

  &::placeholder {
    color: #bbb;
    font-size: ${(props) => props.$phSize || '14px'};
  }
`;

const ErrorText = styled.p`
  color: ${(props) => (props.$showHint ? '#9e9e9e' : '#ff3f3f')};
  font-size: 12px;
  font-weight: 300;
  padding-left: 10px;
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
  onKeyDown,
  disabled = false,
  value,
  showHint,
}) => {
  return (
    <Wrapper>
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
        onKeyDown={onKeyDown}
        disabled={disabled}
        value={value}
        $showHint={showHint}
      />
      {showHint && !errorState && <ErrorText $showHint={true}>* 20글자 이내</ErrorText>}
      {errorState && <ErrorText>* {errorState.message}</ErrorText>}
    </Wrapper>
  );
};

export default Input;
