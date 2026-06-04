import { createUserInput } from "@/db/validation/users";

export async function ListAllUsersService() {
  const response = await fetch("/api/admin/users", {
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

  // const data = await response.json();

  // if (!response.ok) {
  //   throw new Error(
  //     data.message || data.error || "Failed to fetch user creation",
  //   );
  // }

  // return data;
  return response;
}
