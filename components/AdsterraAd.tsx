// import Script from "next/script";

// export default function AdsterraAd() {
//   return (
//     <div className="flex justify-center items-center my-4">
//       <Script
//         id="adsterra-script"
//         strategy="lazyOnload"
//         dangerouslySetInnerHTML={{
//           __html: `
//             atOptions = {
//               'key': '625813660775a93f63cf9a07748500a8',
//               'format': 'iframe',
//               'height': 250,
//               'width': 300,
//               'params': {}
//             };
//           `,
//         }}
//       />
//       <Script
//         id="adsterra-invoke"
//         strategy="lazyOnload"
//         src="//www.highperformanceformat.com/625813660775a93f63cf9a07748500a8/invoke.js"
//       />
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";

// export default function AdsterraPopup() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Show popup after 3 seconds
//     const timer = setTimeout(() => setIsVisible(true), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       // Remove any existing Adsterra script to avoid duplicate ads
//       document.querySelectorAll(".adsterra-script").forEach((el) => el.remove());

//       // Dynamically add Adsterra script inside the popup
//       const script = document.createElement("script");
//       script.className = "adsterra-script";
//       script.type = "text/javascript";
//       script.innerHTML = `
//         atOptions = {
//           'key': '625813660775a93f63cf9a07748500a8',
//           'format': 'iframe',
//           'height': 250,
//           'width': 300,
//           'params': {}
//         };
//       `;
//       document.body.appendChild(script);

//       // Load Adsterra ad
//       const invokeScript = document.createElement("script");
//       invokeScript.className = "adsterra-script";
//       invokeScript.src = "//www.highperformanceformat.com/625813660775a93f63cf9a07748500a8/invoke.js";
//       invokeScript.async = true;
//       document.getElementById("adsterra-container")?.appendChild(invokeScript);
//     }
//   }, [isVisible]);

//   return (
//     <>
//       {isVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="relative w-[90%] max-w-[350px] p-4 bg-white rounded-lg shadow-lg">
//             {/* Close Button */}
//             <button
//               onClick={() => setIsVisible(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg font-bold"
//             >
//               ✕
//             </button>

//             {/* Adsterra Ad Container */}
//             <div id="adsterra-container" className="w-[300px] h-[250px] mx-auto"></div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }







"use client";

import { useState, useEffect } from "react";

export default function AdsterraPopup() {
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   // Show popup 30 seconds after page load
  //   const timer = setTimeout(() => setIsVisible(true), 30000);
  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    // Show popup 30 seconds after page load
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Remove any existing Adsterra script to avoid duplicate ads
      document.querySelectorAll(".adsterra-script").forEach((el) => el.remove());

      // Dynamically add Adsterra script inside the popup
      const script = document.createElement("script");
      script.className = "adsterra-script";
      script.type = "text/javascript";
      script.innerHTML = `
        atOptions = {
          'key': '625813660775a93f63cf9a07748500a8',
          'format': 'iframe',
          'height': 250,
          'width': 300,
          'params': {}
        };
      `;
      document.body.appendChild(script);

      // Load Adsterra ad
      const invokeScript = document.createElement("script");
      invokeScript.className = "adsterra-script";
      invokeScript.src = "//www.highperformanceformat.com/625813660775a93f63cf9a07748500a8/invoke.js";
      invokeScript.async = true;
      document.getElementById("adsterra-container")?.appendChild(invokeScript);
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-[90%] max-w-[350px] p-4 bg-white rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>

            {/* Adsterra Ad Container */}
            <div id="adsterra-container" className="w-[300px] h-[250px] mx-auto"></div>
          </div>
        </div>
      )}
    </>
  );
}
