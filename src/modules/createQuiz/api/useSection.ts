import { useMutation, useQuery } from "@tanstack/react-query";
import * as fetchers from "./sectionFetcher";

export const useCreateSection = () => {
  const mutation = useMutation({
    mutationFn: fetchers.createSection
  });
  return mutation;
}

export const useGetSection = (quizId: string, sectionIdx: number) => {
  const query = useQuery({
    queryKey: ['section', quizId, sectionIdx],
    queryFn: fetchers.getSection,
  })
  return query;
}

export const useUpdateSection = () => {
  const mutation = useMutation({
    mutationFn: fetchers.updateSection,
  })
  return mutation;
}

export const useDeleteSection = () => {
  const mutation = useMutation({
    mutationFn: fetchers.deleteSection,
  })
  return mutation;
}
