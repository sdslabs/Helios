import { useQuery } from '@tanstack/react-query';
import * as fetchers from './FetchQuestion';

export const useQuestion = (questionId: string)=>{
    const query= useQuery({
        queryKey: ['question', questionId],
        queryFn: () => fetchers.fetchQuestion(questionId),
    })
    return query;
}

