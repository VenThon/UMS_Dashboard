"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LogoutService } from "@/service/auth/auth.service";

export function useLogout(locale: string) {
  const router = useRouter();

  const logout = async () => {
    try {
      await LogoutService();

      toast.success("Logout successful");

      router.push(`/${locale}/login`);
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return { logout };
}
