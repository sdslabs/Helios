import { useQuery } from '@tanstack/react-query';
import * as fetchers from '@auth/api/auth/authFetcher';

export const useAuth = ()=>{
    const query= useQuery({
        queryKey: ['auth'],
        queryFn: fetchers.checkAuth,
    })
    return query;
}