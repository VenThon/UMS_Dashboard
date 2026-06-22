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
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <Input
          placeholder="Search by username"
          onChange={onSearch}
          defaultValue={searchParams.get("nameSearch") ?? ""}
          className="w-full pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
          onClick={clearSearch}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
