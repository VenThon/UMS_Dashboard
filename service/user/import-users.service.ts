import { apiFetcher } from "../fetcher";

export type ImportUserRow = {
  username: string;
  email: string;
  password: string;
  role: string;
  team: string;
  phoneNumber: string;
};

export type ImportUserError = {
  row: number;
  field?: string;
  message: string;
};

export type ImportUserPreviewResponse = {
  totalRows: number;
  validRows: ImportUserRow[];
  errors: ImportUserError[];
};

export async function PreviewImportUsersService(
  file: File,
): Promise<ImportUserPreviewResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetcher("/api/admin/users/imports/preview", {
    method: "POST",
    body: formData,
  });
}

export async function ConfirmImportUsersService(rows: ImportUserRow[]) {
  return apiFetcher("/api/admin/users/imports/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rows }),
  });
}
