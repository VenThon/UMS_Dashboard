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
import { Link } from "@/i18n/navigation";

import { ArrowLeft, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

export function ForgotPasswordForm() {
  const form = useForm();
  return (
    <section>
      <Card>
        <Form {...form}>
          <form>
            <CardHeader className="text-center">
              <CardTitle>Password Recovery</CardTitle>
              <CardDescription>
                No worries. Enter your email address and we will help you get
                back into your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex gap-1.5">
                      <Mail size={17} />
                      <FormLabel className="mt-0.5">Email address</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="grid grid-cols-1 space-y-6">
              <Button>
                <Link href="/verify-email">Reset password</Link>
              </Button>
              <div>
                <Link
                  href={`/login`}
                  className="flex items-center justify-center gap-2 text-sm underline-offset-4 hover:underline"
                >
                  <ArrowLeft size={17} />
                  <span>Back to log in</span>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <div>
        <p className="mt-6 text-center text-sm">
          If you are having trouble, please contact our {""}
          <a
            href="mailto:example@gmail.com"
            className="font-medium text-blue-600 hover:underline"
            target="_blank"
          >
            support team.
          </a>
        </p>
      </div>
    </section>
  );
}
