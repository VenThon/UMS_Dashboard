// "use client";

// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { LogoutService } from "@/service/auth/auth.service";

// export function useLogout(locale: string) {
//   const router = useRouter();

//   const logout = async () => {
//     try {
//       await LogoutService();

//       toast.success("Logout successful");

//       router.push(`/${locale}/login`);
//     } catch (error) {
//       toast.error("Logout failed");
//       console.error(error);
//     }
//   };

//   return { logout };
// }

"use client";

import { useRouter } from "next/navigation";

import { LogoutService } from "@/service/auth/auth.service";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogout(locale: string) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: LogoutService,

    onSuccess: () => {
      toast.success("Logged out successfully");

      setTimeout(() => {
        router.refresh();
        router.replace(`/${locale}/login`);
      }, 800);
    },

    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Logout failed");
    },
  });

  return {
    logout: () => mutation.mutate(),
    isLoggingOut: mutation.isPending,
  };
}
