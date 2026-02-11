import { useQuery } from "@tanstack/react-query";
import { axiosBaseQuery } from "@/utils/axiosConfig";
import { Teacher } from "@/types/users";

export interface TeachersResponse {
    status: number;
    message: string;
    data: {
        teachers: Teacher[];
    };
}

export const useTeachers = () => {
    return useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const response = await axiosBaseQuery()({
                url: "/teachers",
                method: "GET",
            });
            if (response.error) {
                throw new Error("Failed to fetch teachers");
            }
            return response.data as TeachersResponse;
        },
    });
};