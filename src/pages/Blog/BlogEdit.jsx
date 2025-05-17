import styled from 'styled-components';
import { Header, Toast, Image } from '@/components';
import { useState, useEffect, useRef } from 'react';
import { AddPhoto, DeleteIcon } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPresignedUrl, uploadImage } from '@/api/Image';
import { getPostDetail, updatePost } from '@/api/post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 65px;
`;

const AddPhotoButton = styled.button`
  display: flex;
  align-items: center;
  color: #909090;
  gap: 4px;
  padding: 10px;
  margin-top: 5px;
  font-size: 14px;
  background-color: white;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Line = styled.div`
  width: 100vw;
  height: 1px;
  background-color: #f5f5f5;
  margin-top: 5px;
`;

const TitleWrapper = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 70px auto 50px;

  @media screen {
    padding-left: 20px;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 24px;
  color: black;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: -0.25%;
  border: none;
  outline: none;

  &::placeholder {
    color: #909090;
    font-size: 18px;
    font-weight: 600;
  }
`;

const Content = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 60px auto;

  @media screen {
    padding-left: 20px;
  }
`;

const ContentText = styled.textarea`
  min-height: 30px;
  width: 100%;
  font-size: 14px;
  color: #696969;
  font-weight: 300;
  line-height: 160%;
  letter-spacing: -0.5%;
  word-break: keep-all;
  border: none;
  resize: none;
  outline: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::placeholder {
    color: #b3b3b3;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  border: ${(props) => (props.selected ? '2px solid #00A1FF' : 'none')};
  box-sizing: border-box;
  cursor: pointer;
`;

const DeleteBox = styled.div`
  position: absolute;
  top: -70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 15px 30px;
  border-radius: 4px;
  box-shadow: 0 3px 15px rgba(73, 69, 90, 0.301);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

const BlogEdit = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState([]);
  const [toastData, setToastData] = useState({ show: false, type: 'error', message: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const { data } = useQuery({
    queryKey: ['postId', id],
    queryFn: () => getPostDetail(id),
  });

  //data 받으면 제목과 내용 초기화
  const post = data?.data;
  useEffect(() => {
    if (post) {
      const sorted = post.contents.sort((a, b) => a.contentOrder - b.contentOrder);
      setTitle(post.title);
      setContents(sorted);
    }
  }, [data]);

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

  const goUpdate = useMutation({
    mutationFn: () => {
      const sortedContents = [...contents].sort((a, b) => a.contentOrder - b.contentOrder);
      return updatePost(id, title, sortedContents);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postId', id] });
      navigate(`/detail/${id}`, {
        state: {
          toastData: {
            show: true,
            type: 'positive',
            message: '수정되었습니다!',
          },
        },
      });
    },
    onError: () => {
      showToast('error', '블로그 수정에 실패했습니다.');
    },
  });

  const handleUpdate = () => {
    if (!title.trim()) {
      showToast('error', '제목을 입력해주세요');
      return;
    }
    const textContent = contents.some((c) => c.contentType === 'TEXT' && c.content.trim());
    if (!textContent) {
      showToast('error', '내용을 입력해주세요');
      return;
    }
    goUpdate.mutate();
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

  const handleDeleteImage = (index) => {
    const updatedContents = contents.filter((_, i) => i !== index);
    setContents(updatedContents);
    setSelectedImage(null);
  };

  return (
    <>
      <GlobalStyle />
      <Header onSave={handleUpdate} />
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

export default BlogEdit;
