import { Header, Toast, Image } from '@/components';
import { useState, useRef } from 'react';
import { AddPhoto, DeleteIcon } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate } from 'react-router-dom';
import { blogPost } from '@/api/post';
import { useMutation } from '@tanstack/react-query';
import { getPresignedUrl, uploadImage } from '@/api/Image';
import {
  Container,
  AddPhotoButton,
  Line,
  TitleWrapper,
  TitleInput,
  Content,
  ContentText,
  ImageWrapper,
  DeleteBox,
} from '@/styles/BlogStyles';

const BlogWrite = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState([{ contentOrder: 1, content: '', contentType: 'TEXT' }]);
  const [toastData, setToastData] = useState({ show: false, type: 'error', message: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
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

  const showToast = (type, message) => {
    setToastData({ show: true, type, message });
    setTimeout(() => setToastData((prev) => ({ ...prev, show: false })), 2000);
  };

  const goPost = useMutation({
    mutationFn: () => {
      const sortedContents = [...contents].sort((a, b) => a.contentOrder - b.contentOrder);
      return blogPost(title, sortedContents);
    },
    onSuccess: () => {
      navigate(`/`, {
        state: {
          toastData: {
            show: true,
            type: 'positive',
            message: '저장되었습니다!',
          },
        },
      });
    },
    onError: () => {
      showToast('error', '블로그 저장에 실패했습니다.');
    },
  });

  const handlePost = () => {
    if (!title.trim()) {
      showToast('error', '제목을 입력해주세요');
      return;
    }
    const textContent = contents.some((c) => c.contentType === 'TEXT' && c.content.trim());
    if (!textContent) {
      showToast('error', '내용을 입력해주세요');
      return;
    }
    goPost.mutate();
  };

  const handleTextChange = (index, value) => {
    const updated = contents.map((item, idx) =>
      idx === index ? { ...item, content: value } : item,
    );
    setContents(updated);
  };

  const resize = (obj) => {
    if (obj) {
      obj.style.height = 'auto';
      obj.style.height = `${obj.scrollHeight}px`;
    }
  };

  //이미지만 삭제
  const handleDeleteImage = (index) => {
    const updatedContents = contents.filter((_, i) => i !== index);
    setContents(updatedContents);
    setSelectedImage(null);
  };

  return (
    <>
      <GlobalStyle />
      <Header onPost={handlePost} />
      <Container>
        <Line />
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
        <TitleWrapper>
          <TitleInput placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
        </TitleWrapper>
        <Line />
        <Content>
          {contents
            .sort((a, b) => a.contentOrder - b.contentOrder)
            .map((item, index) => {
              if (item.contentType === 'TEXT') {
                return (
                  <ContentText
                    key={index}
                    placeholder='어떠한 것을 깨달았나요?'
                    value={item.content}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    onInput={(e) => resize(e.target)}
                  />
                );
              } else if (item.contentType === 'IMAGE') {
                return (
                  <ImageWrapper key={index} selected={selectedImage === index}>
                    <Image
                      src={item.content}
                      alt='업로드 이미지'
                      width='700px'
                      height='700px'
                      radius='8px'
                      onClick={() => setSelectedImage((prev) => (prev === index ? null : index))}
                    />
                    {selectedImage === index && (
                      <DeleteBox onClick={() => handleDeleteImage(index)}>
                        <DeleteIcon />
                      </DeleteBox>
                    )}
                  </ImageWrapper>
                );
              }
              return null;
            })}
        </Content>
        <Toast show={toastData.show} text={toastData.message} type={toastData.type} />
      </Container>
    </>
  );
};

export default BlogWrite;
