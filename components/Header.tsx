import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Abir-AI Logo"
                  width={400}
                  height={134}
                  className="h-16 md:h-32 w-auto"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                href="/learn"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Learn
              </Link>
              <Link
                href="/tutorials"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Tutorials
              </Link>
              <Link
                href="/news"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-1 pt-1 border-b-2 text-sm font-medium"
              >
                News
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}