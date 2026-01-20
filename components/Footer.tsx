import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Abir-AI"
              width={400}
              height={134}
              className="h-16 md:h-32 w-auto mb-2"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Help people choose and use the best AI tools for their job in a simple, ethical, and accessible way.
              <br />
              <strong>Trust statements:</strong> Privacy focused, No tracking, Accessibility friendly.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  News
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/legal" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            &copy; 2026 Abir-AI. Built with ❤️ by DALDOUL M&apos;hamed. Contact: abir.ai.contact@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}