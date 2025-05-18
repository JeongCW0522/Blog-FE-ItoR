import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Header, BlogPostList, Toast } from '@/components';
import { useLocation } from 'react-router-dom';

const Content = styled.div`
  padding-top: 80px;
  margin: 70px auto 0;
  max-width: 700px;
`;

function Home() {
  const location = useLocation();
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
      <Toast show={toastData.show} text={toastData.message} type={toastData.type} />
      <Header />
      <Content>
        <BlogPostList isOwer={false} />
      </Content>
    </>
  );
}

export default Home;
