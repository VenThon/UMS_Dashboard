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
  EyeIcon,
  EyeOffIcon,
  LockKeyhole,
  LockKeyholeOpen,
  LockOpen,
} from "lucide-react";
import { createElement, useState } from "react";
import { useForm } from "react-hook-form";

export function ChangePWD() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setnewPasswordVisibility] = useState(false);
  const [comfirmNewPasswordVisibility, setComfirmNewPasswordVisibility] =
    useState(false);
  const form = useForm();
  return (
    <Card>
      <Form {...form}>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure and protect your
            information
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-1.5">
                  <LockOpen size={18} />
                  <FormLabel className="mt-0.5">Current Password</FormLabel>
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
          <FormField
            control={form.control}
            name="newpassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-1.5">
                  <LockKeyholeOpen size={18} />
                  <FormLabel className="mt-0.5">New Password</FormLabel>
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
                      onClick={() => setnewPasswordVisibility((prev) => !prev)}
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
            name="comfirmnewpassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-1.5">
                  <LockKeyhole size={18} />
                  <FormLabel className="mt-0.5">Comfirm New Password</FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="comfirmnewpassword"
                      type={comfirmNewPasswordVisibility ? "text" : "password"}
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
        <CardFooter className="flex justify-end">
          <Button className="bg-green-700">Save Changes</Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
