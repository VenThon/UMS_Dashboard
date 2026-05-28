"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

import Image from "next/image";
import { Card } from "@/components/ui/card";

interface UploadResult {
  message: string;
  filename: string;
  size: number;
  url: string | null;
}

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    // Reset previous state
    setError(null);
    setUploadResult(null);

    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, GIF, etc.)");
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError(null);

    // Simulate upload process (in a real app, you would send to a server)
    try {
      // This is a mock upload - in a real application, you would use:
      // const formData = new FormData();
      // formData.append('image', selectedFile);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Mock response
      const mockResponse: UploadResult = {
        message: "File uploaded successfully!",
        filename: selectedFile.name,
        size: selectedFile.size,
        // In a real app, you would get a URL from the server
        url: previewUrl,
      };

      setUploadResult(mockResponse);
      setSelectedFile(null);
    } catch (err) {
      setError("Upload failed: " + (err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSelectNew = () => {
    handleClear();
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <div className="from-blue-50 to-indigo-100 px-4 py-4">
        <h1 className="mb-2 text-xl font-bold ">Upload Profile Picture</h1>
        <p className="mb-8 text-gray-600">
          Select an image to upload and preview
        </p>
        <div className="mx-auto max-w-xl">
          <div className="overflow-hidden rounded-xl">
            <div
              className={`m-6 cursor-pointer rounded-lg border-2 border-dashed border-green-800 p-8 text-center transition-all ${
                isDragging
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleInputChange}
                accept="image/*"
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-4">
                <svg
                  className="h-16 w-16 text-[#058248]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>

                <div>
                  <p className="text-md font-medium text-gray-700">
                    {isDragging
                      ? "Drop image here"
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="px-6 pb-6">
                <h3 className="mb-3 text-lg font-medium text-gray-800">
                  Preview
                </h3>
                <div className="relative h-64 w-full overflow-hidden rounded-lg border bg-gray-100">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className="mt-2 truncate text-sm text-gray-600">
                  {selectedFile?.name} (
                  {(selectedFile?.size || 0 / 1024).toFixed(2)} KB)
                </p>
              </div>
            )}

            {/* Upload result */}
            {uploadResult && uploadResult.url && (
              <div className="px-6 pb-6">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="font-medium text-green-800">
                      {uploadResult.message}
                    </span>
                  </div>
                  <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg border bg-gray-100">
                    <Image
                      src={uploadResult.url}
                      alt="Uploaded"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {uploadResult.filename} (
                    {(uploadResult.size / 1024).toFixed(2)} KB)
                  </p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="px-6 pb-6">
                <div className="flex items-start rounded-lg border border-red-200 bg-red-50 p-4">
                  <svg
                    className="mt-0.5 mr-2 h-5 w-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-red-800">{error}</span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col space-y-3 px-6 pb-6">
              {selectedFile && !uploadResult && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    "Upload Image"
                  )}
                </button>
              )}

              {uploadResult ? (
                <button
                  onClick={handleSelectNew}
                  className="w-full rounded-lg bg-gray-600 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                >
                  Select New Image
                </button>
              ) : (
                selectedFile && (
                  <button
                    onClick={handleClear}
                    className="w-full rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                  >
                    Cancel
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
