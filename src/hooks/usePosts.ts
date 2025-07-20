import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch all posts
const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new post
const createPost = async (post: { title: string; body: string }) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};

// 1st Hook
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
  });
};

// 2nd Hook
export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate the cache to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
