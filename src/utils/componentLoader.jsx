// Icons for categories
const icons = {
  alerts: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  badges: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  )
};

// Component metadata
const componentMeta = {
  alerts: {
    SimpleAlert: {
      name: "Simple Alert",
      code: `<div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
  <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
</div>`
    },
    WarningAlert: {
      name: "Warning Alert",
      code: `<div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
  <span className="font-medium">Warning alert!</span> Please check your input and try again.
</div>`
    }
  },
  badges: {
    SimpleBadge: {
      name: "Simple Badge",
      code: `<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
  Default
</span>`
    },
    PillBadge: {
      name: "Pill Badge",
      code: `<span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
  Pill Badge
</span>`
    }
  }
};

// Explicit imports for Vite compatibility
const componentImports = {
  alerts: {
    SimpleAlert: () => import("../components/alerts/SimpleAlert.jsx"),
    WarningAlert: () => import("../components/alerts/WarningAlert.jsx")
  },
  badges: {
    SimpleBadge: () => import("../components/badges/SimpleBadge.jsx"),
    PillBadge: () => import("../components/badges/PillBadge.jsx")
  }
};

// Load all components for a category
const loadComponents = async (category) => {
  const components = [];
  const meta = componentMeta[category];

  if (!meta || !componentImports[category]) return [];

  for (const [key, value] of Object.entries(meta)) {
    try {
      const Component = (await componentImports[category][key]()).default;
      components.push({
        name: value.name,
        component: Component,
        code: value.code
      });
    } catch (error) {
      console.warn(`Failed to load component: ${category}/${key}`, error);
    }
  }

  return components;
};

// Get all categories with their metadata
const getCategories = () => {
  return Object.entries(componentMeta).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    path: `/${key}`,
    count: Object.keys(value).length,
    icon: icons[key]
  }));
};

export { loadComponents, getCategories };
