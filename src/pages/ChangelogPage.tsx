import React from 'react';
import { FileText, Plus, Wrench, AlertTriangle, Zap } from 'lucide-react';

const ChangelogPage: React.FC = () => {
  const releases = [
    {
      version: 'v2.1.0',
      date: '2023-12-07',
      type: 'minor',
      changes: [
        {
          type: 'added',
          title: 'Enhanced Vehicle Diagnostics',
          description: 'Added new diagnostic endpoints for engine health, transmission status, and predictive maintenance alerts.',
          endpoints: ['/v1/vehicles/{id}/diagnostics/engine', '/v1/vehicles/{id}/diagnostics/transmission']
        },
        {
          type: 'added',
          title: 'Batch Vehicle Operations',
          description: 'New batch endpoints allow you to perform operations on multiple vehicles simultaneously.',
          endpoints: ['/v1/vehicles/batch/lock', '/v1/vehicles/batch/unlock', '/v1/vehicles/batch/status']
        },
        {
          type: 'improved',
          title: 'Webhook Reliability',
          description: 'Improved webhook delivery reliability with enhanced retry mechanisms and better error handling.',
          details: 'Webhooks now include delivery attempt metadata and support exponential backoff retry strategies.'
        },
        {
          type: 'improved',
          title: 'Rate Limiting Headers',
          description: 'Added comprehensive rate limiting headers to all API responses for better client-side rate management.',
          details: 'New headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-RateLimit-Retry-After'
        }
      ]
    },
    {
      version: 'v2.0.1',
      date: '2023-11-28',
      type: 'patch',
      changes: [
        {
          type: 'fixed',
          title: 'Location Accuracy Improvements',
          description: 'Fixed issues with location accuracy in urban areas with poor GPS signal.',
          details: 'Improved location triangulation algorithms and added fallback to cellular tower positioning.'
        },
        {
          type: 'fixed',
          title: 'Webhook Signature Validation',
          description: 'Resolved webhook signature validation issues affecting some client implementations.',
          details: 'Updated HMAC signature generation to be consistent across all webhook events.'
        },
        {
          type: 'improved',
          title: 'Error Response Format',
          description: 'Standardized error response format across all endpoints for better consistency.',
          details: 'All error responses now include error_code, message, and details fields.'
        }
      ]
    },
    {
      version: 'v2.0.0',
      date: '2023-11-15',
      type: 'major',
      changes: [
        {
          type: 'breaking',
          title: 'API Version 2.0 Release',
          description: 'Major version release with breaking changes and new features.',
          details: 'This release includes significant improvements to performance, security, and functionality.'
        },
        {
          type: 'breaking',
          title: 'Authentication Changes',
          description: 'Updated OAuth 2.0 implementation with new scopes and token format.',
          details: 'Existing tokens will continue to work until January 15, 2024. Please update your applications to use the new authentication flow.'
        },
        {
          type: 'added',
          title: 'Electric Vehicle Support',
          description: 'Full support for electric and hybrid vehicles with battery management endpoints.',
          endpoints: ['/v1/vehicles/{id}/battery', '/v1/vehicles/{id}/charging']
        },
        {
          type: 'added',
          title: 'Advanced Vehicle Control',
          description: 'New remote control capabilities including climate control, seat heating, and charging management.',
          endpoints: ['/v1/vehicles/{id}/climate', '/v1/vehicles/{id}/charging/start', '/v1/vehicles/{id}/charging/stop']
        },
        {
          type: 'improved',
          title: 'Performance Optimizations',
          description: 'Significant performance improvements with 40% faster response times and reduced latency.',
          details: 'Optimized database queries, improved caching strategies, and enhanced CDN distribution.'
        },
        {
          type: 'deprecated',
          title: 'Legacy Endpoints',
          description: 'Several v1 endpoints have been deprecated and will be removed in v3.0.',
          details: 'Deprecated endpoints: /v1/vehicles/{id}/info (use /v1/vehicles/{id}), /v1/vehicles/{id}/position (use /v1/vehicles/{id}/location)'
        }
      ]
    },
    {
      version: 'v1.8.2',
      date: '2023-10-20',
      type: 'patch',
      changes: [
        {
          type: 'fixed',
          title: 'Fuel Level Calculation',
          description: 'Fixed fuel level percentage calculation for certain vehicle models.',
          details: 'Affected models: Jeep Wrangler 2023, Ram 1500 2022-2023, Chrysler Pacifica 2023'
        },
        {
          type: 'improved',
          title: 'SDK Documentation',
          description: 'Updated SDK documentation with more comprehensive examples and troubleshooting guides.',
          details: 'Added examples for error handling, rate limiting, and webhook implementation.'
        }
      ]
    },
    {
      version: 'v1.8.1',
      date: '2023-10-05',
      type: 'patch',
      changes: [
        {
          type: 'fixed',
          title: 'Webhook Delivery Issues',
          description: 'Resolved intermittent webhook delivery failures during high traffic periods.',
          details: 'Improved webhook queue processing and added additional monitoring.'
        },
        {
          type: 'fixed',
          title: 'Rate Limiting Edge Cases',
          description: 'Fixed rate limiting calculation errors for burst traffic patterns.',
          details: 'Updated sliding window algorithm to handle traffic spikes more accurately.'
        }
      ]
    },
    {
      version: 'v1.8.0',
      date: '2023-09-18',
      type: 'minor',
      changes: [
        {
          type: 'added',
          title: 'Trip History API',
          description: 'New endpoints to access historical trip data and analytics.',
          endpoints: ['/v1/vehicles/{id}/trips', '/v1/vehicles/{id}/trips/{trip_id}']
        },
        {
          type: 'added',
          title: 'Geofencing Support',
          description: 'Added geofencing capabilities with entry/exit notifications.',
          endpoints: ['/v1/vehicles/{id}/geofences', '/v1/geofences']
        },
        {
          type: 'improved',
          title: 'Location Precision',
          description: 'Enhanced location accuracy with improved GPS processing algorithms.',
          details: 'Location accuracy improved from ±10m to ±5m in optimal conditions.'
        }
      ]
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'added':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'improved':
        return <Zap className="h-4 w-4 text-blue-600" />;
      case 'fixed':
        return <Wrench className="h-4 w-4 text-orange-600" />;
      case 'breaking':
      case 'deprecated':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200';
      case 'improved':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200';
      case 'fixed':
        return 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-200';
      case 'breaking':
      case 'deprecated':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-200';
    }
  };

  const getVersionColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800';
      case 'minor':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800';
      case 'patch':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-200 dark:border-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          API Changelog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Stay up to date with the latest changes, improvements, and new features 
          in the Stellantis Connected Vehicles API. We follow semantic versioning 
          and provide detailed migration guides for breaking changes.
        </p>
      </div>

      {/* Version Legend */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Version Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 rounded border bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800 font-medium">
              Major
            </span>
            <span className="text-gray-600 dark:text-gray-300">Breaking changes, new features</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 rounded border bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800 font-medium">
              Minor
            </span>
            <span className="text-gray-600 dark:text-gray-300">New features, backward compatible</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 rounded border bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800 font-medium">
              Patch
            </span>
            <span className="text-gray-600 dark:text-gray-300">Bug fixes, improvements</span>
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="space-y-8">
        {releases.map((release, releaseIndex) => (
          <div
            key={releaseIndex}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Release Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {release.version}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getVersionColor(release.type)}`}>
                    {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  {formatDate(release.date)}
                </span>
              </div>
            </div>

            {/* Changes */}
            <div className="p-6 space-y-6">
              {release.changes.map((change, changeIndex) => (
                <div key={changeIndex} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getChangeColor(change.type)}`}>
                      {getChangeIcon(change.type)}
                      <span className="capitalize">{change.type}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {change.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {change.description}
                      </p>
                    </div>
                  </div>

                  {change.details && (
                    <div className="ml-6 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {change.details}
                      </p>
                    </div>
                  )}

                  {change.endpoints && (
                    <div className="ml-6 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        New Endpoints:
                      </h4>
                      <div className="space-y-1">
                        {change.endpoints.map((endpoint, endpointIndex) => (
                          <code
                            key={endpointIndex}
                            className="block text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                          >
                            {endpoint}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Migration Guides */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Migration Guides
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For major version releases with breaking changes, we provide comprehensive 
              migration guides to help you update your applications smoothly.
            </p>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
              >
                → Migration Guide: v1.x to v2.0
              </a>
              <a
                href="#"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
              >
                → Breaking Changes in v2.0
              </a>
              <a
                href="#"
                className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
              >
                → Deprecated Features Timeline
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Subscribe to our changelog to receive notifications about new releases, 
          breaking changes, and important updates to the API.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Subscribe to Updates
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            RSS Feed
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChangelogPage;