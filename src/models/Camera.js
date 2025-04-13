import mongoose from 'mongoose';

const CameraSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Camera ID is required'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Camera name is required'],
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
    status: {
        type: String,
        required: [true, 'Camera status is required'],
        enum: ['active', 'maintenance', 'offline'],
        default: 'active'
    },
    coordinates: {
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
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