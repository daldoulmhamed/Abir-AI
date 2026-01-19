import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b-2 border-gray-100 dark:border-gray-700 shadow-md">
      <div className="flex justify-center">
        <div className="flex gap-12">
          <Link
            href="/learn"
            className="px-8 py-5 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 border-b-4 border-transparent hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700/50"
          >
            Learn
          </Link>
          <Link
            href="/tutorials"
            className="px-8 py-5 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 border-b-4 border-transparent hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700/50"
          >
            Tutorials
          </Link>
          <Link
            href="/news"
            className="px-8 py-5 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 border-b-4 border-transparent hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700/50"
          >
            News
          </Link>
        </div>
      </div>
    </nav>
  );
}
