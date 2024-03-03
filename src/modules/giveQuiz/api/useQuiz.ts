import { useQuery } from '@tanstack/react-query';
import * as fetchers from './quizFetcher';

export const useQuiz = (quizId: string)=>{
    const query= useQuery({
        queryKey: ['quiz'],
        queryFn: () => fetchers.fetchQuiz(quizId),
    })
    return query;
}

export const useQuestion = (questionId: string)=>{
    const query= useQuery({
        queryKey: ['question', questionId],
        queryFn: () => fetchers.fetchQuestion(questionId),
    })
    return query;
}
