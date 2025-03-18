"use client";

import { useEffect, Suspense } from 'react';
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Script from "next/script";

function PrivacyContent() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).analytics) {
      (window as any).analytics.track("PageView");
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground mb-6 font-semibold">Last updated: March 8, 2025</p>

      <div className="prose dark:prose-invert max-w-none text-left mx-auto">
        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          At <strong>MovieWoods</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website.
        </p>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p>We collect information that you provide directly to us when you:</p>
        <ul className="list-disc pl-6">
          <li>Create an account</li>
          <li>Subscribe to our newsletter</li>
          <li>Contact us</li>
          <li>Participate in surveys or promotions</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Automatically Collected Information</h3>
        <p>When you use our website, we may collect information such as:</p>
        <ul className="list-disc pl-6">
          <li>IP address, browser type, and pages viewed</li>
          <li>Device information, including hardware and OS</li>
          <li>Location data</li>
          <li>Cookies and tracking technologies</li>
        </ul>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p>We use the information collected to:</p>
        <ul className="list-disc pl-6">
          <li>Enhance user experience and improve our services</li>
          <li>Provide recommendations and personalized content</li>
          <li>Communicate updates, offers, and promotions</li>
          <li>Ensure security and prevent fraudulent activities</li>
        </ul>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Sharing of Information</h2>
        <p>We may share your information in the following cases:</p>
        <ul className="list-disc pl-6">
          <li>With service providers for operational purposes</li>
          <li>When required by law or government authorities</li>
          <li>During business transfers such as mergers or acquisitions</li>
        </ul>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
        <p>You have control over your information and can:</p>
        <ul className="list-disc pl-6">
          <li><strong>Update Account Information:</strong> Modify your details through your account settings.</li>
          <li><strong>Manage Cookies:</strong> Adjust your browser settings to control cookie usage.</li>
          <li><strong>Unsubscribe:</strong> Opt out of promotional communications at any time.</li>
        </ul>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>If you have any questions regarding our Privacy Policy, please reach out to us at:</p>
        <p className="font-semibold">
          <strong>MovieWoods</strong>
          <br />
          Email: <a href="mailto:drtrailer2022@gmail.com" className="text-blue-500">drtrailer2022@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <Script src="/script.js" />
      <PrivacyContent />
    </Suspense>
  );
}