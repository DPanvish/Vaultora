import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { api } from '../api/client';

const requireToken = async (getToken: () => Promise<string | null>) => {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');
    return token;
};

export const useTransactions = () => {
    const {getToken} = useAuth();

    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const token = await requireToken(getToken);
            const {data} = await api.get("/transactions", {
                headers: {Authorization: `Bearer ${token}`}
            });
            return data;
        },
    });
};

export const useAccounts = () => {
    const {getToken} = useAuth();

    return useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            const token = await requireToken(getToken);
            const {data} = await api.get("/accounts", {
                headers: {Authorization: `Bearer ${token}`}
            });
            return data;
        },
    });
};

export const useAddTransaction = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionData: any) => {
      const token = await requireToken(getToken);
      const { data } = await api.post('/transactions', transactionData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};