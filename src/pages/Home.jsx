import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Header, BlogPostList, LoginModal } from '@/components';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/context/ToastContext';

const Content = styled.div`
  padding-top: 80px;
  margin: 70px auto 0;
  max-width: 700px;
`;

function Home() {
  const location = useLocation();
  const { showToast } = useToast();
  const [isLoginModal, setIsLoginModal] = useState(false);

  const openLoginModal = () => setIsLoginModal(true);
  const closeLoginModal = () => setIsLoginModal(false);

  useEffect(() => {
    const stateToast = location.state?.toastData;
    if (location.state?.openLoginModal) {
      openLoginModal();
      window.history.replaceState({}, document.title);
    }
    if (stateToast?.show) {
      showToast(stateToast.type, stateToast.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, showToast]);

  return (
    <>
      <Header />
      <Content>
        <BlogPostList isOwer={false} />
      </Content>
      {isLoginModal && <LoginModal isOpen={isLoginModal} onClose={closeLoginModal} />}
    </>
  );
}

export default Home;
