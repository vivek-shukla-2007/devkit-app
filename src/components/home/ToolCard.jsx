import React from 'react';

export default function ToolCard({ tool, onNavigate }) {
  // Guard against undefined tool prop to prevent errors
  if (!tool || !tool.id) {
    return null; // Or some placeholder/error UI
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(tool.id);
      }}
      className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
    >
      {/* Render the icon.
          Option 1 (Original): If tool.icon is a React element like <i className="..."></i>
          Option 2 (New): If tool.icon is a string of class names like "fas fa-code" */}
      <div className="mb-4">
        {typeof tool.icon === 'string' ? (
          <i className={tool.icon}></i>
        ) : (
          tool.icon /* This assumes tool.icon is a React element */
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{tool.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{tool.description}</p>
    </a>
  );
}