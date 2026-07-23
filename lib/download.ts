export function downloadFile(

  fileName: string,

  content: string,

  mimeType = "application/vnd.google-earth.kml+xml"

): void {

  const blob = new Blob(

    [content],

    {

      type: mimeType,

    }

  );

  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;

  anchor.download = fileName;

  document.body.appendChild(
    anchor
  );

  anchor.click();

  requestAnimationFrame(() => {

    document.body.removeChild(
      anchor
    );

    URL.revokeObjectURL(
      url
    );

  });

}

export function downloadJson(

  fileName: string,

  data: unknown

): void {

  downloadFile(

    fileName,

    JSON.stringify(
      data,
      null,
      2
    ),

    "application/json"

  );

}
