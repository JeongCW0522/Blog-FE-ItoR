import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '@/styles/global';
import { Button, Image, Toast, Header, dummyData } from '@/components';
import { useLogin } from '@/context/LoginContext';

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

const CommentContent = styled.div`
  max-width: 720px;
  width: 100%;
  margin-top: 25px;
`;

const CommentHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;

  span {
    color: #007aff;
    margin-left: 4px;
  }
`;

const NoComment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 0;
  color: #c8c8c8;
  margin: 50px 0;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 25px 16px;
  font-size: 14px;
  color: #333333;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  resize: none;
  outline: none;

  &::placeholder {
    color: #909090;
  }
`;

const LoginCommentInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding-top: 20px;
  margin-top: 10px;
  margin-bottom: -10px;
  font-size: 14px;
  color: #333333;
  background-color: #ffffff;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 4px;
  resize: none;
  outline: none;

  &::placeholder {
    color: #909090;
  }
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
  width: 100%;
  width: 100vw;
  height: 350px;
  padding: 10px 5px;
  margin-top: 100px;
  background-color: #f5f5f5;
`;

const ProfileContent = styled.div`
  width: 720px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BlogDetail = () => {
  const { isLogin } = useLogin();
  const location = useLocation();

  const { id } = useParams();
  const post = dummyData.find((p) => p.id === Number(id)); //url에서 가져온 id와 일치하는 해당 post 찾기

  const [toastData, setToastData] = useState(
    location.state?.toastData || { show: false, type: '', message: '' },
  );

  useEffect(() => {
    if (toastData.show) {
      const timer = setTimeout(() => {
        setToastData((prev) => ({ ...prev, show: false }));
      }, 2000);
      return () => clearTimeout(timer);
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
        <TitleContent>
          <Title>{post.title}</Title>
          <InfoWrapper>
            <Image width='20px' height='20px' src={post.profileImg} alt='프로필' />
            <NameText>{post.nickname}</NameText>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>댓글 {post.comments}</span>
          </InfoWrapper>
        </TitleContent>
        <Line />
        <Content>{post.content}</Content>
        <Line />
        <CommentContent id='comment'>
          <CommentHeader>
            댓글 <span>{post.comments}</span>
          </CommentHeader>
          {post.comments === 0 && (
            <NoComment>
              <p>작성된 댓글이 없습니다.</p>
              <p>응원의 첫 번째 댓글을 달아주세요.</p>
            </NoComment>
          )}
          {isLogin ? (
            <CommentBox>
              <InfoWrapper>
                <Image width='20px' height='20px' src={post.profileImg} alt='프로필' />
                <NameText>{post.nickname}</NameText>
              </InfoWrapper>
              <LoginCommentInput placeholder='댓글을 입력해주세요.' />
              <br />
              <ButtonWrapper>
                <Button width='65px' borderStyle='1px solid #909090' color='#909090' radius='25px'>
                  등록
                </Button>
              </ButtonWrapper>
            </CommentBox>
          ) : (
            <CommentInput disabled placeholder='로그인을 하고 댓글을 달아보세요!' />
          )}
        </CommentContent>
        <ProfileBox>
          <ProfileContent>
            <Image src={post.profileImg} alt='프로필' width='64px' height='64px' radius='50%' />
            <Nickname>닉네임</Nickname>
            <BioText>한 줄 소개</BioText>
          </ProfileContent>
        </ProfileBox>
      </DetailContainer>
      <Toast show={toastData.show} text={toastData.message} type={toastData.type} />
    </>
  );
};

export default BlogDetail;
