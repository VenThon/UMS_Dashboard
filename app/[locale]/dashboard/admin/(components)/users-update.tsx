"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UNDER_TEAM, UnderTeam, UnderTeamLabel } from "@/db/types/team.type";
import { USER_ROLE, UserRole, UserRoleLabels } from "@/db/types/user.type";
import { updateUserInput, updateUserSchema } from "@/db/validation/users";
import { UpdateUserService } from "@/service/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookUser, CircleUser, Mail, Phone, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/db/schema";

type UpdateUserFormProps = {
  id: string;
  user: User;
};

export function UsersUpdateInformation({ id, user }: UpdateUserFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<updateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      role: user.role as UserRole,
      team: user.team as UnderTeam,
      phoneNumber: user.phoneNumber ?? "",
      // isActive: true,
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (values: updateUserInput) => UpdateUserService(id, values),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard/admin/users");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user",
      );
    },
  });

  const { mutate } = updateUserMutation;

  const onSubmit = useCallback(
    (values: updateUserInput) => {
      mutate(values);
    },
    [mutate],
  );
  // console.log("Values", form.watch());
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold ">Update User Information</h1>
      <p className="text-muted-foreground">
        Review and update user account information, permissions, and
        organizational assignments.
      </p>
      <Card className="mt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>
                Update the user&apos;s profile information, organizational
                assignments, and account status.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2 py-6 text-muted-foreground grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-1.5">
                      <CircleUser size={18} />
                      <FormLabel className="mt-0.5">Username</FormLabel>
                    </div>

                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-1.5">
                      <Mail size={18} />
                      <FormLabel className="mt-0.5">Email</FormLabel>
                    </div>

                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-1.5">
                      <UsersRound size={18} />
                      <FormLabel className="mt-0.5">Team</FormLabel>
                    </div>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(UNDER_TEAM).map((team) => (
                          <SelectItem value={team} key={team}>
                            {`${UnderTeamLabel[team]}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-1.5">
                      <BookUser size={18} />
                      <FormLabel className="mt-0.5">Role</FormLabel>
                    </div>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(USER_ROLE)
                          .filter((role) => role !== USER_ROLE.ADMIN)
                          .map((role) => (
                            <SelectItem value={role} key={role}>
                              {`${UserRoleLabels[role]}`}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-1.5">
                      <Phone size={18} />
                      <FormLabel className="mt-0.5">Phone Number</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/admin/users")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
