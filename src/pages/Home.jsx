import { Link } from 'react-router-dom';
import { getCategories } from '../utils/componentLoader';

export default function Home() {
  const categories = getCategories();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Tailwind CSS Components
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Drop-in components for your Tailwind projects
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="group bg-white p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-gray-500 group-hover:text-blue-600">
                {category.icon}
              </div>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                {category.name}
              </h3>
            </div>
            <div className="text-xs text-gray-500">
              {category.count} components
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}