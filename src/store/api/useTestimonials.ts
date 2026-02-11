import { useQuery } from "@tanstack/react-query";
import { axiosBaseQuery } from "@/utils/axiosConfig";

export interface TestimonialsResponse {
    status: number;
    message: string;
    data: {
        testimonials: {
            id: number;
            image: string;
            title: string;
            subtitle: string;
            description: string;
        }[];
    };
}

export const useTestimonials = () => {
    return useQuery({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const response = await axiosBaseQuery()({
                url: "/testimonials",
                method: "GET",
            });
            if (response.error) {
                throw new Error("Failed to fetch testimonials");
            }
            return response.data as TestimonialsResponse;
        },
    });
};