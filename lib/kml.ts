export interface KmlFile {
  name: string;
  size: number;
  content: string;
}

export async function readKmlFile(
  file: File
): Promise<KmlFile> {
  return {
    name: file.name,
    size: file.size,
    content: await file.text(),
  };
}