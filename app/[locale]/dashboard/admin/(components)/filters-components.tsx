"use client";

import { useSearchParams } from "next/navigation";

export function useUserSearchParams() {
  const searchParam = useSearchParams();
  const page = Number.parseInt(searchParam.get("page") || "1");
  const pageSize = Number.parseInt(searchParam.get("pageSize") || "10");
  const nameSearch = searchParam.get("nameSearch") || "";
  const role = searchParam.get("role") || "";
  const team = searchParam.get("team") || "";

  return new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    nameSearch,
    role,
    team,
  });
}
