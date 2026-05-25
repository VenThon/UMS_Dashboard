"use client";
import { LogInInput, logInSchema } from "@/db/validation/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useRouter } from "next/navigation";
import { createElement, useState } from "react";
import { LoginService } from "@/service/auth/auth.service";
import { roleRoutes } from "@/lib/validation/route-by-role";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const form = useForm<LogInInput>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LogInInput) {
    try {
      setError("");

      const result = await LoginService(values);

      const redirectPath = roleRoutes[result.user.role] ?? "/dashboard";

      router.push(redirectPath);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    }
  }
  return (
    <Card className="w-full max-w-md ">
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
                  <FormLabel>Password</FormLabel>

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
