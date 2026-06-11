import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { api } from '../api/client';

export const useTransactions = () => {
    const {getToken} = useAuth();

    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const token = await getToken();
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
            const token = await getToken();
            const {data} = await api.get("/accounts", {
                headers: {Authorization: `Bearer ${token}`}
            });
            return data;
        },
    });
};