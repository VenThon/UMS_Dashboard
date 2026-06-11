import { createUserInput, updateUserInput } from "@/db/validation/users";
import { apiFetcher } from "../fetcher";
import { User } from "@/db/schema";

export async function ListAllUsersService(params: string) {
  const response = await fetch(`/api/admin/users?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Failed to fetch ilisting user",
    );
  }

  return data;
}

export async function CreateUserService(values: createUserInput) {
  const response = await fetch("/api/admin/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Failed to fetch user creation",
    );
  }

  return data;
}

export async function GetUserByIdService(id: string) {
  return apiFetcher<User>(`/api/admin/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export async function UpdateUserService(id: string, values: updateUserInput) {
  return apiFetcher<User>(`/api/admin/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
}

export async function DeleteUserService(id: string) {
  return apiFetcher<User>(`/api/admin/users/${id}`, {
    method: "DELETE",
  });
}
