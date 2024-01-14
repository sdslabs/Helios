import axiosInstance from "./AxiosInstance";

export const fetchQuestion = async (questionId : string) => {
    try {
      const response = await axiosInstance.get(`/giveQuiz/quiz/question/${questionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching question:', error);
    }
   };
