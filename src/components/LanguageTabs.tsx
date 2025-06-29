import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

interface CodeExample {
  language: string;
  label: string;
  code: string;
}

interface LanguageTabsProps {
  examples: CodeExample[];
  title?: string;
}

const LanguageTabs: React.FC<LanguageTabsProps> = ({ examples, title }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {examples.map((example, index) => (
          <button
            key={example.language}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {example.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={examples[activeTab].code}
        language={examples[activeTab].language}
        title={title}
      />
    </div>
  );
};

export default LanguageTabs;