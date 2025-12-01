import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../lib/api";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, updateProfileMutation: mutate };
};
export default useUpdateProfile;
