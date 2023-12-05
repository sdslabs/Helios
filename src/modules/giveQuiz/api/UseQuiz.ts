import { useQuery } from '@tanstack/react-query';
import * as fetchers from './FetchQuiz';

// export const useQuiz = (quizId: string) => {
//     const query = useQuery(['quiz', quizId], fetchers.fetchQuiz(quizId) as any);
    // return query;
//  };

// export const useQuiz = (quizId: string)=>{
//     const query= useQuery({
//         queryKey: ['quiz', quizId],
//         queryFn: fetchers.fetchQuiz,
//     })export const useQuiz = (quizId: string) => {
//    const query = useQuery(['quiz', quizId], fetchers.fetchQuiz(quizId) as any);
//    return query;
// };
//     return query;
// }

// export const useQuiz = (quizID : string) => useQuery(['getQuizDetails', quizID], fetchers.fetchQuiz(quizID) as any, { enabled: !!quizID });


export const useQuiz = (quizId: string)=>{
    const query= useQuery({
        queryKey: ['quiz'],
        queryFn: () => fetchers.fetchQuiz(quizId),
    })
    return query;
}

