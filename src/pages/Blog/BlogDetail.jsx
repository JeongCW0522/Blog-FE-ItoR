import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '@/styles/global';
import { Toast, Header, BlogDetailField, BlogDetailFooter } from '@/components';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 50px;
`;

const BlogDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const [toastData, setToastData] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    const stateToast = location.state?.toastData;
    if (stateToast) {
      setToastData(stateToast);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (toastData.show) {
      setTimeout(() => setToastData((prev) => ({ ...prev, show: false })), 2000);
    }
  }, [toastData]);

  return (
    <>
      <GlobalStyle />
      <Header postId={id} />
      <DetailContainer>
        <Toast show={toastData.show} text={toastData.message} type={toastData.type} />
        <BlogDetailField postId={id} />
        <BlogDetailFooter />
      </DetailContainer>
    </>
  );
};

export default BlogDetail;
