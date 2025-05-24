export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

      <h2 className="text-2xl font-semibold mt-8">1. Data Collection</h2>
      <p>
        DevGearHub <strong>does not store</strong> your:
      </p>
      <ul className="list-disc pl-6">
        <li>Input data (JSON, text, etc.)</li>
        <li>IP addresses (beyond basic analytics)</li>
        <li>Personal information</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">2. Third-Party Services</h2>
      <p>
        We use:
      </p>
      <ul className="list-disc pl-6">
        <li><strong>Google Analytics</strong>: Basic traffic metrics</li>
        <li><strong>AdSense</strong>: Non-personalized ads</li>
        <li><strong>Netlify</strong>: Hosting and DNS</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">3. Cookies</h2>
      <p>
        Only essential cookies are used for:
      </p>
      <ul className="list-disc pl-6">
        <li>Dark mode preference</li>
        <li>Ad serving (via Google)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">4. Children's Privacy</h2>
      <p>
        Our Service is not directed at children under 13.
      </p>

      <h2 className="text-2xl font-semibold mt-8">5. Contact</h2>
      <p>
        Questions? Email <a href="mailto:privacy@devgearhub.com" className="text-purple-600">privacy@devgearhub.com</a>.
      </p>
    </div>
  );
}