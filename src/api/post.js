import { Axios } from './auth';

export const blogPost = async (title, contents) => {
  try {
    const response = await Axios.post('/posts', { title, contents });
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '블로그 작성에 실패했습니다.',
    };
  }
};

export const getPostList = async (size, page) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      const response = await Axios.get('/posts/all', {
        params: { size, page },
      });
      return response.data;
    } else {
      const response = await Axios.get('/posts/all/token', {
        params: { size, page },
      });
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '블로그 리스트 조회에 실패했습니다.',
    };
  }
};

export const getPostDetail = async (postId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      const response = await Axios.get('/posts', {
        params: { postId },
      });
      return response.data;
    } else {
      const response = await Axios.get('/posts/token', {
        params: { postId },
      });
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '블로그 조회에 실패했습니다.',
    };
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await Axios.delete('/posts', {
      params: { postId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || '블로그 삭제에 실패했습니다.');
  }
};

export const updatePost = async (postId, title, contents) => {
  try {
    const response = await Axios.patch(`/posts?postId=${postId}`, {
      title,
      contents,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '블로그 수정에 실패했습니다.',
    };
  }
};
