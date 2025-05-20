import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '@/styles/global';
import { Header, BlogDetailField, BlogDetailFooter } from '@/components';
import { useToast } from '@/context/ToastContext';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 50px;
`;

const BlogDetail = () => {
  const location = useLocation();
  const { showToast } = useToast();
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const stateToast = location.state?.toastData;
    if (stateToast?.show) {
      showToast(stateToast.type, stateToast.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, showToast]);

  return (
    <>
      <GlobalStyle />
      <Header postId={id} isOwner={isOwner} />
      <DetailContainer>
        <BlogDetailField postId={id} setIsOwner={setIsOwner} />
        <BlogDetailFooter />
      </DetailContainer>
    </>
  );
};

export default BlogDetail;
