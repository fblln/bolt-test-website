import React, { useState } from 'react';
import { Car, MapPin, Fuel, Wrench, Clock, Shield, Zap, AlertCircle } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import LanguageTabs from '../components/LanguageTabs';

const APIReferencePage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('vehicles');

  const endpoints = {
    vehicles: {
      title: 'Vehicles',
      icon: Car,
      description: 'Manage and retrieve vehicle information',
      methods: [
        {
          method: 'GET',
          path: '/v1/vehicles',
          description: 'List all vehicles associated with the authenticated user',
          response: `{
  "vehicles": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "vin": "1HGBH41JXMN109186",
      "make": "Jeep",
      "model": "Wrangler",
      "year": 2023,
      "color": "Red",
      "status": "active",
      "last_seen": "2023-12-07T10:30:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "per_page": 10
}`,
          examples: [
            {
              language: 'bash',
              label: 'cURL',
              code: `curl -X GET https://api.stellantis.com/v1/vehicles \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Accept: application/json"`,
            },
            {
              language: 'javascript',
              label: 'JavaScript',
              code: `const response = await fetch('https://api.stellantis.com/v1/vehicles', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Accept': 'application/json'
  }
});

const vehicles = await response.json();
console.log(vehicles);`,
            },
          ],
        },
        {
          method: 'GET',
          path: '/v1/vehicles/{vehicle_id}',
          description: 'Get detailed information about a specific vehicle',
          parameters: [
            { name: 'vehicle_id', type: 'string', required: true, description: 'Unique identifier for the vehicle' },
          ],
          response: `{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "vin": "1HGBH41JXMN109186",
  "make": "Jeep",
  "model": "Wrangler",
  "year": 2023,
  "color": "Red",
  "mileage": 15420,
  "fuel_type": "gasoline",
  "transmission": "manual",
  "drivetrain": "4WD",
  "status": "active",
  "last_seen": "2023-12-07T10:30:00Z",
  "features": ["remote_start", "climate_control", "door_locks"]
}`,
        },
      ],
    },
    location: {
      title: 'Location',
      icon: MapPin,
      description: 'Access vehicle location and tracking data',
      methods: [
        {
          method: 'GET',
          path: '/v1/vehicles/{vehicle_id}/location',
          description: 'Get current location of a vehicle',
          parameters: [
            { name: 'vehicle_id', type: 'string', required: true, description: 'Unique identifier for the vehicle' },
          ],
          response: `{
  "latitude": 40.7589,
  "longitude": -73.9851,
  "accuracy": 5.0,
  "altitude": 10.5,
  "heading": 180.0,
  "speed": 0.0,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  },
  "timestamp": "2023-12-07T10:30:00Z"
}`,
          examples: [
            {
              language: 'bash',
              label: 'cURL',
              code: `curl -X GET https://api.stellantis.com/v1/vehicles/550e8400-e29b-41d4-a716-446655440000/location \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Accept: application/json"`,
            },
          ],
        },
      ],
    },
    fuel: {
      title: 'Fuel & Battery',
      icon: Fuel,
      description: 'Monitor fuel levels and battery status',
      methods: [
        {
          method: 'GET',
          path: '/v1/vehicles/{vehicle_id}/fuel',
          description: 'Get fuel level and range information',
          response: `{
  "fuel_level": 75.5,
  "fuel_level_percentage": 85,
  "range": 420,
  "fuel_type": "gasoline",
  "tank_capacity": 22.5,
  "timestamp": "2023-12-07T10:30:00Z"
}`,
        },
        {
          method: 'GET',
          path: '/v1/vehicles/{vehicle_id}/battery',
          description: 'Get battery status for electric/hybrid vehicles',
          response: `{
  "battery_level": 85.2,
  "battery_percentage": 85,
  "charging_status": "not_charging",
  "range_electric": 280,
  "range_total": 450,
  "time_to_full_charge": null,
  "plug_status": "unplugged",
  "timestamp": "2023-12-07T10:30:00Z"
}`,
        },
      ],
    },
    control: {
      title: 'Vehicle Control',
      icon: Zap,
      description: 'Control vehicle functions remotely',
      methods: [
        {
          method: 'POST',
          path: '/v1/vehicles/{vehicle_id}/doors/lock',
          description: 'Lock vehicle doors',
          response: `{
  "command_id": "cmd_550e8400-e29b-41d4-a716-446655440000",
  "status": "pending",
  "timestamp": "2023-12-07T10:30:00Z"
}`,
        },
        {
          method: 'POST',
          path: '/v1/vehicles/{vehicle_id}/doors/unlock',
          description: 'Unlock vehicle doors',
          response: `{
  "command_id": "cmd_550e8400-e29b-41d4-a716-446655440001",
  "status": "pending",
  "timestamp": "2023-12-07T10:30:00Z"
}`,
        },
        {
          method: 'POST',
          path: '/v1/vehicles/{vehicle_id}/engine/start',
          description: 'Start vehicle engine remotely',
          requestBody: `{
  "duration": 600,
  "climate_settings": {
    "temperature": 72,
    "defrost": false
  }
}`,
          response: `{
  "command_id": "cmd_550e8400-e29b-41d4-a716-446655440002",
  "status": "pending",
  "estimated_completion": "2023-12-07T10:31:00Z"
}`,
        },
      ],
    },
  };

  const statusCodes = [
    { code: '200', description: 'Success - Request completed successfully' },
    { code: '201', description: 'Created - Resource created successfully' },
    { code: '400', description: 'Bad Request - Invalid request parameters' },
    { code: '401', description: 'Unauthorized - Invalid or missing authentication' },
    { code: '403', description: 'Forbidden - Insufficient permissions' },
    { code: '404', description: 'Not Found - Resource not found' },
    { code: '429', description: 'Too Many Requests - Rate limit exceeded' },
    { code: '500', description: 'Internal Server Error - Server error occurred' },
  ];

  const rateLimits = [
    { endpoint: 'Vehicle Information', limit: '100 requests/minute' },
    { endpoint: 'Location Data', limit: '60 requests/minute' },
    { endpoint: 'Vehicle Control', limit: '10 requests/minute' },
    { endpoint: 'Fuel/Battery Status', limit: '30 requests/minute' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          API Reference
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Complete reference documentation for all Stellantis Connected Vehicles API endpoints, 
          including request/response examples, parameters, and error codes.
        </p>
      </div>

      {/* Base URL */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Base URL
        </h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Production:</span>
            <code className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm">
              https://api.stellantis.com
            </code>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sandbox:</span>
            <code className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm">
              https://api-sandbox.stellantis.com
            </code>
          </div>
        </div>
      </section>

      {/* Endpoint Navigation */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          API Endpoints
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(endpoints).map(([key, endpoint]) => {
            const Icon = endpoint.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedEndpoint(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedEndpoint === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={16} />
                <span>{endpoint.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Endpoint Details */}
        <div className="space-y-8">
          {Object.entries(endpoints).map(([key, endpoint]) => {
            if (selectedEndpoint !== key) return null;

            return (
              <div key={key} className="space-y-6">
                <div className="flex items-center space-x-3">
                  <endpoint.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {endpoint.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {endpoint.description}
                    </p>
                  </div>
                </div>

                {endpoint.methods.map((method, methodIndex) => (
                  <div
                    key={methodIndex}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            method.method === 'GET'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : method.method === 'POST'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : method.method === 'PUT'
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}
                        >
                          {method.method}
                        </span>
                        <code className="text-lg font-mono text-gray-900 dark:text-white">
                          {method.path}
                        </code>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {method.description}
                      </p>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Parameters */}
                      {method.parameters && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Parameters
                          </h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                  <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                  </th>
                                  <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">
                                    Type
                                  </th>
                                  <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">
                                    Required
                                  </th>
                                  <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {method.parameters.map((param, paramIndex) => (
                                  <tr
                                    key={paramIndex}
                                    className="border-b border-gray-100 dark:border-gray-800"
                                  >
                                    <td className="py-2">
                                      <code className="text-blue-600 dark:text-blue-400">
                                        {param.name}
                                      </code>
                                    </td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">
                                      {param.type}
                                    </td>
                                    <td className="py-2">
                                      <span
                                        className={`px-2 py-1 rounded text-xs ${
                                          param.required
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                                        }`}
                                      >
                                        {param.required ? 'Required' : 'Optional'}
                                      </span>
                                    </td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">
                                      {param.description}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Request Body */}
                      {method.requestBody && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Request Body
                          </h4>
                          <CodeBlock code={method.requestBody} language="json" />
                        </div>
                      )}

                      {/* Response */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Response Example
                        </h4>
                        <CodeBlock code={method.response} language="json" />
                      </div>

                      {/* Code Examples */}
                      {method.examples && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Request Examples
                          </h4>
                          <LanguageTabs examples={method.examples} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Status Codes */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          HTTP Status Codes
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          The API uses standard HTTP status codes to indicate the success or failure of requests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statusCodes.map((status, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <code
                  className={`px-2 py-1 rounded text-sm font-bold ${
                    status.code.startsWith('2')
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : status.code.startsWith('4')
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}
                >
                  {status.code}
                </code>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {status.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rate Limits */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Rate Limits
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          API requests are subject to rate limiting to ensure fair usage and system stability.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Rate Limit Headers
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                All API responses include rate limit headers: X-RateLimit-Limit, X-RateLimit-Remaining, 
                and X-RateLimit-Reset to help you manage your request rate.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rateLimits.map((limit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  {limit.endpoint}
                </span>
                <code className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  {limit.limit}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default APIReferencePage;