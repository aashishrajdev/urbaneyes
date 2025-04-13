import mongoose from 'mongoose';

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    resolution: {
        type: String,
        required: true,
    },
    visionRange: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active',
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a 2dsphere index for location
cameraSchema.index({ location: '2dsphere' });

const Camera = mongoose.models.Camera || mongoose.model('Camera', cameraSchema);

export default Camera; 