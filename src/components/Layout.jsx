// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Layout({ children }) {
//   const pathname = usePathname();

//   const isActive = (path) => {
//     if (path === "/") return pathname === path;
//     return pathname.startsWith(path);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="bg-blue-600 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <Link href="/" className="flex items-center">
//                 <h1 className="text-white text-2xl font-bold hover:text-blue-200 transition-colors">
//                   UrbanEyes
//                 </h1>
//               </Link>
//             </div>
//             <div className="flex space-x-4">
//               <Link
//                 href="/dashboard"
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive("/dashboard")
//                     ? "bg-blue-700 text-white"
//                     : "text-white hover:bg-blue-500"
//                 }`}
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 href="/add"
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive("/add")
//                     ? "bg-blue-700 text-white"
//                     : "text-white hover:bg-blue-500"
//                 }`}
//               >
//                 Add Camera
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="flex-1">{children}</main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-sm">
//             © {new Date().getFullYear()} UrbanEyes. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }
