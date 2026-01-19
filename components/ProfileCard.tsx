interface ProfileCardProps {
  title: string;
  description: string;
  tools: Array<{
    name: string;
    description: string;
    bestUse: string;
    notFor: string;
    pricing: 'Free' | 'Paid' | 'Freemium';
    link: string;
  }>;
}

export default function ProfileCard({ title, description, tools }: ProfileCardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tool.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  tool.pricing === 'Free'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : tool.pricing === 'Paid'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
              >
                {tool.pricing}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {tool.description}
            </p>
            <div className="space-y-2 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Best for:
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tool.bestUse}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Not ideal for:
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tool.notFor}
                </p>
              </div>
            </div>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try it out
              <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}