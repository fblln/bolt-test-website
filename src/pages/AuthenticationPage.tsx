import React from 'react';
import { Shield, Key, RefreshCw, AlertTriangle } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import LanguageTabs from '../components/LanguageTabs';

const AuthenticationPage: React.FC = () => {
  const tokenExamples = [
    {
      language: 'bash',
      label: 'cURL',
      code: `curl -X POST https://auth.stellantis.com/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials" \\
  -d "client_id=YOUR_CLIENT_ID" \\
  -d "client_secret=YOUR_CLIENT_SECRET" \\
  -d "scope=vehicle:read vehicle:location vehicle:control"`,
    },
    {
      language: 'javascript',
      label: 'JavaScript',
      code: `const getAccessToken = async () => {
  const response = await fetch('https://auth.stellantis.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.STELLANTIS_CLIENT_ID,
      client_secret: process.env.STELLANTIS_CLIENT_SECRET,
      scope: 'vehicle:read vehicle:location vehicle:control'
    })
  });

  const data = await response.json();
  return data.access_token;
};`,
    },
    {
      language: 'python',
      label: 'Python',
      code: `import requests
import os

def get_access_token():
    url = 'https://auth.stellantis.com/oauth/token'
    
    data = {
        'grant_type': 'client_credentials',
        'client_id': os.environ['STELLANTIS_CLIENT_ID'],
        'client_secret': os.environ['STELLANTIS_CLIENT_SECRET'],
        'scope': 'vehicle:read vehicle:location vehicle:control'
    }
    
    response = requests.post(url, data=data)
    response.raise_for_status()
    
    return response.json()['access_token']`,
    },
  ];

  const apiCallExamples = [
    {
      language: 'bash',
      label: 'cURL',
      code: `# Using the access token in API calls
curl -X GET https://api.stellantis.com/v1/vehicles \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Accept: application/json"`,
    },
    {
      language: 'javascript',
      label: 'JavaScript',
      code: `const makeApiCall = async (accessToken) => {
  const response = await fetch('https://api.stellantis.com/v1/vehicles', {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return await response.json();
};`,
    },
    {
      language: 'python',
      label: 'Python',
      code: `import requests

def make_api_call(access_token):
    url = 'https://api.stellantis.com/v1/vehicles'
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()`,
    },
  ];

  const refreshTokenCode = `{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer", 
  "expires_in": 3600,
  "refresh_token": "def50200a1b2c3d4e5f6...",
  "scope": "vehicle:read vehicle:location vehicle:control"
}`;

  const scopes = [
    {
      scope: 'vehicle:read',
      description: 'Read basic vehicle information including VIN, make, model, year, and status',
    },
    {
      scope: 'vehicle:location',
      description: 'Access vehicle location data including GPS coordinates and address',
    },
    {
      scope: 'vehicle:control',
      description: 'Control vehicle functions like lock/unlock, engine start/stop, and climate',
    },
    {
      scope: 'vehicle:fuel',
      description: 'Read fuel level, battery status, and range information',
    },
    {
      scope: 'vehicle:diagnostics',
      description: 'Access diagnostic data including odometer, maintenance alerts, and DTCs',
    },
    {
      scope: 'vehicle:history',
      description: 'Access historical trip data and usage analytics',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Authentication & Authorization
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how to authenticate with the Stellantis Connected Vehicles API using OAuth 2.0, 
          manage access tokens, and implement secure authentication in your applications.
        </p>
      </div>

      {/* Overview */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              OAuth 2.0 Authentication
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The Stellantis Connected Vehicles API uses OAuth 2.0 with the Client Credentials flow 
              for server-to-server authentication. This ensures secure access to vehicle data while 
              maintaining user privacy and data protection standards.
            </p>
          </div>
        </div>
      </section>

      {/* Authentication Flow */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Client Credentials Flow
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          The Client Credentials flow is designed for server-to-server communication where your 
          application needs to access resources on behalf of itself, not a specific user.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                1
              </div>
              <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Request Token
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Send your client credentials to the token endpoint to request an access token.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                2
              </div>
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Receive Token
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              The authorization server validates your credentials and returns an access token.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                3
              </div>
              <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Use Token
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Include the access token in the Authorization header of your API requests.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Access Token */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Getting an Access Token
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          To obtain an access token, make a POST request to the token endpoint with your client credentials.
        </p>

        <LanguageTabs examples={tokenExamples} />

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Response Format
          </h3>
          <CodeBlock code={refreshTokenCode} language="json" />
        </div>
      </section>

      {/* Using Access Token */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Using the Access Token
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Include the access token in the Authorization header of your API requests using the Bearer token format.
        </p>

        <LanguageTabs examples={apiCallExamples} />
      </section>

      {/* Scopes */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Available Scopes
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Scopes define the level of access your application has to vehicle data. Request only the 
          scopes your application needs to follow the principle of least privilege.
        </p>

        <div className="space-y-4">
          {scopes.map((scope, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start space-x-3">
                <code className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                  {scope.scope}
                </code>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex-1">
                  {scope.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Security Best Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Credential Management
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Store credentials securely using environment variables</li>
              <li>• Never commit credentials to version control</li>
              <li>• Use a secure configuration management system</li>
              <li>• Rotate credentials regularly</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Token Management
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Cache tokens and reuse until expiration</li>
              <li>• Implement automatic token refresh</li>
              <li>• Handle token expiration gracefully</li>
              <li>• Use secure storage for tokens</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Network Security
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Always use HTTPS for API communications</li>
              <li>• Validate SSL certificates</li>
              <li>• Implement proper error handling</li>
              <li>• Use secure transport protocols</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Access Control
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Request only necessary scopes</li>
              <li>• Implement role-based access control</li>
              <li>• Monitor and log API usage</li>
              <li>• Regular security audits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Error Handling
        </h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Common Authentication Errors
              </p>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• <strong>401 Unauthorized:</strong> Invalid or expired access token</li>
                <li>• <strong>403 Forbidden:</strong> Insufficient scopes for the requested resource</li>
                <li>• <strong>400 Bad Request:</strong> Invalid client credentials or request format</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Example error handling in JavaScript
const makeAuthenticatedRequest = async () => {
  try {
    const response = await fetch('https://api.stellantis.com/v1/vehicles', {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`,
        'Accept': 'application/json'
      }
    });

    if (response.status === 401) {
      // Token expired, refresh and retry
      accessToken = await refreshAccessToken();
      return await makeAuthenticatedRequest();
    }

    if (!response.ok) {
      throw new Error(\`API Error: \${response.status} \${response.statusText}\`);
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};`}
          language="javascript"
          title="Error Handling Example"
        />
      </section>
    </div>
  );
};

export default AuthenticationPage;