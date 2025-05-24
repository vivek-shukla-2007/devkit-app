export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

      <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
      <p>
        By using DevGearHub ("Service"), you agree to these Terms. If you disagree, please refrain from using our tools.
      </p>

      <h2 className="text-2xl font-semibold mt-8">2. Service Description</h2>
      <p>
        DevGearHub provides browser-based developer tools including but not limited to:
      </p>
      <ul className="list-disc pl-6">
        <li>JSON formatting and validation</li>
        <li>Cron expression generation</li>
        <li>Base64 encoding/decoding</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">3. User Responsibilities</h2>
      <p>
        You agree not to:
      </p>
      <ul className="list-disc pl-6">
        <li>Use the Service for illegal purposes</li>
        <li>Overload our infrastructure with automated requests</li>
        <li>Reverse engineer or copy the tools</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">4. Disclaimer</h2>
      <p>
        THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES. WE ARE NOT LIABLE FOR TOOL OUTPUT ACCURACY.
      </p>

      <h2 className="text-2xl font-semibold mt-8">5. Changes to Terms</h2>
      <p>
        We may update these Terms. Continued use constitutes acceptance.
      </p>
    </div>
  );
}