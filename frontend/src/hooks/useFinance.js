import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { api } from "../lib/api"


export const useDashboardData = (filters) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['dashboard', filters], 
    queryFn: async () => {
      const token = await getToken();
      const { data } = await api.get('/transactions', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      return data;
    },
    enabled: !!getToken, 
  });
};


export const useAddTransaction = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionData) => {
      const token = await getToken();
      const { data } = await api.post('/transactions', transactionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};


export const useAccounts = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await api.get('/accounts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    },
    enabled: !!getToken,
  });
};


export const useSetupAccounts = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accounts) => {
      const token = await getToken();

      console.log("My Clerk Token is:", token); 
      
      if(!token){
        throw new Error("Frontend failed to generate a Clerk token.");
      }

      const { data } = await api.post('/accounts/bulk', { accounts }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (error) => {
      console.error("Frontend caught error:", error.response?.data || error.message);
    }
  });
};