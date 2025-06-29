import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Zap, Shield, BookOpen, Webhook, Package, Lightbulb, Activity, FileText, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/quickstart', label: 'Quick Start', icon: Zap },
  { path: '/authentication', label: 'Authentication', icon: Shield },
  { path: '/api-reference', label: 'API Reference', icon: BookOpen },
  { path: '/webhooks', label: 'Webhooks', icon: Webhook },
  { path: '/sdks', label: 'SDKs & Libraries', icon: Package },
  { path: '/best-practices', label: 'Best Practices', icon: Lightbulb },
  { path: '/status', label: 'API Status', icon: Activity },
  { path: '/changelog', label: 'Changelog', icon: FileText },
  { path: '/support', label: 'Support', icon: HelpCircle },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;