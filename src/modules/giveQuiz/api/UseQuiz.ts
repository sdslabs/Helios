import { useQuery } from '@tanstack/react-query';
import * as fetchers from './FetchQuiz';

export const useQuiz = (quizId: string)=>{
    const query= useQuery({
        queryKey: ['quiz'],
        queryFn: () => fetchers.fetchQuiz(quizId),
    })
    return query;
}

