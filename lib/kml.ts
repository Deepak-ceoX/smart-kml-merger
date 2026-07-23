export interface LoadedKml {

  name: string;

  size: number;

  content: string;

}

function validateExtension(
  file: File
) {

  if (
    !file.name
      .toLowerCase()
      .endsWith(".kml")
  ) {

    throw new Error(
      "Only .kml files are supported."
    );

  }

}

function validateContent(
  text: string
) {

  if (
    !text.includes("<kml")
  ) {

    throw new Error(
      "Invalid KML document."
    );

  }

}

export async function readKmlFile(
  file: File
): Promise<LoadedKml> {

  validateExtension(
    file
  );

  const content =
    await file.text();

  validateContent(
    content
  );

  return {

    name: file.name,

    size: file.size,

    content,

  };

}

export async function readMultipleKmlFiles(
  files: File[]
): Promise<LoadedKml[]> {

  const result: LoadedKml[] = [];

  for (const file of files) {

    result.push(

      await readKmlFile(
        file
      )

    );

  }

  return result;

}