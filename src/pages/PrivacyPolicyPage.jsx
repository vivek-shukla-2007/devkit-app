export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p><em>Last Updated: November 17, 2023</em></p> {/* Or your actual last update date */}

      <h2 className="text-2xl font-semibold mt-8">1. Data Collection</h2>
      <p>
        DevGearHub operates on a <strong>zero-data-retention</strong> principle:
      </p>
      <ul className="list-disc pl-6">
        <li>All tool processing happens in your browser</li>
        <li>We never store your input/output data</li>
        <li>No account registration required</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">2. Cookies & Tracking</h2>
      <p>
        We use only these cookies when you consent:
      </p>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Purpose</th>
            <th className="text-left p-2">Provider</th>
            <th className="text-left p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Essential Functionality</td>
            <td className="p-2">DevGearHub</td>
            <td className="p-2">Dark mode preference</td>
          </tr>
          <tr className="border-b">
            <td className="p-2">Analytics</td>
            <td className="p-2">Google Analytics</td>
            <td className="p-2">Anonymous usage stats</td>
          </tr>
          <tr>
            <td className="p-2">Advertising</td>
            <td className="p-2">Google AdSense</td>
            <td className="p-2">Non-personalized ads</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mt-8">3. Third-Party Services</h2>
      <ul className="list-disc pl-6">
        <li>
          <strong>Google Analytics</strong>: Measures traffic with anonymized IPs (<a 
            href="https://policies.google.com/privacy" 
            className="text-purple-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >Privacy Policy</a>)
        </li>
        <li>
          <strong>Google AdSense</strong>: Shows non-personalized ads (<a 
            href="https://support.google.com/adsense/answer/9007336" 
            className="text-purple-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >How ads are personalized</a>)
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">4. Your Rights</h2>
      <p>
        Under GDPR/CCPA, you can:
      </p>
      <ul className="list-disc pl-6">
        <li>Withdraw cookie consent anytime (clear site data)</li>
        <li>Request deletion of analytics data</li>
        <li>Opt out of AdSense personalization</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">5. Contact</h2>
      <p>
        For privacy requests: <br />
        <a 
          href="mailto:privacy@devgearhub.com" 
          className="text-purple-600 hover:underline"
        >
          privacy@devgearhub.com
        </a>
      </p>
    </div>
  );
}