import { Header, BlogImageUpload, BlogPostContent } from '@/components';
import { useState } from 'react';
import GlobalStyle from '@/styles/global';
import { useNavigate } from 'react-router-dom';
import { blogPost } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Line, TitleWrapper, TitleInput } from '@/styles/BlogStyles';
import { useToast } from '@/context/ToastContext';

const BlogWrite = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState([{ contentOrder: 1, content: '', contentType: 'TEXT' }]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const goPost = useMutation({
    mutationFn: () => {
      const sortedContents = [...contents].sort((a, b) => a.contentOrder - b.contentOrder);
      return blogPost(title, sortedContents);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['postList']);
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

  return (
    <>
      <GlobalStyle />
      <Header onPost={handlePost} />
      <Container>
        <Line />
        <BlogImageUpload contents={contents} setContents={setContents} showToast={showToast} />
        <TitleWrapper>
          <TitleInput placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
        </TitleWrapper>
        <Line />
        <BlogPostContent contents={contents} setContents={setContents} />
      </Container>
    </>
  );
};

export default BlogWrite;
