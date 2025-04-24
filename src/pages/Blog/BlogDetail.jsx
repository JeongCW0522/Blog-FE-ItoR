import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '@/styles/global';
import { Image, Toast, Header, dummyData, BlogComment } from '@/components';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 50px;
`;

const TitleContent = styled.div`
  max-width: 720px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #222;
  margin: 60px 0px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909090;
  gap: 6px;
`;

const NameText = styled.span`
  color: #333;
`;

const Line = styled.div`
  width: 100vw;
  height: 1px;
  background-color: #f5f5f5;
  margin-top: 5px;
`;

const Content = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 60px auto;
  font-size: 16px;
  color: #333;
  font-weight: 300;
  line-height: 180%;
  word-break: keep-all;
`;

const Nickname = styled.div`
  padding-top: 20px;
  font-size: 24px;
  line-height: 160%;
`;

const BioText = styled.p`
  font-size: 14px;
  margin-bottom: 35px;
  color: #535252;
  max-width: 200px;
  word-break: keep-all;
  line-height: 160%;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 350px;
  padding: 10px 5px;
  margin-top: 100px;
  background-color: #f5f5f5;
`;

const ProfileContent = styled.div`
  width: 720px;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const BlogDetail = () => {
  const location = useLocation();

  const { id } = useParams();
  const post = dummyData.find((p) => p.id === Number(id)); //url에서 가져온 id와 일치하는 해당 post 찾기

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

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <DetailContainer>
        <Toast show={toastData.show} text={toastData.message} type={toastData.type} />
        <TitleContent>
          <Title>{post.title}</Title>
          <InfoWrapper>
            <Image width='20px' height='20px' src={post.profileImg} alt='프로필' />
            <NameText>{post.nickname}</NameText>
            <span>
              · {post.date} · 댓글 {post.comments}
            </span>
          </InfoWrapper>
        </TitleContent>
        <Line />
        <Content>{post.content}</Content>
        <Line />
        <BlogComment post={post} />
        <ProfileBox>
          <ProfileContent>
            <Image src={post.profileImg} alt='프로필' width='64px' height='64px' radius='50%' />
            <Nickname>닉네임</Nickname>
            <BioText>한 줄 소개</BioText>
          </ProfileContent>
        </ProfileBox>
      </DetailContainer>
    </>
  );
};

export default BlogDetail;
