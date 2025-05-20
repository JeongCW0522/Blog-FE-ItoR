import { Header, BlogImageUpload, BlogPostContent } from '@/components';
import { useState, useEffect } from 'react';
import GlobalStyle from '@/styles/global';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPostDetail, updatePost } from '@/api/post';
import { Container, Line, TitleWrapper, TitleInput } from '@/styles/BlogStyles';
import { useToast } from '@/context/ToastContext';

const BlogEdit = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

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

  return (
    <>
      <GlobalStyle />
      <Header onSave={handleUpdate} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
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

export default BlogEdit;
