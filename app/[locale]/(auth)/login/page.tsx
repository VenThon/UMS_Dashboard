import Image from "next/image";

import LocaleSwitcher from "@/components/lang/local-switcher";
import { LoginForm } from "@/components/(auth)/login-form";
export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="hidden items-center justify-center bg-[#058248] lg:flex">
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
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-end">
          <LocaleSwitcher />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
