// "use client";

// import { Field } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { importUserInput } from "@/db/validation/users";
// import { useState } from "react";

// type ImportError = {
//   row: number;
//   message: string;
// };

// type ImportPreviewResponse = {
//   totalRows: number;
//   validRows: importUserInput[];
//   errors: ImportError[];
// };

// export function ImportUsersExcel() {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<ImportPreviewResponse | null>(null);

//   async function handlePreview() {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     const response = await fetch("/api/admin/users/imports/preview", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     setPreview(data);
//   }

//   async function handleConfirmImport() {
//     await fetch("/api/admin/users/imports/confirm", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         rows: preview?.validRows,
//       }),
//     });
//   }

//   return (
//     <div className="space-y-2">
//     <Field>
//         <Input
//             type="file"
//             accept=".xlsx,.xls"
//             onChange={(event) => {
//             setFile(event.target.files?.[0] ?? null);
//             }}
//         />
//       <button onClick={handlePreview}>Preview</button>

//       {preview && (
//         <div>
//           <p>Total rows: {preview.totalRows}</p>
//           <p>Valid rows: {preview.validRows.length}</p>
//           <p>Error rows: {preview.errors.length}</p>

//           {preview.errors.map((error: ImportError) => (
//             <p key={error.row}>
//               Row {error.row}: {error.message}
//             </p>
//           ))}

//           {preview.errors.length === 0 && (
//             <button onClick={handleConfirmImport}>
//               Confirm Import
//             </button>
//           )}
//         </div>
//       )}
//     </Field>
//     </div>
//   );
// }

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
