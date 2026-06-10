"use client";

import React, { useCallback } from "react";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";

import { useDebouncedCallback } from "@mantine/hooks";
import { XIcon } from "lucide-react";

export function SearchAllUsers() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (searchValue: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set("page", "1");

      if (searchValue) {
        newSearchParams.set("nameSearch", searchValue);
      } else {
        newSearchParams.delete("nameSearch");
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const onSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const queryString = updateSearchParams(event.target.value);
      router.push(`?${queryString}`, {
        scroll: false,
      });
    },
    600,
  );
  const clearSearch = () => {
    router.push(`?${updateSearchParams("")}`, {
      scroll: false,
    });
  };
  return (
    <div className="relative w-full flex-1 md:max-w-sm">
      <Input
        placeholder="Search by username"
        onChange={onSearch}
        defaultValue={searchParams.get("nameSearch") ?? ""}
        className="w-full sm:max-w-lg"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        onClick={clearSearch}
      >
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Clear</span>
      </Button>
    </div>
  );
}
