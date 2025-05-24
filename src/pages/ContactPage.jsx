export default function ContactPage() {
  const googleFormUrl = "YOUR_GOOGLE_FORM_LINK_HERE"; // Replace with your actual Google Form link

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 text-gray-700 dark:text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Contact DevGearHub</h1>

      <div className="space-y-8 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Get in Touch</h2>
          <p className="text-lg leading-relaxed">
            We value your feedback and suggestions! Whether you've found a bug, have an idea for a new tool, or just want to share your thoughts, please use our feedback form.
          </p>
          <p className="text-lg leading-relaxed mt-2">
            This is the primary way to help us improve DevGearHub and ensure it meets the needs of the developer community.
          </p>
          <div className="mt-6 text-center">
            <a 
              href={googleFormUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg shadow-md transition-colors duration-200"
            >
              <i className="fas fa-paper-plane mr-2"></i> Submit Feedback / Suggestion
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">What to Include</h2>
          <p className="text-lg leading-relaxed">
            To help us understand your feedback better, please consider including:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1 my-2 text-gray-600 dark:text-gray-400">
            <li>A clear description of your suggestion or the issue.</li>
            <li>If reporting a bug: steps to reproduce it, what you expected, and what happened.</li>
            <li>The name of the tool you are referring to, if applicable.</li>
          </ul>
        </section>
        
        {/* Optional: If you still want a direct email for very specific cases */}
        {/*
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Other Inquiries</h2>
          <p className="text-lg leading-relaxed">
            For matters not suitable for the feedback form, such as partnership or specific non-tool-related questions, you can reach out via email.
          </p>
          <p className="mt-3">
            <a 
              href="mailto:youremail@devgearhub.com" // Replace with your actual contact email
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium text-lg"
            >
              <i className="fas fa-envelope mr-2"></i> youremail@devgearhub.com 
            </a>
          </p>
        </section>
        */}

        <p className="text-center text-gray-500 dark:text-gray-400 pt-6 text-sm">
          Thank you for helping us build a better DevKit for everyone!
        </p>
      </div>
    </div>
  );
}