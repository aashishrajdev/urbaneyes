# UrbanEye - Camera Management System

A simple web application for managing surveillance cameras across a city.

## Features

- Add cameras with details (name, description, resolution, vision range, status)
- Select camera location on a map
- View all cameras on a dashboard with a map
- Simple and intuitive user interface

## Getting Started

### Prerequisites

- nextjs
- MongoDB (local or remote)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/urbaneye.git
   cd urbaneye
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Download Leaflet assets:
   ```
   npm run download-assets
   ```

4. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/urbaneye
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Add a Camera**:
   - Click on "Add Camera" in the navigation bar
   - Fill in the camera details
   - Click on the map to select the camera location
   - Click "Add Camera" to save

2. **View Cameras**:
   - Go to the Dashboard to see all cameras
   - The map shows the location of all cameras
   - Click on a marker to see camera details

## Technologies Used

- Next.js
- React
- MongoDB
- Mongoose
- Leaflet
- Tailwind CSS

## License

This project is licensed under the MIT License - see the LICENSE file for details.
