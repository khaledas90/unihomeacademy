import { useQuery } from "@tanstack/react-query";
import { axiosBaseQuery } from "@/utils/axiosConfig";
import { Wallet } from "@/types/users";

export interface WalletsResponse {
    status: number;
    message: string;
    data: {
        wallets: Wallet[];
    };
}

export const useWallets = () => {
    return useQuery({
        queryKey: ["wallets"],
        queryFn: async () => {
            const response = await axiosBaseQuery()({
                url: "/auth/wallets",
                method: "GET",
            });
            if (response.error) {
                throw new Error("Failed to fetch wallets");
            }
            return response.data as WalletsResponse;
        },
    });
};