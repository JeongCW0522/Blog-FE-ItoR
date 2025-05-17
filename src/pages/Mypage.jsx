import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { Header, Image, Input } from '@/components';
import { Profile } from '@/assets';
import GlobalStyle from '@/styles/global';
import { createInputFields } from '@/constant/SignupFields';
import { onValidation } from '@/utils/validation';
import {
  getUserInfo,
  updateUserInfo,
  updateNickname,
  updatePassword,
  updatePicture,
} from '@/api/users';
import { uploadImage, getPresignedUrl } from '@/api/Image';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import userDummy from '@/data/userDummy';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 410px;

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
  min-height: 1100px;
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

const ImageWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
`;

const ProfileButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #464646;
  border: 2px solid white;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const Text = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  margin: 15px 0 13px 7px;
`;

const Mypage = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birth: '',
    nickname: '',
    bio: '',
    profilePicture: '',
  });
  const [formError, setFormError] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        email: data.email,
        nickname: data.nickname,
        profilePicture: data.profilePicture || '',
        // TODO: 이름, 생년월일, 소개
        name: userDummy.name,
        birth: userDummy.birthDate,
        bio: userDummy.introduction,
      }));
      setPreviewImage(data.profilePicture || '');
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>유저 정보를 불러올 수 없습니다.</div>;

  const handleSave = async () => {
    const nicknameCheck = formData.nickname !== data.nickname;
    const emailCheck = formData.email !== data.email;
    const passwordCheck = formData.password && formData.password === formData.confirmPassword;
    const isPasswordOnly = passwordCheck && !nicknameCheck && !emailCheck;

    try {
      if (profileImage) {
        const updateImage = await updatePicture(profileImage);
        if (updateImage) {
          console.log('프로필 이미지가 업데이트되었습니다.');
          setPreviewImage(profileImage);
          setFormData((prev) => ({
            ...prev,
            profilePicture: profileImage,
          }));
          localStorage.setItem('profilePicture', profileImage);
        }
      }
      if (isPasswordOnly) {
        await updatePassword(formData.password);
        console.log('비밀번호가 업데이트 되었습니다.');
      } else {
        const isValid = onValidation(formData, setFormError, '', data);

        if (!isValid) return;

        if (!isValid) return;
        if (nicknameCheck && emailCheck && passwordCheck) {
          await updateUserInfo({
            email: formData.email,
            nickname: formData.nickname,
            password: formData.password,
            profilePicture: formData.profilePicture,
            birthDate: formData.birth,
            name: formData.name,
            introduction: formData.bio,
          });
          console.log('유저 정보가 업데이트 되었습니다.');
        } else if (nicknameCheck) {
          await updateNickname(formData.nickname);
          console.log('닉네임이 업데이트 되었습니다.');
        } else if (passwordCheck) {
          await updatePassword(formData.password);
          console.log('비밀번호가 업데이트 되었습니다.');
        }
      }

      await queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    } catch (err) {
      console.error('유저 정보 저장 중 오류 발생:', err);
    }
  };

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    try {
      const presignedUrl = await getPresignedUrl(file.name);
      const uploadedUrl = await uploadImage(presignedUrl, file);

      setProfileImage(uploadedUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const inputFields = createInputFields(formData, setFormData, formError, false, true);
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header onSave={handleSave} />
        <Content>
          <ProfileContent>
            <ImageWrapper>
              <Image
                src={previewImage || Profile}
                alt='프로필'
                width='64px'
                height='64px'
                radius='50%'
              />
              <ProfileButton onClick={handleProfileClick}>+</ProfileButton>
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </ImageWrapper>
            {['nickname', 'bio'].map((field) => (
              <Input
                key={field}
                height={field === 'nickname' ? '60px' : '45px'}
                fontSize={field === 'nickname' ? '24px' : undefined}
                placeholder={field === 'nickname' ? '닉네임' : '한 줄 소개'}
                phSize={field === 'nickname' ? '24px' : '14px'}
                bgColor='#f5f5f5'
                value={formData[field] || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
                errorState={field === 'nickname' ? formError.nickname : ''}
                showHint={field === 'nickname'}
              />
            ))}
          </ProfileContent>
          {inputFields.map((field) => (
            <div key={field.name}>
              <Text>{field.label}</Text>
              <Input
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                errorState={field.error}
              />
            </div>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default Mypage;
