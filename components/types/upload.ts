export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  status: "pending" | "processing" | "ready" | "error";
}