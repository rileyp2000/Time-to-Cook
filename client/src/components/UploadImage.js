import React, { useState } from "react";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PropTypes from "prop-types";
import { useEffect } from "react";

const UploadImage = ({ onImageUpload, initialImage }) => {
  console.log("initial image is:", initialImage);
  const [imagePreview, setImagePreview] = useState(
    initialImage
      ? `data:${initialImage.mime};base64,${initialImage.data}`
      : null
  ); // State for storing image preview URL
  const [uploadProgress, setUploadProgress] = useState(0); // State for tracking upload progress
  const [isNewImage, setIsNewImage] = useState(false); // State for tracking whether the user has selected a new image

  useEffect(() => {
    setIsNewImage(false);
    setImagePreview(
      initialImage ? `/${initialImage}` : null
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
    //setIsNewImage true for both cases in roder for the preview to show
    if (initialImage) {
      //only want to set this newImage if we are editing
      setIsNewImage(true);
      onImageUpload(file, true);
    } else {
      setIsNewImage(true);
      onImageUpload(file, false);
    }
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
            src={
              isNewImage
                ? imagePreview
                : `/${initialImage}`
            }
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
