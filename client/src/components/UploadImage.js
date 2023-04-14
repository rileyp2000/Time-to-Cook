import React, { useState } from "react";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PropTypes from "prop-types";

const UploadImage = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState(null); // State for storing image preview URL
  const [uploadProgress, setUploadProgress] = useState(0); // State for tracking upload progress

  //   const handleFileUpload = (event) => {
  //     const files = event.target.files;
  //     const file = files[0];

  //     // // Generate preview URL for the image
  //     // const reader = new FileReader();
  //     // reader.onload = () => {
  //     //   setImagePreview(reader.result);
  //     // };
  //     // reader.readAsDataURL(file);

  //     // // Add file upload logic here
  //     // // Update uploadProgress state to reflect progress
  //     // // Convert image to base64
  //     // reader.onloadend = () => {
  //     //   const base64String = reader.result
  //     //     .replace("data:", "")
  //     //     .replace(/^.+,/, "");
  //     //   // Send the base64String to the backend or do whatever you need with it
  //     //   onImageUpload(base64String);
  //     // };

  //   };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const file = files[0];

    // Send image file to backend server using FormData
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    // Set file path in JSON object
    const image = {
      mime: file.type,
      path: result.filePath, // Replace with the actual file path or local API link returned from the backend
    };
    // Call onImageUpload with the image object
    onImageUpload(image);
  };

  return (
    <div>
      <Button
        variant="contained"
        component="label"
        style={{ marginTop: 10, width: "20%", marginBottom: 25 }}
      >
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
        <PhotoCamera style={{ marginLeft: 20 }} />
      </Button>
      {/* Image Preview */}
      {imagePreview && (
        <div style={{ marginTop: 10 }}>
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
      {/* Progress Indicator */}
      {uploadProgress > 0 && (
        <div style={{ marginTop: 10, marginBottom: 25 }}>
          <progress value={uploadProgress} max={100} />
        </div>
      )}
    </div>
  );
};

// Define prop validation using PropTypes
UploadImage.propTypes = {
  onImageUpload: PropTypes.string.isRequired, // Specify the type and make it required
};

export default UploadImage;
