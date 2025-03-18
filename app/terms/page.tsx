"use client";

import { useEffect, Suspense } from 'react';
import { Separator } from "@/components/ui/separator";
import Script from "next/script";

function TermsContent() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).analytics) {
      (window as any).analytics.track("PageView");
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="text-muted-foreground mb-6 text-lg">Last updated: March 8, 2025</p>
      
      <div className="prose dark:prose-invert max-w-none text-left mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          Please read these <strong>Terms of Service</strong> carefully before using the MovieWoods website (the "Service")
          operated by MovieWoods ("us", "we", or "our").
        </p>
        <p>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
          These Terms apply to all visitors, users, and others who access or use the Service.
        </p>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Content Ownership</h2>
        <p>
          All movies, trailers, and related content displayed on MovieWoods are the property of their respective owners.
          Any unauthorized use, reproduction, or distribution of content without prior permission is prohibited.
        </p>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
        <p>
          By creating an account with us, you agree to provide accurate and complete information.
          You are responsible for maintaining the security of your account and password.
        </p>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
        <p>
          Our Service may contain links to third-party websites that are not owned or controlled by MovieWoods.
          We are not responsible for the content or practices of any third-party site.
        </p>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Account Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account without prior notice if you violate these Terms.
        </p>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these Terms at any time. Continued use of the Service constitutes acceptance of the revised Terms.
        </p>
      </div>
    </div>
  );
}

export default function TermsOfServicePage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <Script src="/script.js" />
      <TermsContent />
    </Suspense>
  );
}
