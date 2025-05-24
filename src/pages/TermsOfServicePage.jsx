export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 text-gray-700 dark:text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Terms of Service</h1>
      <div className="space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-lg leading-relaxed">
          Last Updated: [Insert Date]
        </p>
        <p className="text-lg leading-relaxed">
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the DevGearHub website (the "Service") operated by us.
        </p>
        {/* TODO: Add detailed terms of service content here */}
        <p className="text-lg leading-relaxed mt-4">Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms.</p>
      </div>
    </div>
  );
}