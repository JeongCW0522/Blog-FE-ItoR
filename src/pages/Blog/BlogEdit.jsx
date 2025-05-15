import styled from 'styled-components';
import { Header, Toast } from '@/components';
import { useState, useEffect } from 'react';
import { AddPhoto } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPostDetail, updatePost } from '@/api/post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
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
  max-width: 800px;
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
  max-width: 800px;
  width: 100%;
  margin: 60px auto;

  @media screen {
    padding-left: 20px;
  }
`;

const ContentText = styled.textarea`
  min-height: 5rem;
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

  &::placeholder {
    color: #b3b3b3;
  }
`;

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [toastData, setToastData] = useState({ show: false, type: 'error', message: '' });
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['postId', id],
    queryFn: () => getPostDetail(id),
  });
  useEffect(() => {
    if (data?.data) {
      const post = data.data;
      const postContents = post.contents
        .sort((a, b) => a.contentOrder - b.contentOrder)
        .map((item, index) => {
          if (item.contentType === 'TEXT') {
            return item.content;
          } else if (item.contentType === 'IMAGE') {
            return `<img src="${item.content}" alt="이미지 ${index + 1}" />`;
          }
          return '';
        });
      setTitle(post.title);
      setContent(postContents.join('\n'));
    }
  }, [data]);

  const showToast = (type, message) => {
    setToastData({ show: true, type, message });
    setTimeout(() => setToastData((prev) => ({ ...prev, show: false })), 2000);
  };

  const resize = (obj) => {
    const scrollTop = window.scrollY;
    obj.style.height = '1px';
    obj.style.height = 12 + obj.scrollHeight + 'px';
    window.scrollTo({ top: scrollTop });
  };

  const goUpdate = useMutation({
    mutationFn: () => updatePost(id, title, content, 1, 'TEXT'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postId', id] });
      navigate(`/detail/${id}`, {
        state: {
          toastData: {
            show: true,
            type: 'positive',
            message: '저장되었습니다!',
          },
        },
      });
    },
    onError: (error) => {
      console.error('블로그 수정 오류:', error);
    },
  });

  // 버튼 클릭 시 호출
  const handleUpdate = () => {
    if (!title.trim()) {
      showToast('error', '제목을 입력해주세요');
      return;
    }
    if (!content.trim()) {
      showToast('error', '내용을 입력해주세요');
      return;
    }
    goUpdate.mutate();
  };

  return (
    <>
      <GlobalStyle />
      <Header onSave={handleUpdate} />
      <Container>
        <Line />
        <AddPhotoButton>
          <AddPhoto />
          사진 추가하기
        </AddPhotoButton>
        <TitleWrapper>
          <TitleInput placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
        </TitleWrapper>
        <Line />
        <Content>
          <ContentText
            placeholder='어떠한 것을 깨달았나요?'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onInput={(e) => resize(e.target)}
          />
        </Content>
        <Toast show={toastData.show} text={toastData.message} type={toastData.type} />
      </Container>
    </>
  );
};

export default BlogEdit;
