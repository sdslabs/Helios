import { useMutation, useQuery } from '@tanstack/react-query';
import * as fetchers from '@auth/api/authFetcher';

export const useAuth = ()=>{
        const query= useQuery({
            queryKey: ['auth'],
            queryFn: fetchers.checkAuth,
        })
        return query;
}

export const useOnboard = ()=>{
    const mutation = useMutation({
        mutationFn:fetchers.onboard
    });

    return mutation;
}