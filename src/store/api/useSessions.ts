import { useQuery } from "@tanstack/react-query";
import { axiosBaseQuery } from "@/utils/axiosConfig";
import { Session } from "@/types/users";

export interface SessionsResponse {
    status: number;
    message: string;
    data: {
        sessions: Session[];
    };
}

export const useSessions = () => {
    return useQuery({
        queryKey: ["sessions"],
        queryFn: async () => {
            const response = await axiosBaseQuery()({
                url: "/auth/sessions",
                method: "GET",
            });
            if (response.error) {
                throw new Error("Failed to fetch sessions");
            }
            return response.data as SessionsResponse;
        },
    });
};