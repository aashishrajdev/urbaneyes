import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Prevent model compilation error in development due to hot reloading
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User; 