import { axiosInstance } from "../../utils/url";
import { MutationOptions, useMutation } from "react-query";
import { AxiosError } from "axios";

export type UserDataType = {
  lastName: string;
  firstName: string;
  email: string;
};

const saveUser = async (userData: UserDataType) => {
  const res = await axiosInstance.post<string>("users", {
    ...userData,
  });
  return res.data;
};

export const useAPIsaveUser = (
  mutationOptions?: MutationOptions<string, AxiosError, UserDataType, unknown>
) => {
  return useMutation<string, AxiosError, UserDataType, unknown>(
    saveUser,
    mutationOptions
  );
};
