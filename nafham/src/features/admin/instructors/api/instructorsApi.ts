import { apiClient } from "@/services/apiClient";
import { Instructor } from "../types";

export const instructorsApi = {
  getInstructorsDetails: async (): Promise<Instructor[]> => {
    const { data } = await apiClient.get("/admins/instructors");
    return data.data;
  },
};
