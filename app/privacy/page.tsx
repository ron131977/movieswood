import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Read about how ${SITE_NAME} collects, uses, and protects your personal information.`,
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Read about how ${SITE_NAME} collects, uses, and protects your personal information.`,
    url: `${SITE_URL}/privacy`,
    siteName: SITE_NAME,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
}

export default function PrivacyPage() {
  const lastUpdated = "March 18, 2025"

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          At {SITE_NAME}, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect information about you in various ways when you use our website:</p>
        <ul>
          <li>
            <strong>Personal Data:</strong> While using our service, we may ask you to provide certain personally
            identifiable information that can be used to contact or identify you.
          </li>
          <li>
            <strong>Usage Data:</strong> We may also collect information on how the service is accessed and used. This
            may include information such as your computer's Internet Protocol address, browser type, browser version,
            the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and
            other diagnostic data.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to
            track activity on our service and hold certain information.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We may use the information we collect about you for various purposes:</p>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To allow you to participate in interactive features of our service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our service</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent, and address technical issues</li>
        </ul>

        <h2>Disclosure of Your Information</h2>
        <p>We may disclose your personal information in the following situations:</p>
        <ul>
          <li>
            <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a
            portion of our assets, your information may be transferred as part of that transaction.
          </li>
          <li>
            <strong>Disclosure for Law Enforcement:</strong> Under certain circumstances, we may be required to disclose
            your personal information if required to do so by law or in response to valid requests by public
            authorities.
          </li>
          <li>
            <strong>Other Legal Requirements:</strong> We may disclose your information to comply with a legal
            obligation, protect and defend our rights or property, prevent or investigate possible wrongdoing in
            connection with the service, protect the personal safety of users of the service or the public, or protect
            against legal liability.
          </li>
        </ul>

        <h2>Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information.
          While we have taken reasonable steps to secure the information you provide to us, please be aware that no
          security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against
          any interception or other type of misuse.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are advised to
          review this Privacy Policy periodically for any changes.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us through our Contact page.</p>
      </div>
    </div>
  )
}

