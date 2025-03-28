// "use client"
// import { useEffect } from "react";

// export default function AdComponent() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.async = true;
//     script.dataset.cfasync = "false";
//     script.src =
//       "//pl26236144.effectiveratecpm.com/6fab7bc17f42806b98780171964972d5/invoke.js";
//     document
//       .getElementById("ad-container")
//       ?.appendChild(script);
//   }, []);

//   return (
//     <div id="ad-container" className="w-full flex justify-center my-4">
//       <div id="container-6fab7bc17f42806b98780171964972d5"></div>
//     </div>
//   );
// }


// "use client"

// import { useEffect, useRef } from "react"

// export default function AdComponent() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const scriptRef = useRef<HTMLScriptElement | null>(null)
//   const adContainerId = "container-6fab7bc17f42806b98780171964972d5"

//   const initializeAd = () => {
//     // Cleanup previous instances
//     if (scriptRef.current) {
//       scriptRef.current.remove()
//       scriptRef.current = null
//     }

//     // Create new container element
//     const container = document.createElement('div')
//     container.id = adContainerId

//     // Create new script element
//     const script = document.createElement('script')
//     script.async = true
//     script.dataset.cfasync = "false"
//     script.src = "//pl26236144.effectiveratecpm.com/6fab7bc17f42806b98780171964972d5/invoke.js"

//     // Store script reference
//     scriptRef.current = script

//     // Add to DOM
//     if (containerRef.current) {
//       containerRef.current.innerHTML = '' // Clear existing content
//       containerRef.current.appendChild(container)
//       containerRef.current.appendChild(script)
//     }
//   }

//   useEffect(() => {
//     // Initial load
//     initializeAd()

//     // Handle page visibility changes
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'visible') {
//         // Reinitialize after short delay
//         setTimeout(initializeAd, 1000)
//       }
//     }

//     document.addEventListener('visibilitychange', handleVisibilityChange)

//     // Cleanup function
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange)
//       if (scriptRef.current) {
//         scriptRef.current.remove()
//       }
//       if (containerRef.current) {
//         containerRef.current.innerHTML = ''
//       }
//     }
//   }, [])

//   return (
//     <div ref={containerRef} className="w-full flex justify-center my-4">
//       {/* Container will be populated by initializeAd */}
//     </div>
//   )
// }



// "use client";

// import { useEffect, useState } from "react";

// export default function PopupAd() {
//   const [showAd, setShowAd] = useState(false);

//   useEffect(() => {
//     // Show ad after 45 seconds
//     const timer = setTimeout(() => {
//       setShowAd(true);
//     }, 45000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Function to close ad
//   const closeAd = () => setShowAd(false);

//   if (!showAd) return null; // Don't render if ad is not ready

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//       <div className="relative w-full max-w-[95%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[728px] bg-white p-4 rounded-lg shadow-lg">
//         {/* Close Button */}
//         <button
//           onClick={closeAd}
//           className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-red-500 "
//         >
//           ❌
//         </button>

//         {/* Responsive Ad Container */}
//         <div className="w-full flex justify-center items-center">
//           <script
//             async
//             data-cfasync="false"
//             src="//pl26236144.effectiveratecpm.com/6fab7bc17f42806b98780171964972d5/invoke.js"
//           ></script>
//           <div
//             id="container-6fab7bc17f42806b98780171964972d5"
//             className="w-full h-auto min-h-[90px] sm:min-h-[150px] md:min-h-[250px]"
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { useEffect, useRef, useState } from "react"

export default function AdComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const adShownRef = useRef(false)
  const [showAd, setShowAd] = useState(false)
  const adContainerId = "container-6fab7bc17f42806b98780171964972d5"

  const initializeAd = () => {
    try {
      if (scriptRef.current?.parentNode) {
        scriptRef.current.remove()
      }
      scriptRef.current = null

      if (!containerRef.current) return
      containerRef.current.innerHTML = ''

      const container = document.createElement('div')
      container.id = adContainerId
      container.className = "min-w-[300px] min-h-[250px]"

      const script = document.createElement('script')
      script.async = true
      script.dataset.cfasync = "false"
      script.src = "https://pl26236144.effectiveratecpm.com/6fab7bc17f42806b98780171964972d5/invoke.js"
      script.dataset.testid = "ad-script"

      scriptRef.current = script

      containerRef.current.appendChild(container)
      containerRef.current.appendChild(script)

    } catch (error) {
      console.error("Ad initialization failed:", error)
    }
  }

  useEffect(() => {
    const startTimer = () => {
      timeoutRef.current = setTimeout(() => {
        adShownRef.current = true
        setShowAd(true)
      }, 45000)
    }

    startTimer()

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (timeoutRef.current && !adShownRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      } else {
        if (!adShownRef.current && !timeoutRef.current) {
          startTimer()
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (showAd) {
      initializeAd()

      return () => {
        if (scriptRef.current?.parentNode) {
          scriptRef.current.remove()
        }
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }
      }
    }
  }, [showAd])

  return (
    <>
      {showAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999]">
          {/* Close Button - Always on Top */}
          <button
            onClick={() => setShowAd(false)}
            className="absolute top-2 right-2 z-[1000000] bg-white text-black rounded-full p-2 text-xl shadow-lg hover:bg-red-500 hover:text-white"
            style={{ width: "40px", height: "40px" }}
          >
            ❌
          </button>

          <div 
            className="relative bg-white rounded-lg p-4 min-w-[300px] min-h-[250px] flex items-center justify-center z-[999999]"
            data-testid="ad-container"
          >
            <div ref={containerRef} className="text-gray-500">
              Loading advertisement...
            </div>
          </div>
        </div>
      )}
    </>
  )
}
