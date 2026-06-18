"use client";
import { createElement, useCallback, useState } from "react";

import { useRouter } from "next/navigation";

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
import { LogInInput, logInSchema } from "@/db/validation/auth";
import { Link } from "@/i18n/navigation";
import { roleRoutes } from "@/lib/validation/route-by-role";
import { LoginService } from "@/service/auth/auth.service";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const form = useForm<LogInInput>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const createLoginMutate = useMutation({
    mutationFn: LoginService,
    onSuccess: (data) => {
      const redirectPath = roleRoutes[data.user.role] ?? "/dashboard";
      toast.success("Logged in successfully");
      form.reset();
      router.push(redirectPath);
    },
    onError: (error) => {
      console.log("Failed to log in", error);
      toast.error("Failed log in");
    },
  });

  const { mutate } = createLoginMutate;

  const onSubmit = useCallback(
    (values: LogInInput) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-xl">System login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="my-4 space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
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
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href={`/forgot-password`}
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot Password ?
                    </Link>
                  </div>

                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={passwordVisibility ? "text" : "password"}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        aria-invalid={!!form.formState.errors.password}
                        {...form.register("password")}
                        {...field}
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center p-3"
                        onClick={() => setPasswordVisibility((prev) => !prev)}
                        aria-label={
                          passwordVisibility ? "Hide password" : "Show password"
                        }
                      >
                        {createElement(
                          passwordVisibility ? EyeOffIcon : EyeIcon,
                          {
                            className: "h-4 w-4",
                          },
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
