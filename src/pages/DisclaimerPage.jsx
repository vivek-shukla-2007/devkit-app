export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 text-gray-700 dark:text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Disclaimer</h1>
      <div className="space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-lg leading-relaxed">
          Last Updated: [Insert Date]
        </p>
        <p className="text-lg leading-relaxed">
          The information provided by DevGearHub ("we," "us," or "our") on devgearhub.com (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
        </p>
        {/* TODO: Add detailed disclaimer content here, especially regarding the tools' outputs */}
        <p className="text-lg leading-relaxed mt-4">Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
      </div>
    </div>
  );
}