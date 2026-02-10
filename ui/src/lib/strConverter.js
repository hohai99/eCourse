// function to clean up the download file names from PB
export function cleanFileName(inputFileName) {
  let cleanedFileName =
    inputFileName.charAt(0).toUpperCase() + inputFileName.slice(1);

  cleanedFileName = cleanedFileName.replace(/_/g, " ");

  const dotIndex = cleanedFileName.lastIndexOf(".");
  if (dotIndex !== -1 && dotIndex >= 11) {
    const prefix = cleanedFileName.slice(0, dotIndex - 11);
    if (prefix.trim().length > 0) {
      cleanedFileName = prefix + cleanedFileName.slice(dotIndex);
    }
  }

  return cleanedFileName;
}
