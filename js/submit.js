import fs from "fs";
import archiver from "archiver";
import path from "path";
import { promises as pfs } from "fs";

const deleteFileIfExists = async (filePath) => {
  try {
    // Check if the file exists
    await pfs.access(filePath);
    // File exists, proceed to delete
    await pfs.unlink(filePath);
  } catch (error) {
    // Error handling
    if (error.code === "ENOENT") {
      // File does not exist
      // Do nothing.
    } else {
      // Other errors, such as permission issues
      console.error(`Error deleting file: ${error}`);
    }
  }
};

function zipDirectory(sourceDir, zipFilePath) {
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", { zlib: { level: 9 } });
  const dirName = path.basename(sourceDir);

  return new Promise((resolve, reject) => {
    // Listen for all archive data to be written
    output.on("close", () =>
      resolve(
        `Archive created successfully. Total bytes: ${archive.pointer()}`,
      ),
    );

    // Catch warnings (like stat failures and other non-blocking errors)
    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.warn(err);
      } else {
        reject(err);
      }
    });

    // Catch errors explicitly
    archive.on("error", (err) => reject(err));

    // Pipe archive data to the file
    archive.pipe(output);

    // Append files from a directory
    // archive.directory(sourceDir, dirName);
    archive.glob("**/*", { ignore: [zipFilePath, "node_modules/**"] });

    // Finalize the archive (i.e., finish appending files and finalize the archive)
    archive.finalize();
  });
}

// Zip the submission directory
const sourceDirectory = "."; // Replace with the directory you want to zip
const zipFileName = "submission.zip"; // Replace with your desired zip file name
zipDirectory(sourceDirectory, zipFileName)
  .then((message) => console.log(message))
  .catch((err) => console.error("Error creating zip:", err));
