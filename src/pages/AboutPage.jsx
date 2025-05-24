export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 text-gray-700 dark:text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">About DevGearHub</h1>
      
      <div className="space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            DevGearHub aims to be your go-to resource for <strong>essential, free, and no-login developer tools</strong>. We believe that common coding utilities should be readily accessible, performant, and respect your privacy.
            This project was born out of a desire for straightforward, reliable online tools without the usual clutter, tracking, or paywalls.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Core Values & Principles</h2>
          <ul className="list-disc list-inside pl-4 space-y-3 text-lg">
            <li>
              <strong>Privacy First:</strong> All tools are designed to run entirely in your browser. Your data is never sent to our servers. What you do on DevGearHub stays with you.
            </li>
            <li>
              <strong>Speed & Efficiency:</strong> We strive for instant results and a bloat-free experience. Get your tasks done quickly with clean, intuitive interfaces.
            </li>
            <li>
              <strong>Always Free & Accessible:</strong> Developer utilities should be available to everyone. DevGearHub is committed to being 100% free, with no paywalls or restrictive sign-ups.
            </li>
            <li>
              <strong>Community Driven & Open Source:</strong> We believe in the power of open collaboration. The entire project is open-source, and we welcome contributions and feedback.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">The Technology Stack</h2>
          <p className="text-lg leading-relaxed">
            DevGearHub is proudly built with modern web technologies including <strong className="text-gray-800 dark:text-white">React</strong> for a dynamic user interface, <strong className="text-gray-800 dark:text-white">Vite</strong> for a blazing-fast development experience, and <strong className="text-gray-800 dark:text-white">Tailwind CSS</strong> for utility-first styling. The site is hosted on <strong className="text-gray-800 dark:text-white">Netlify</strong>, ensuring high availability and performance.
          </p>
          <p className="text-lg mt-3 leading-relaxed">
            The project is fully open-source, reflecting our commitment to transparency and community collaboration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Feedback & Contributions</h2>
          <p className="text-lg leading-relaxed">
            Your feedback is invaluable in making DevGearHub better! If you have ideas for new tools, suggestions for improvements, or encounter any bugs, we'd love to hear from you. We also welcome contributions from the community. Please see our Contact page for ways to get in touch.
          </p>
        </section>

        <p className="text-center text-gray-500 dark:text-gray-400 pt-6 text-sm">
          Thank you for using DevGearHub!
        </p>
      </div>
    </div>
  );
}