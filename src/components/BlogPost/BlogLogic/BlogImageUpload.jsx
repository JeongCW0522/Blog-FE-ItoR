import { getPresignedUrl, uploadImage } from '@/api/Image';
import { AddPhotoButton } from '@/styles/BlogStyles';
import { AddPhoto } from '@/assets';
import { useRef } from 'react';

const BlogImageUpload = ({ contents, setContents, showToast }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = () => fileInputRef.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const presignedUrl = await getPresignedUrl(file.name);
      const uploadedUrl = await uploadImage(presignedUrl, file);
      const nextOrder = contents.length + 1;

      const addContents = [
        ...contents,
        { contentOrder: nextOrder, content: uploadedUrl, contentType: 'IMAGE' },
        { contentOrder: nextOrder + 1, content: '', contentType: 'TEXT' },
      ];

      setContents(addContents);
    } catch (err) {
      console.error(err);
      showToast('error', '이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <AddPhotoButton onClick={handleImageUpload}>
        <AddPhoto />
        사진 추가하기
      </AddPhotoButton>
    </>
  );
};

export default BlogImageUpload;
