type LoginProps = {
  username: string;
  password: string;
};
export async function LoginService(data: LoginProps) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response) {
    throw new Error("Login Failed");
  }

  return result;
}

export async function UserProfileService() {
  const response = await fetch("/api/auth/profile", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Failed to fetch user profile",
    );
  }

  return data;
}

// export async function LogoutService() {
//   const response = await fetch("/api/auth/logout",
//     {
//       method: "POST"
//     }
//   );

//   const data = await response.json();

//   if(!response.ok){
//     throw new Error(data.error || "Failed to logout")
//   }

//   return  data;
// }
export async function LogoutService() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Failed to logout");
  }

  return data;
}
