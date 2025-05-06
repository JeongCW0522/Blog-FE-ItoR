import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Header, Image, Input } from '@/components';
import { Profile } from '@/assets';
import GlobalStyle from '@/styles/global';
import SetMypage from '@/components/layout/Header/EditLog';
import { createInputFields } from '@/constant/SignupFields';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 420px;

  @media (max-width: 700px) {
    height: 390px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 37%;
  min-width: 600px;
  min-height: 1000px;
  padding: 40px;
  gap: 20px;

  @media (max-width: 700px) {
    min-width: 300px;
    width: 90%;
    padding: 20px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 85px 0 40px 0;
  gap: 40px;
`;

export const Text = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin: 15px 0 13px 7px;
`;

const Mypage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birth: '',
    nickname: '',
    bio: '',
  });

  const inputFields = createInputFields(formData, setFormData, {}, false, true);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header setMypage={<SetMypage />} />
        <Content>
          <ProfileContent>
            <Image src={Profile} alt='프로필' width='64px' height='64px' radius='50%' />
            {['nickname', 'bio'].map((field) => (
              <Input
                key={field}
                width='100%'
                height={field === 'nickname' ? '60px' : '45px'}
                fontSize={field === 'nickname' ? '24px' : undefined}
                radius='3px'
                placeholder={field === 'nickname' ? '닉네임' : '한 줄 소개'}
                phSize={field === 'nickname' ? '24px' : '14px'}
                bgColor='#f5f5f5'
                value={formData[field] || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
              />
            ))}
          </ProfileContent>
          {inputFields.map((field) => (
            <div key={field.name}>
              <Text>{field.label}</Text>
              <Input
                width='100%'
                height='45px'
                radius='3px'
                phSize='14px'
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default Mypage;
