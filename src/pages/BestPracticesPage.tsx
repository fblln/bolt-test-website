import React from 'react';
import { Lightbulb, Shield, Zap, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const BestPracticesPage: React.FC = () => {
  const practices = [
    {
      category: 'Authentication & Security',
      icon: Shield,
      color: 'blue',
      items: [
        {
          title: 'Secure Credential Storage',
          description: 'Store API credentials securely using environment variables or secure vaults',
          example: `// ✅ Good - Use environment variables
const client = new StellantisCVClient({
  clientId: process.env.STELLANTIS_CLIENT_ID,
  clientSecret: process.env.STELLANTIS_CLIENT_SECRET
});

// ❌ Bad - Hardcoded credentials
const client = new StellantisCVClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret'
});`,
          tips: [
            'Never commit credentials to version control',
            'Use different credentials for different environments',
            'Rotate credentials regularly',
            'Implement proper access controls'
          ]
        },
        {
          title: 'Token Management',
          description: 'Implement proper token caching and refresh mechanisms',
          example: `class TokenManager {
  constructor() {
    this.token = null;
    this.expiresAt = null;
  }

  async getValidToken() {
    if (this.token && this.expiresAt > Date.now()) {
      return this.token;
    }
    
    // Token expired or doesn't exist, refresh it
    await this.refreshToken();
    return this.token;
  }

  async refreshToken() {
    const response = await this.client.auth.getToken();
    this.token = response.access_token;
    this.expiresAt = Date.now() + (response.expires_in * 1000);
  }
}`,
          tips: [
            'Cache tokens until expiration',
            'Implement automatic refresh',
            'Handle token refresh failures gracefully',
            'Use secure storage for tokens'
          ]
        }
      ]
    },
    {
      category: 'Rate Limiting & Performance',
      icon: Zap,
      color: 'green',
      items: [
        {
          title: 'Respect Rate Limits',
          description: 'Implement proper rate limiting to avoid hitting API limits',
          example: `class RateLimitedClient {
  constructor() {
    this.requestQueue = [];
    this.isProcessing = false;
    this.lastRequestTime = 0;
    this.minInterval = 1000; // 1 second between requests
  }

  async makeRequest(requestFn) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.requestQueue.length > 0) {
      const timeSinceLastRequest = Date.now() - this.lastRequestTime;
      if (timeSinceLastRequest < this.minInterval) {
        await this.sleep(this.minInterval - timeSinceLastRequest);
      }

      const { requestFn, resolve, reject } = this.requestQueue.shift();
      
      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        if (error.status === 429) {
          // Rate limited, wait and retry
          const retryAfter = error.headers['retry-after'] * 1000;
          await this.sleep(retryAfter);
          this.requestQueue.unshift({ requestFn, resolve, reject });
        } else {
          reject(error);
        }
      }

      this.lastRequestTime = Date.now();
    }

    this.isProcessing = false;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}`,
          tips: [
            'Monitor rate limit headers',
            'Implement exponential backoff',
            'Queue requests when approaching limits',
            'Use batch operations when available'
          ]
        },
        {
          title: 'Efficient Data Fetching',
          description: 'Optimize API calls to minimize requests and improve performance',
          example: `// ✅ Good - Batch requests for multiple vehicles
const vehicleIds = ['id1', 'id2', 'id3'];
const vehicles = await Promise.all(
  vehicleIds.map(id => client.vehicles.get(id))
);

// ✅ Good - Use pagination efficiently
async function getAllVehicles() {
  const allVehicles = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await client.vehicles.list({ page, per_page: 50 });
    allVehicles.push(...response.vehicles);
    hasMore = response.vehicles.length === 50;
    page++;
  }

  return allVehicles;
}

// ❌ Bad - Making individual requests in a loop
for (const vehicleId of vehicleIds) {
  const vehicle = await client.vehicles.get(vehicleId);
  // Process vehicle
}`,
          tips: [
            'Use pagination for large datasets',
            'Batch requests when possible',
            'Cache frequently accessed data',
            'Use webhooks instead of polling'
          ]
        }
      ]
    },
    {
      category: 'Error Handling',
      icon: AlertTriangle,
      color: 'red',
      items: [
        {
          title: 'Comprehensive Error Handling',
          description: 'Handle different types of errors appropriately',
          example: `async function safeApiCall(apiFunction, ...args) {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      return await apiFunction(...args);
    } catch (error) {
      console.error(\`API call failed (attempt \${retries + 1}):\`, error);

      switch (error.status) {
        case 401:
          // Unauthorized - refresh token and retry
          await this.refreshToken();
          break;
        
        case 429:
          // Rate limited - wait and retry
          const retryAfter = error.headers['retry-after'] || Math.pow(2, retries);
          await this.sleep(retryAfter * 1000);
          break;
        
        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors - retry with exponential backoff
          await this.sleep(Math.pow(2, retries) * 1000);
          break;
        
        case 400:
        case 403:
        case 404:
          // Client errors - don't retry
          throw error;
        
        default:
          // Unknown error - retry with backoff
          await this.sleep(Math.pow(2, retries) * 1000);
      }

      retries++;
    }
  }

  throw new Error(\`API call failed after \${maxRetries} retries\`);
}`,
          tips: [
            'Implement retry logic for transient errors',
            'Log errors with sufficient context',
            'Provide meaningful error messages to users',
            'Monitor error rates and patterns'
          ]
        },
        {
          title: 'Graceful Degradation',
          description: 'Handle API unavailability gracefully',
          example: `class VehicleService {
  constructor() {
    this.cache = new Map();
    this.fallbackData = new Map();
  }

  async getVehicleLocation(vehicleId) {
    try {
      const location = await this.client.vehicles.location(vehicleId);
      
      // Cache successful response
      this.cache.set(\`location_\${vehicleId}\`, {
        data: location,
        timestamp: Date.now()
      });
      
      return location;
    } catch (error) {
      console.warn('Failed to fetch live location, using cached data:', error);
      
      // Try to return cached data
      const cached = this.cache.get(\`location_\${vehicleId}\`);
      if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
        return {
          ...cached.data,
          cached: true,
          lastUpdated: cached.timestamp
        };
      }
      
      // Return fallback data if available
      const fallback = this.fallbackData.get(vehicleId);
      if (fallback) {
        return {
          ...fallback,
          fallback: true,
          message: 'Location service temporarily unavailable'
        };
      }
      
      throw error;
    }
  }
}`,
          tips: [
            'Cache successful responses',
            'Provide fallback data when possible',
            'Inform users about service limitations',
            'Implement circuit breaker patterns'
          ]
        }
      ]
    },
    {
      category: 'Data Management',
      icon: Clock,
      color: 'purple',
      items: [
        {
          title: 'Smart Caching Strategy',
          description: 'Implement intelligent caching to reduce API calls',
          example: `class VehicleDataCache {
  constructor() {
    this.cache = new Map();
    this.ttl = {
      vehicle_info: 24 * 60 * 60 * 1000, // 24 hours
      location: 5 * 60 * 1000,           // 5 minutes
      fuel_status: 15 * 60 * 1000,       // 15 minutes
      diagnostics: 60 * 60 * 1000        // 1 hour
    };
  }

  async get(key, dataType, fetchFunction) {
    const cached = this.cache.get(key);
    const ttl = this.ttl[dataType] || 300000; // Default 5 minutes

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }

    try {
      const data = await fetchFunction();
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
      return data;
    } catch (error) {
      // Return stale data if available
      if (cached) {
        console.warn('Using stale cached data due to API error');
        return cached.data;
      }
      throw error;
    }
  }

  invalidate(pattern) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}`,
          tips: [
            'Use different TTL for different data types',
            'Invalidate cache when data changes',
            'Consider memory usage for large datasets',
            'Implement cache warming strategies'
          ]
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Best Practices & Optimization
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how to build robust, efficient, and secure applications with the Stellantis 
          Connected Vehicles API. Follow these best practices to ensure optimal performance 
          and reliability.
        </p>
      </div>

      {/* Overview */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Why Best Practices Matter
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Following best practices ensures your application is secure, performant, and reliable. 
              These guidelines help you avoid common pitfalls and build production-ready integrations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Better performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Enhanced security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Improved reliability</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Cost optimization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices by Category */}
      {practices.map((category, categoryIndex) => (
        <section key={categoryIndex} className="space-y-8">
          <div className="flex items-center space-x-3">
            <category.icon className={`h-6 w-6 ${getColorClasses(category.color).split(' ')[0]}`} />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {category.category}
            </h2>
          </div>

          <div className="space-y-8">
            {category.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`border rounded-lg p-6 ${getColorClasses(category.color)}`}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {item.description}
                </p>

                {item.example && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Example Implementation
                    </h4>
                    <CodeBlock code={item.example} language="javascript" />
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Key Tips
                  </h4>
                  <ul className="space-y-2">
                    {item.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Performance Optimization Checklist */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Performance Optimization Checklist
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                API Usage
              </h3>
              <ul className="space-y-2">
                {[
                  'Implement request caching',
                  'Use webhooks instead of polling',
                  'Batch API requests when possible',
                  'Respect rate limits',
                  'Implement retry logic',
                  'Use appropriate pagination'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Security & Reliability
              </h3>
              <ul className="space-y-2">
                {[
                  'Secure credential storage',
                  'Implement proper error handling',
                  'Validate webhook signatures',
                  'Use HTTPS for all communications',
                  'Monitor API usage and errors',
                  'Implement graceful degradation'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Common Pitfalls to Avoid
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Hardcoding Credentials',
              description: 'Never hardcode API credentials in your source code. Use environment variables or secure configuration management.',
              impact: 'Security vulnerability'
            },
            {
              title: 'Ignoring Rate Limits',
              description: 'Not implementing rate limiting can result in API calls being rejected and poor user experience.',
              impact: 'Service disruption'
            },
            {
              title: 'Polling Instead of Webhooks',
              description: 'Continuously polling for updates is inefficient and can quickly exhaust rate limits.',
              impact: 'Poor performance'
            },
            {
              title: 'Not Handling Errors',
              description: 'Failing to implement proper error handling can cause application crashes and poor user experience.',
              impact: 'Application instability'
            },
            {
              title: 'Caching Everything',
              description: 'Over-caching can lead to stale data. Use appropriate TTL values for different data types.',
              impact: 'Data inconsistency'
            },
            {
              title: 'Synchronous Processing',
              description: 'Processing webhook events synchronously can cause timeouts and missed events.',
              impact: 'Event loss'
            }
          ].map((pitfall, index) => (
            <div
              key={index}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                    {pitfall.title}
                  </h3>
                  <p className="text-red-700 dark:text-red-300 text-sm mb-2">
                    {pitfall.description}
                  </p>
                  <span className="inline-block bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs font-medium">
                    Impact: {pitfall.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Monitoring and Observability */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Monitoring & Observability
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Implement comprehensive monitoring to ensure your integration is performing optimally 
          and to quickly identify and resolve issues.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Key Metrics
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>• API response times</li>
              <li>• Error rates by endpoint</li>
              <li>• Rate limit utilization</li>
              <li>• Webhook delivery success</li>
              <li>• Cache hit/miss ratios</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Alerting
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>• High error rates</li>
              <li>• Rate limit approaching</li>
              <li>• Webhook failures</li>
              <li>• Authentication issues</li>
              <li>• Unusual traffic patterns</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Logging
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>• Request/response details</li>
              <li>• Error context and stack traces</li>
              <li>• Performance metrics</li>
              <li>• User actions and outcomes</li>
              <li>• Security events</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestPracticesPage;