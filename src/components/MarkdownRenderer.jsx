import React, { useMemo } from 'react'; // 1. Import useMemo
import MarkdownIt from 'markdown-it'; // 1. Import MarkdownIt
import DOMPurify from 'dompurify'; // Import DOMPurify
import PropTypes from 'prop-types'; // Import PropTypes

function MarkdownRenderer({ markdownContent, options }) { // Add options prop
  if (!markdownContent) {
    return null;
  }

  // 2. Memoize the MarkdownIt instance based on the options prop
  const md = useMemo(() => {
    return new MarkdownIt(options);
  }, [options]); // Re-create md instance if options change

  // 3. Use useMemo to only re-calculate htmlContent when markdownContent or md instance changes
  const htmlContent = useMemo(() => {
    const rawHtml = md.render(markdownContent);
    return DOMPurify.sanitize(rawHtml); // Sanitize the HTML output
    // return rawHtml; // UNSAFE - FOR DEBUGGING ONLY
  }, [md, markdownContent]); // Dependency array: re-run if md instance or markdownContent changes

  // 4. Render the HTML.
  // Note: dangerouslySetInnerHTML is used because you're injecting HTML.
  // Ensure your markdownContent is from a trusted source or sanitized.
  return (
    <div
      className="prose dark:prose-invert max-w-none" // Apply Tailwind typography styles
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

// Define prop types for the component
MarkdownRenderer.propTypes = {
  markdownContent: PropTypes.string.isRequired,
  options: PropTypes.object, // Options for MarkdownIt constructor
};

// Define default props for the component
MarkdownRenderer.defaultProps = {
  options: {}, // Default to an empty object for MarkdownIt options
};

export default MarkdownRenderer;''