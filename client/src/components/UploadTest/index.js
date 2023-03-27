import React, { useState } from "react";
const { BlobServiceClient, ContainerClient } = require("@azure/storage-blob");

function UploadTest() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const accountName = "workspacestorage21";
    const sasToken =
      "sp=racwdl&st=2023-03-27T02:23:37Z&se=2023-05-01T10:23:37Z&spr=https&sv=2021-12-02&sr=c&sig=oaF7uM5AGu1MiL7kdIMc1iCVmYKiUUogObdvUJCa2Ec%3D";
    const containerName = "postmedia";
    const sasUrl = `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;
    if (selectedFile) {
      const blobName = selectedFile.name;
      const containerClient = new ContainerClient(sasUrl);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const options = {
        blobHTTPHeaders: {
          blobContentType: selectedFile.type,
        },
      };
      blockBlobClient.uploadBrowserData(selectedFile, options);
      const imageUrl = blockBlobClient.url;
      setImageUrl(imageUrl);
      console.log(imageUrl);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Selected file"
          style={{ maxWidth: "100%" }}
        />
      )}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadTest;
