import Image from "next/image";

import LocaleSwitcher from "@/components/lang/local-switcher";
import SiteFooter from "@/components/site-footer";
import { ModeToggle } from "@/components/theme/theme-toggle";

import { ForgotPasswordForm } from "../(components)/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="dark:bg-accent hidden items-center justify-center bg-[#058248] lg:flex">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={220}
            height={220}
            className="rounded-full"
            priority
          />

          <p className="mt-3 text-2xl font-semibold text-white">
            សូមស្វាគមន៍មកកាន់
          </p>

          <h1 className="mt-6 text-3xl font-semibold text-white">
            ប្រព័ន្ធគ្រប់គ្រងបុគ្គលិក
          </h1>
        </div>
      </div>
      <div className="flex min-h-screen flex-col gap-4 px-4 py-4 sm:px-6 md:px-8 md:pt-8 md:pb-4">
        <div className="flex justify-end gap-2">
          <ModeToggle />
          <LocaleSwitcher />
        </div>
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md">
            <ForgotPasswordForm />
          </div>
        </main>
        <footer className="flex justify-center pb-2">
          <SiteFooter />
        </footer>
      </div>
    </div>
  );
}
