import { useState, useRef } from 'react';
import { Image, Button } from '@/components';
import { AddPhoto, Profile } from '@/assets';
import { Text } from '@/styles/SignupStyles';
import { getPresignedUrl, uploadImage } from '@/api/Image';

const SignUpProfile = ({ setProfileImage, picture }) => {
  const [previewImage, setPreviewImage] = useState('');
  const fileInputRef = useRef(null);
  const handleImageUpload = () => fileInputRef.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
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

  return (
    <>
      <Text>프로필 사진</Text>
      <Image
        src={previewImage || picture || Profile}
        alt='프로필'
        width='90px'
        height='90px'
        radius='50%'
      />
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button
        width='145px'
        height='27px'
        borderStyle='1px solid #E6E6E6'
        color='#9e9e9e'
        radius='3px'
        icon={AddPhoto}
        onClick={handleImageUpload}
      >
        프로필 사진 추가
      </Button>
    </>
  );
};

export default SignUpProfile;
