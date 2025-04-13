import styled from 'styled-components';

const ProfileContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  height: 150px;

  @media (max-width: 700px) {
    padding-left: 20px;
    height: 120px;
  }
`;

const Title = styled.h1`
  display: flex;
  padding-top: 30px;
  font-size: 24px;
  font-weight: bold;
  margin-left: 30%;

  @media (max-width: 700px) {
    padding-top: 15px;
    margin-left: 0px;
  }
`;

const SubTitle = styled.div`
  display: flex;
  font-size: 14px;
  color: #706e6e;
  margin: 0 0 30px 30%;

  @media (max-width: 700px) {
    margin-left: 0px;
  }
`;

const SignUpHeader = () => {
  return (
    <ProfileContainer>
      <Title>회원가입</Title>
      <SubTitle>가입을 위해 회원님의 정보를 입력해주세요</SubTitle>
    </ProfileContainer>
  );
};

export default SignUpHeader;
