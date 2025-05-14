import { Axios } from './auth';

export const postComment = async (postId, content) => {
  try {
    const response = await Axios.post(`/comments/${postId}`, {
      content: content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '댓글 작성에 실패했습니다.',
    };
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await Axios.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || '댓글 삭제에 실패했습니다.',
    };
  }
};
