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
import { UNDER_TEAM, UnderTeamLabel } from "@/db/types/team.type";
import { USER_ROLE, UserRoleLabels } from "@/db/types/user.type";
import {
  BookUser,
  CircleUser,
  LockKeyhole,
  Mail,
  Phone,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function UsersCreation() {
  const router = useRouter();
  const form = useForm();
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold tracking-tight">Create New User</h1>
      <p className="text-muted-foreground">
        Register a new user in the system by providing account details, role
        assignments, and team information.
      </p>
      <Card className="mt-5">
        <Form {...form}>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Enter the user&apos;s basic information and system access details.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-muted-foreground grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
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
              name="username"
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
              name="username"
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
                      {Object.values(UNDER_TEAM)
                        // .filter((role) => role !== USER_ROLE.ADMIN)
                        .map((team) => (
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
              name="username"
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
              name="username"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-1.5">
                    <LockKeyhole size={18} />
                    <FormLabel className="mt-0.5">Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} placeholder="Enter your password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/admin/users")}
            >
              Cancel
            </Button>
            <Button>Submit</Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
