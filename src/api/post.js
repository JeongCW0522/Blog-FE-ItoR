import { Axios } from './auth';

export const Blogpost = async (title, content, contentOrder, contentType) => {
  try {
    const response = await Axios.post('/posts', {
      title: title,
      contents: [
        {
          contentOrder: contentOrder,
          content: content,
          contentType: contentType,
        },
      ],
    });
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
    const response = await Axios.get('/posts/all', {
      params: {
        size: size,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '블로그 리스트 조회에 실패했습니다.',
    };
  }
};

export const getPostListToken = async (size, page) => {
  try {
    const response = await Axios.get('/posts/all/token', {
      params: {
        size: size,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '블로그 리스트 조회에 실패했습니다.',
    };
  }
};

export const getPostDetail = async (id) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      const response = await Axios.get('/posts', {
        params: {
          postId: id,
        },
      });
      return response.data;
    } else {
      const response = await Axios.get('/posts/token', {
        params: {
          postId: id,
        },
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
      params: {
        postId: postId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '블로그 삭제에 실패했습니다.',
    };
  }
};

export const updatePost = async (postId, title, content, contentOrder, contentType) => {
  try {
    const response = await Axios.patch(`/posts?postId=${postId}`, {
      title: title,
      contents: [
        {
          contentOrder: contentOrder,
          content: content,
          contentType: contentType,
        },
      ],
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
