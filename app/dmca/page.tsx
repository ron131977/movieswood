import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: `DMCA Policy | ${SITE_NAME}`,
  description: `Read the DMCA policy for ${SITE_NAME}.`,
  openGraph: {
    title: `DMCA Policy | ${SITE_NAME}`,
    description: `Read the DMCA policy for ${SITE_NAME}.`,
    url: `${SITE_URL}/dmca`,
    siteName: SITE_NAME,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/dmca`,
  },
};

export default function DMCAPage() {
  const lastUpdated = "March 21, 2025";

  return (
    <div className="container py-12 text-center">
      <h1 className="text-5xl font-extrabold mb-4">DMCA Policy</h1>
      <p className="text-lg text-muted-foreground mb-8 font-semibold">Last Updated: <strong>{lastUpdated}</strong></p>

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-left">
        <p className="lead text-center text-xl font-semibold">
          <strong>{SITE_NAME}</strong> respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act (DMCA).
        </p>

        <h2 className="text-3xl font-bold text-center mt-10">1. No Hosting of Content</h2>
        <p className="text-lg">{SITE_NAME} does not host, upload, or control any video content. All content displayed is sourced from publicly available third-party links.</p>

        <h2 className="text-3xl font-bold text-center mt-10">2. Copyright Infringement Notices</h2>
        <p className="text-lg">
          If you are a copyright owner or an authorized agent and believe that content available through our site infringes upon your copyrights,
          you may submit a DMCA takedown request by emailing us at <strong>[drtrailer2022@gmail.com]</strong> with the following details:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li><strong>Your full legal name</strong> and contact information (email and phone number).</li>
          <li><strong>A description</strong> of the copyrighted work you claim has been infringed.</li>
          <li><strong>The exact URL(s)</strong> of the allegedly infringing content.</li>
          <li>A statement that you have a <strong>good faith belief</strong> that the use of the material is unauthorized.</li>
          <li>A statement, under <strong>penalty of perjury</strong>, that your notice is accurate and you are the copyright owner or authorized to act on behalf.</li>
          <li>Your <strong>electronic or physical signature</strong>.</li>
        </ul>

        <h2 className="text-3xl font-bold text-center mt-10">3. Counter-Notification</h2>
        <p className="text-lg">
          If you believe that your content was removed in error or misidentified, you may submit a counter-notification including:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li><strong>Your name, address, and contact details.</strong></li>
          <li><strong>The specific URL</strong> or content removed.</li>
          <li>A statement that you have a <strong>good faith belief</strong> the content was removed due to a mistake.</li>
          <li>Your consent to the jurisdiction of relevant legal authority.</li>
          <li>Your <strong>electronic or physical signature</strong>.</li>
        </ul>

        <h2 className="text-3xl font-bold text-center mt-10">4. Contact Us</h2>
        <p className="text-lg text-center">If you have any questions about this DMCA Policy, please contact us at <strong>drtrailer2022@gmail.com</strong>.</p>
      </div>
    </div>
  );
}
