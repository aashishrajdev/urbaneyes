'use client';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About UrbanEyes</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              UrbanEyes is a comprehensive camera management system designed to enhance urban safety and monitoring through advanced surveillance technology. Our platform provides a centralized solution for managing, monitoring, and analyzing camera networks across cities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Real-time camera monitoring and management</li>
              <li>Interactive map interface for camera location visualization</li>
              <li>Secure user authentication and access control</li>
              <li>Camera status tracking and maintenance scheduling</li>
              <li>Comprehensive dashboard for system overview</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technology</h2>
            <p className="text-gray-700">
              Built with modern web technologies including Next.js, React, and MongoDB, UrbanEyes offers a robust and scalable solution for urban surveillance management. Our system is designed to be user-friendly while maintaining high security standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              For more information about UrbanEyes or to discuss implementation in your city, please contact our team at:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">Email: info@urbaneyes.com</p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 