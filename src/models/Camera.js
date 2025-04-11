import mongoose from 'mongoose';

const CameraSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Camera ID is required'],
        unique: true,
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location description is required'],
        trim: true
    },
    resolution: {
        type: String,
        required: [true, 'Camera resolution is required'],
        trim: true
    },
    visionRange: {
        type: String,
        required: [true, 'Vision range is required'],
        trim: true
    },
    coordinates: {
        latitude: {
            type: Number,
            required: [true, 'Latitude is required']
        },
        longitude: {
            type: Number,
            required: [true, 'Longitude is required']
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent model compilation error in development due to hot reloading
const Camera = mongoose.models.Camera || mongoose.model('Camera', CameraSchema);

export default Camera; 