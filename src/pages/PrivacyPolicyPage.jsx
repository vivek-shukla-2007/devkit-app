export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 text-gray-700 dark:text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Privacy Policy</h1>
      <div className="space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-lg leading-relaxed">
          Effective Date: [Insert Date]
        </p>
        <p className="text-lg leading-relaxed">
          Welcome to DevGearHub! This Privacy Policy explains how we handle your information when you use our website and services.
        </p>
        {/* TODO: Add detailed privacy policy content here */}
        <p className="text-lg leading-relaxed mt-4">Please check back periodically for updates to this policy.</p>
      </div>
    </div>
  );
}