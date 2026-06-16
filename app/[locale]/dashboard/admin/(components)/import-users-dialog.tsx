"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useConfirmImportUsers,
  usePreviewImportUsers,
} from "@/hooks/admin/users.hook";
import { ImportUserPreviewResponse } from "@/service/user/import-users.service";

import { FileDiff } from "lucide-react";
import { toast } from "sonner";

export function ImportUsersDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportUserPreviewResponse | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFile = (file?: File) => {
    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload only .xlsx .xls or .csv files");
      return;
    }

    setFile(file);
    setPreview(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];
    handleFile(droppedFile);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <FileDiff className="h-4 w-4" />
          <span>Import Users</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mx-4">
          <DialogTitle>Import Users</DialogTitle>
          <DialogDescription className="text-sm">
            Upload your users data in .xlsx format. Make sure to follow our
            template for best results.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div
            className={`mx-4 cursor-pointer rounded-lg border-2 border-dashed py-4 text-center transition-all ${
              isDragging
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={(event) => {
                handleFile(event.target.files?.[0]);
              }}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg
                className="h-14 w-14 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>{" "}
              </svg>
              <div>
                <p className="text-md font-medium text-gray-700">
                  {isDragging
                    ? "Drop Excel file here"
                    : "Select an Excel file or drag and drop here"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Supported fomats: .xlsx, .xls, .csv (Max 10MB)
                </p>
              </div>
            </div>
          </div>

          {file && (
            <div className="mx-4 flex gap-3 rounded-md border p-3 font-medium">
              <p className="text-sm">{file.name}</p>
              <p className="mt-0.5 text-xs">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          {file && !preview && (
            <div className="px-4">
              <Button
                variant="default"
                className="w-full"
                onClick={handlePreview}
                disabled={previewMutation.isPending}
              >
                {previewMutation.isPending
                  ? "Loading Preview..."
                  : "Import Preview"}
              </Button>
            </div>
          )}

          {preview && (
            <div className="mx-4 rounded-lg border bg-slate-50 p-4">
              <h3 className="mb-4 text-sm text-gray-500">
                Preview Import Data
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-md bg-white p-3 shadow-xs">
                  <p className="text-sm text-gray-500">Total Rows</p>
                  <p className="text-xl font-semibold text-blue-500">
                    {preview.totalRows}
                  </p>
                </div>

                <div className="rounded-md bg-white p-3 shadow-xs">
                  <p className="text-sm text-gray-500">Valid Rows</p>
                  <p className="text-xl font-semibold text-green-600">
                    {preview.validRows.length}
                  </p>
                </div>

                <div className="rounded-md bg-white p-3 shadow-xs">
                  <p className="text-sm text-gray-500">Error Rows</p>
                  <p className="text-xl font-semibold text-red-600">
                    {preview.errors.length}
                  </p>
                </div>
              </div>

              {preview.errors.length > 0 && (
                <div className="mt-4 max-h-48 overflow-y-auto rounded-md border border-red-200 bg-red-50 p-3">
                  <h4 className="mb-2 font-medium text-red-700">
                    Validation Errors
                  </h4>

                  {preview.errors.map((error) => (
                    <p
                      key={`${error.row}-${error.field}`}
                      className="text-sm text-red-600"
                    >
                      Row {error.row}: {error.message}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
            >
              Cancel
            </Button>
          </DialogClose>

          {preview && (
            <Button
              type="button"
              disabled={
                preview.validRows.length === 0 || confirmMutation.isPending
              }
              onClick={handleConfirmImport}
            >
              {confirmMutation.isPending ? "Importing..." : "Import"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
