import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Camera name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Camera description is required"],
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v) {
            return (
              v.length === 2 &&
              v[0] >= -180 &&
              v[0] <= 180 && // longitude
              v[1] >= -90 &&
              v[1] <= 90
            ); // latitude
          },
          message: "Coordinates must be valid [longitude, latitude] values",
        },
      },
    },
    resolution: {
      type: String,
      enum: [
        "640x480",   // VGA
        "800x600",   // SVGA
        "1024x768",  // XGA
        "1280x720",  // HD 720p
        "1366x768",  // HD
        "1600x900",  // HD+
        "1920x1080", // Full HD 1080p
        "1920x1200", // WUXGA
        "2560x1440", // QHD 1440p
        "2560x1600", // WQXGA
        "3200x1800", // QHD+
        "3840x2160", // 4K UHD
        "4096x2160"  // DCI 4K
      ],
      default: "1920x1080",
    },
    visionRange: {
      type: Number,
      default: 100,
      min: [1, "Vision range must be at least 1 meter"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
    },
  },
  {
    timestamps: true, // This will automatically handle createdAt and updatedAt
  }
);

// Create a 2dsphere index for location
cameraSchema.index({ location: "2dsphere" });

// Update the updatedAt field before saving
cameraSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Add a method to validate the data
cameraSchema.methods.validateData = function () {
  const errors = [];

  if (!this.name) errors.push("Name is required");
  if (!this.description) errors.push("Description is required");

  // Check if location is valid
  if (!this.location) {
    errors.push("Location is required");
  } else if (
    typeof this.location === "object" &&
    this.location.type === "Point"
  ) {
    // Validate GeoJSON Point
    if (!this.location.coordinates || this.location.coordinates.length !== 2) {
      errors.push("Valid location coordinates are required");
    }
  }

  return errors;
};

// Ensure the model is only created once
const Camera = mongoose.models.Camera || mongoose.model("Camera", cameraSchema);

export default Camera;
