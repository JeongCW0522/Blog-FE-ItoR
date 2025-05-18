import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 210px auto;
  width: 40%;
  min-width: 600px;
  min-height: 800px;
  padding: 40px;
  gap: 20px;

  @media (max-width: 700px) {
    min-width: 300px;
    width: 90%;
    margin: 160px 0 0 -20px;
  }
`;

export const Text = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin: 15px 0 13px 7px;
`;

export const SocialBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 15px;
  margin-top: -20px;
  height: 45px;
  background: #e6e6e6;
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  color: #9e9e9e;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;
