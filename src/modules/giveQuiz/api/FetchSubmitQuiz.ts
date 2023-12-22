import axiosInstance from "./AxiosInstance";

export const submitQuiz = async (quizId : string) => {
    try {
        const res = await axiosInstance.post(`/giveQuiz/user/submit/${quizId}`);

        return res.data;
    } catch (error) {
        console.error('Error submitting quiz:', error);
        return error;
    }
};

