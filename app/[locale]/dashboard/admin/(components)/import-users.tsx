"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  useConfirmImportUsers,
  usePreviewImportUsers,
} from "@/hooks/admin/users.hook";
import { ImportUserPreviewResponse } from "@/service/user/import-users.service";

export function ImportUsersExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportUserPreviewResponse | null>(
    null,
  );

  const previewMutation = usePreviewImportUsers();
  const confirmMutation = useConfirmImportUsers();

  const handlePreview = () => {
    if (!file) return;

    previewMutation.mutate(file, {
      onSuccess: (data) => {
        setPreview(data);
      },
    });
  };

  const handleConfirmImport = () => {
    if (!preview) return;

    confirmMutation.mutate(preview.validRows, {
      onSuccess: () => {
        setFile(null);
        setPreview(null);
      },
    });
  };

  return (
    <div className="space-y-1">
      <Input
        type="file"
        accept=".xlsx,.xls"
        onChange={(event) => {
          setFile(event.target.files?.[0] ?? null);
          setPreview(null);
        }}
      />

      <button
        type="button"
        disabled={!file || previewMutation.isPending}
        onClick={handlePreview}
      >
        {previewMutation.isPending ? "Checking..." : "Preview Import"}
      </button>

      {preview && (
        <div className="space-y-2">
          <p>Total rows: {preview.totalRows}</p>
          <p>Valid rows: {preview.validRows.length}</p>
          <p>Error rows: {preview.errors.length}</p>

          {preview.errors.map((error) => (
            <p key={`${error.row}-${error.field}`} className="text-red-500">
              Row {error.row}: {error.message}
            </p>
          ))}

          {preview.validRows.length > 0 && (
            <button
              type="button"
              disabled={confirmMutation.isPending}
              onClick={handleConfirmImport}
            >
              {confirmMutation.isPending ? "Importing..." : "Confirm Import"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
