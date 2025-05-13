import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'

const BIN = '6820eeeb8a456b79669bc349';
const USERS_API_URL = 'https://api.jsonbin.io/v3/b/' + BIN;
const API_KEY = '$2a$10$wUJhtUn1l0GFbHj0iXwYsek/JCBnzx0S4f.9kb.bA0fnc0XDYRKzS';

const fetchUsers = async () => {
  try 
  {
    const response = await axios.get(USERS_API_URL, 
    {
      headers: {
        'X-Access-Key': API_KEY,
      }
    });
    return response.data.record.users;  // assumes response.data has the shape { id, record, metadata }
  }
  catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array on error
  }
};

 /**
 * Custom hook to retrieve users via React Query.
 * Returns { data, isLoading, isError, error } where data is an array of us-ers.
 * Uses the object syntax required by React Query.
 */

export async function postUser({ newUser }) {
  const users = await fetchUsers();
  //const updated = [...existing, newUser];              
  users.push(newUser);

  try {
      const response = await axios.put(
        USERS_API_URL,
          { users: users },
          {
            headers: {
              'X-Access-Key': API_KEY,
            }
          }
      );

      if(response.status != 200) 
          throw new Error("Error adding user");

      return newUser;
  } catch (error) {
      console.error("Error adding user:", error);
  }
}

 export const useUsers = () => {
    return useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      staleTime: 5 * 60 * 1000,   // cache for 5 minutes
      retry: 1,                    // retry once on failure
    });
  };

  // Hook to encapsulate the mutation + cache updates
  export function useAddUser() {
    const queryClient = useQueryClient()
    
    // **Optimistic update**: before the request fires
    return useMutation({
      mutationFn: postUser,
      onMutate: async ({ newUser }) => {
        await queryClient.cancelQueries(['users'])
        const previous = queryClient.getQueryData(['users'])
        queryClient.setQueryData(['users'], old => [...(old||[]), newUser])
        return { previous }
      },
      onError: (err, variables, context) => {
        if (context?.previous) {
          queryClient.setQueryData(['users'], context.previous)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['users'])
      }
    })
}

