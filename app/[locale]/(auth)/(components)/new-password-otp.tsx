"use client";

import { createElement, useState } from "react";

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
import { Link } from "@/i18n/navigation";

import {
  ArrowLeft,
  EyeIcon,
  EyeOffIcon,
  LockKeyhole,
  LockKeyholeOpen,
} from "lucide-react";
import { useForm } from "react-hook-form";

export function NewPasswordOTP() {
  const [newPasswordVisibility, setnewPasswordVisibility] = useState(false);
  const [comfirmNewPasswordVisibility, setComfirmNewPasswordVisibility] =
    useState(false);
  const form = useForm();
  return (
    <section>
      <Card className="mx-auto w-full max-w-md">
        <Form {...form}>
          <CardHeader>
            <CardTitle>Create New Password</CardTitle>
            <CardDescription>
              Your new password must be difference form your previouesly used
              passwords.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-6 text-sm">
            <FormField
              control={form.control}
              name="newpasswordOtp"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-1.5">
                    <LockKeyholeOpen size={18} />
                    <FormLabel className="mt-0.5">New password</FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="newpassword"
                        type={newPasswordVisibility ? "text" : "password"}
                        placeholder="Enter new password"
                        autoComplete="current-password"
                        aria-invalid={!!form.formState.errors.password}
                        {...form.register("password")}
                        {...field}
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center p-3"
                        onClick={() =>
                          setnewPasswordVisibility((prev) => !prev)
                        }
                        aria-label={
                          newPasswordVisibility
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {createElement(
                          newPasswordVisibility ? EyeOffIcon : EyeIcon,
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
            <FormField
              control={form.control}
              name="comfirmpasswordOtp"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-1.5">
                    <LockKeyhole size={18} />
                    <FormLabel className="mt-0.5">
                      Comfirm new password
                    </FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="comfirmnewpassword"
                        type={
                          comfirmNewPasswordVisibility ? "text" : "password"
                        }
                        placeholder="Comfirm new password"
                        autoComplete="current-password"
                        aria-invalid={!!form.formState.errors.password}
                        {...form.register("password")}
                        {...field}
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center p-3"
                        onClick={() =>
                          setComfirmNewPasswordVisibility((prev) => !prev)
                        }
                        aria-label={
                          comfirmNewPasswordVisibility
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {createElement(
                          comfirmNewPasswordVisibility ? EyeOffIcon : EyeIcon,
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
          <CardFooter className="grid grid-cols-1 gap-4">
            <Button>Save Changes</Button>
            <div>
              <Link
                href={`/login`}
                className="flex items-center justify-center gap-2 text-sm underline-offset-4 hover:underline"
              >
                <ArrowLeft size={17} />
                <span>Back to Log in</span>
              </Link>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </section>
  );
}
