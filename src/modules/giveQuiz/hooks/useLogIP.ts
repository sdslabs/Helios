import { useEffect } from 'react';
import useLog from '@giveQuiz/api/useLog';
import useQuizStore from '@giveQuiz/store/QuizStore';
import { useParams } from 'react-router-dom';
import { ipURL } from '../../../config/config'

const useLogIP = () => {
 const { quizId } = useParams() as { quizId: string };
 const { currentQuestion } = useQuizStore((state: any) => ({
    currentQuestion: state.currentQuestion,
 }));
 const { mutate: log } = useLog();

 useEffect(() => {
    fetch(ipURL)
      .then((res) => res.json())
      .then((data) => {
        log({
          questionId: currentQuestion,
          logType: 'ip',
          quizId: quizId,
          ip: data.ip,
        });
      })
      .catch((err) => console.log(err));
 }, [log]);
};

export default useLogIP;