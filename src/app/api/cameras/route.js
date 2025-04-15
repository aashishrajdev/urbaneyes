import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Camera from "@/models/Camera";

export async function GET() {
  try {
    await connectDB();
    const cameras = await Camera.find({});
    return NextResponse.json({ success: true, data: cameras });
  } catch (error) {
    console.error("Error fetching cameras:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch cameras" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log("Received request body:", body);

    // Validate required fields
    if (!body.name || !body.description || !body.location) {
      console.log("Missing required fields:", { body });
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate location format
    if (
      !body.location.coordinates ||
      !Array.isArray(body.location.coordinates) ||
      body.location.coordinates.length !== 2
    ) {
      console.log("Invalid location format:", body.location);
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid location format. Must be a GeoJSON Point with [longitude, latitude] coordinates",
        },
        { status: 400 }
      );
    }

    // Create camera with proper GeoJSON Point format
    const cameraData = {
      name: body.name,
      description: body.description,
      location: {
        type: "Point",
        coordinates: body.location.coordinates,
      },
      resolution: body.resolution || "1080p",
      visionRange: body.visionRange ? Number(body.visionRange) : 100,
      status: body.status || "active",
    };

    // Remove any id field to prevent conflicts
    delete cameraData.id;
    delete cameraData._id;

    console.log("Creating camera with data:", cameraData);

    const camera = new Camera(cameraData);
    console.log("Created camera instance:", camera);

    // Validate the camera document
    const validationError = camera.validateSync();
    if (validationError) {
      console.log("Validation error:", validationError);
      return NextResponse.json(
        { success: false, message: validationError.message },
        { status: 400 }
      );
    }

    // Save the camera
    const savedCamera = await camera.save();
    console.log("Camera saved successfully:", savedCamera);

    return NextResponse.json({ success: true, data: savedCamera });
  } catch (error) {
    console.error("Error adding camera:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to add camera" },
      { status: 500 }
    );
  }
}
