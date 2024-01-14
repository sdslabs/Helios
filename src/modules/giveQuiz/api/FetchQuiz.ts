import axiosInstance from "./AxiosInstance";

export const fetchQuiz = async (quizId : string) => {
    try {
      const response = await axiosInstance.get(`/giveQuiz/quiz/quiz/${quizId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
   };