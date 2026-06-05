import {
  DeleteUserService,
  GetUserByIdService,
} from "@/service/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useDeleteUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => DeleteUserService(id),
    onSuccess: () => {
      toast.success("User is deleted successful");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard/admin/users");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user",
      );
    },
  });

  return deleteUserMutation;
}

export function useViewDetailsUser() {
  const queryClient = useQueryClient();
  const viewDetailUsers = useMutation({
    mutationFn: (id: string) => GetUserByIdService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to view details user",
      );
    },
  });
  return viewDetailUsers;
}
