import mongoose from 'mongoose';

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Camera name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Camera description is required'],
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function(v) {
                    return v.length === 2 && 
                           v[0] >= -180 && v[0] <= 180 && // longitude
                           v[1] >= -90 && v[1] <= 90;     // latitude
                },
                message: 'Coordinates must be valid [longitude, latitude] values'
            }
        }
    },
    resolution: {
        type: String,
        enum: ['720p', '1080p', '2K', '4K'],
        default: '1080p'
    },
    visionRange: {
        type: Number,
        min: [0, 'Vision range cannot be negative'],
        default: 100 // in meters
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    }
}, {
    timestamps: true, // This will automatically handle createdAt and updatedAt
});

// Create a 2dsphere index for location
cameraSchema.index({ location: '2dsphere' });

// Update the updatedAt field before saving
cameraSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Add a method to validate the data
cameraSchema.methods.validateData = function() {
    const errors = [];
    
    if (!this.name) errors.push('Name is required');
    if (!this.description) errors.push('Description is required');
    
    // Check if location is valid
    if (!this.location) {
        errors.push('Location is required');
    } else if (typeof this.location === 'object' && this.location.type === 'Point') {
        // Validate GeoJSON Point
        if (!this.location.coordinates || this.location.coordinates.length !== 2) {
            errors.push('Valid location coordinates are required');
        }
    }
    
    return errors;
};

// Ensure the model is only created once
const Camera = mongoose.models.Camera || mongoose.model('Camera', cameraSchema);

export default Camera; 