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

import { BookUser, CircleUser, Mail, Phone, UsersRound } from "lucide-react";
import { useForm } from "react-hook-form";

export function FormForExample() {
  const form = useForm();
  return (
    <Card>
      <Form {...form}>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>
            View and manage your personal account details and profile
            information.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground grid grid-cols-1 gap-4 text-sm sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
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

                <FormControl>
                  <Input placeholder="Please select team" {...field} />
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
                  <BookUser size={18} />
                  <FormLabel className="mt-0.5">Role</FormLabel>
                </div>

                <FormControl>
                  <Input placeholder="Please select role" {...field} />
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
        <CardFooter className="flex justify-end">
          <Button className="bg-green-700">Save changes</Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
