import React, { useState } from "react";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PropTypes from "prop-types";
import { useEffect } from "react";

const UploadImage = ({ onImageUpload, initialImage }) => {
  const [imagePreview, setImagePreview] = useState(
    initialImage
      ? `data:${initialImage.mime};base64,${initialImage.data}`
      : null
  ); // State for storing image preview URL
  const [uploadProgress, setUploadProgress] = useState(0); // State for tracking upload progress

  useEffect(() => {
    setImagePreview(
      initialImage
        ? `data:${initialImage.mime};base64,${initialImage.data}`
        : null
    );
  }, [initialImage]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const file = files[0];

    // Generate preview URL for the image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Add file upload logic here
    // Update uploadProgress state to reflect progress
    // Convert image to base64
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      // Create image object with mime type and base64 data
      const image = {
        mime: file.type,
        data: base64String,
      };
      // Send the image object to the backend or do whatever you need with it
      onImageUpload(image);
    };
  };

  return (
    <div>
      <Button
        variant="contained"
        component="label"
        style={{ marginTop: 10, width: "30%", marginBottom: "3rem" }}
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
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{ maxWidth: "80%", height: "auto", marginBottom: "3rem" }}
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
  initialImage: PropTypes.string, // Add a prop for the initial image
};

export default UploadImage;
