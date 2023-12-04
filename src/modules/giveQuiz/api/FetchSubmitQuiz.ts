import axiosInstance from "./AxiosInstance";
const quizId = "64f03422df4af65f96380c43";
export const submitQuiz = async (quizId : string) => {
    try {
        const res = await axiosInstance.post(`/giveQuiz/user/submit/${quizId}`);

        return res.data;
    } catch (e : any) {
        return e.response.data;
    }
};

