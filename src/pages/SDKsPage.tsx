import React from 'react';
import { Package, Download, Code, Star, ExternalLink } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const SDKsPage: React.FC = () => {
  const sdks = [
    {
      language: 'JavaScript/TypeScript',
      packageName: '@stellantis/connected-vehicles',
      version: 'v2.1.0',
      description: 'Official SDK for Node.js and browser environments with full TypeScript support.',
      features: ['Promise-based API', 'TypeScript definitions', 'Automatic token refresh', 'Webhook helpers'],
      install: 'npm install @stellantis/connected-vehicles',
      github: 'https://github.com/stellantis/connected-vehicles-js',
      docs: 'https://docs.stellantis.com/sdk/javascript',
      examples: [
        {
          title: 'Basic Usage',
          code: `import { StellantisCVClient } from '@stellantis/connected-vehicles';

const client = new StellantisCVClient({
  clientId: process.env.STELLANTIS_CLIENT_ID,
  clientSecret: process.env.STELLANTIS_CLIENT_SECRET,
  environment: 'production'
});

// Get vehicle list
const vehicles = await client.vehicles.list();

// Get vehicle location
const location = await client.vehicles.location(vehicleId);

// Lock vehicle doors
const result = await client.vehicles.lockDoors(vehicleId);`,
        },
        {
          title: 'Webhook Integration',
          code: `import { verifyWebhookSignature } from '@stellantis/connected-vehicles';

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-stellantis-signature'];
  const isValid = verifyWebhookSignature(
    req.body,
    signature,
    process.env.WEBHOOK_SECRET
  );
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook event
  handleWebhookEvent(req.body);
  res.status(200).send('OK');
});`,
        },
      ],
    },
    {
      language: 'Python',
      packageName: 'stellantis-connected-vehicles',
      version: 'v1.5.2',
      description: 'Python SDK with support for async/await and comprehensive error handling.',
      features: ['Async support', 'Pydantic models', 'Comprehensive logging', 'Rate limiting'],
      install: 'pip install stellantis-connected-vehicles',
      github: 'https://github.com/stellantis/connected-vehicles-python',
      docs: 'https://docs.stellantis.com/sdk/python',
      examples: [
        {
          title: 'Synchronous Usage',
          code: `from stellantis_cv import Client

client = Client(
    client_id=os.environ['STELLANTIS_CLIENT_ID'],
    client_secret=os.environ['STELLANTIS_CLIENT_SECRET'],
    environment='production'
)

# Get vehicle list
vehicles = client.vehicles.list()

# Get vehicle information
vehicle = client.vehicles.get(vehicle_id)

# Start engine remotely
result = client.vehicles.start_engine(vehicle_id, duration=600)`,
        },
        {
          title: 'Async Usage',
          code: `import asyncio
from stellantis_cv import AsyncClient

async def main():
    client = AsyncClient(
        client_id=os.environ['STELLANTIS_CLIENT_ID'],
        client_secret=os.environ['STELLANTIS_CLIENT_SECRET'],
        environment='production'
    )
    
    # Get multiple vehicles concurrently
    vehicles = await client.vehicles.list()
    
    # Get location for all vehicles
    locations = await asyncio.gather(*[
        client.vehicles.location(v.id) for v in vehicles
    ])
    
    await client.close()

asyncio.run(main())`,
        },
      ],
    },
    {
      language: 'Java',
      packageName: 'com.stellantis:connected-vehicles',
      version: 'v1.3.1',
      description: 'Java SDK with builder pattern and comprehensive exception handling.',
      features: ['Builder pattern', 'Retrofit integration', 'Custom exceptions', 'Thread-safe'],
      install: 'implementation "com.stellantis:connected-vehicles:1.3.1"',
      github: 'https://github.com/stellantis/connected-vehicles-java',
      docs: 'https://docs.stellantis.com/sdk/java',
      examples: [
        {
          title: 'Basic Configuration',
          code: `import com.stellantis.cv.Client;
import com.stellantis.cv.models.Vehicle;

public class StellantisCVExample {
    private final Client client;
    
    public StellantisCVExample() {
        this.client = new Client.Builder()
            .clientId(System.getenv("STELLANTIS_CLIENT_ID"))
            .clientSecret(System.getenv("STELLANTIS_CLIENT_SECRET"))
            .environment("production")
            .build();
    }
    
    public void getVehicleInfo() throws Exception {
        // List vehicles
        List<Vehicle> vehicles = client.vehicles().list();
        
        // Get specific vehicle
        Vehicle vehicle = client.vehicles().get(vehicleId);
        
        // Get location
        Location location = client.vehicles().location(vehicleId);
    }
}`,
        },
        {
          title: 'Error Handling',
          code: `try {
    Vehicle vehicle = client.vehicles().get(vehicleId);
    System.out.println("Vehicle: " + vehicle.getMake() + " " + vehicle.getModel());
} catch (VehicleNotFoundException e) {
    System.err.println("Vehicle not found: " + e.getMessage());
} catch (UnauthorizedException e) {
    System.err.println("Authentication failed: " + e.getMessage());
} catch (RateLimitExceededException e) {
    System.err.println("Rate limit exceeded. Retry after: " + e.getRetryAfter());
} catch (StellantisCVException e) {
    System.err.println("API error: " + e.getMessage());
}`,
        },
      ],
    },
    {
      language: 'Go',
      packageName: 'github.com/stellantis/connected-vehicles-go',
      version: 'v0.8.0',
      description: 'Go SDK with context support and structured error handling.',
      features: ['Context support', 'Structured errors', 'JSON marshaling', 'HTTP client wrapper'],
      install: 'go get github.com/stellantis/connected-vehicles-go',
      github: 'https://github.com/stellantis/connected-vehicles-go',
      docs: 'https://docs.stellantis.com/sdk/go',
      examples: [
        {
          title: 'Basic Usage',
          code: `package main

import (
    "context"
    "fmt"
    "log"
    "os"
    
    stellantis "github.com/stellantis/connected-vehicles-go"
)

func main() {
    client := stellantis.NewClient(&stellantis.Config{
        ClientID:     os.Getenv("STELLANTIS_CLIENT_ID"),
        ClientSecret: os.Getenv("STELLANTIS_CLIENT_SECRET"),
        Environment:  "production",
    })
    
    ctx := context.Background()
    
    // List vehicles
    vehicles, err := client.Vehicles.List(ctx)
    if err != nil {
        log.Fatal(err)
    }
    
    // Get vehicle location
    location, err := client.Vehicles.Location(ctx, vehicleID)
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Vehicle at: %f, %f\\n", location.Latitude, location.Longitude)
}`,
        },
      ],
    },
    {
      language: 'PHP',
      packageName: 'stellantis/connected-vehicles',
      version: 'v1.2.0',
      description: 'PHP SDK with PSR-4 autoloading and comprehensive documentation.',
      features: ['PSR-4 autoloading', 'Guzzle HTTP client', 'Custom exceptions', 'Laravel integration'],
      install: 'composer require stellantis/connected-vehicles',
      github: 'https://github.com/stellantis/connected-vehicles-php',
      docs: 'https://docs.stellantis.com/sdk/php',
      examples: [
        {
          title: 'Basic Usage',
          code: `<?php
require_once 'vendor/autoload.php';

use Stellantis\\ConnectedVehicles\\Client;

$client = new Client([
    'client_id' => $_ENV['STELLANTIS_CLIENT_ID'],
    'client_secret' => $_ENV['STELLANTIS_CLIENT_SECRET'],
    'environment' => 'production'
]);

try {
    // Get vehicles
    $vehicles = $client->vehicles()->list();
    
    // Get vehicle information
    $vehicle = $client->vehicles()->get($vehicleId);
    
    // Get location
    $location = $client->vehicles()->location($vehicleId);
    
    echo "Vehicle location: {$location['latitude']}, {$location['longitude']}";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}`,
        },
      ],
    },
  ];

  const communitySDKs = [
    {
      name: 'Ruby SDK',
      author: 'Community',
      description: 'Unofficial Ruby gem for Stellantis Connected Vehicles API',
      github: 'https://github.com/community/stellantis-ruby',
      status: 'Community Maintained',
    },
    {
      name: 'C# SDK',
      author: 'Community',
      description: 'Unofficial .NET SDK with async/await support',
      github: 'https://github.com/community/stellantis-dotnet',
      status: 'Community Maintained',
    },
    {
      name: 'Rust SDK',
      author: 'Community',
      description: 'Unofficial Rust crate with type-safe API bindings',
      github: 'https://github.com/community/stellantis-rust',
      status: 'Community Maintained',
    },
  ];

  const [selectedSDK, setSelectedSDK] = React.useState(0);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          SDKs & Client Libraries
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Official and community-maintained SDKs to integrate Stellantis Connected Vehicles API 
          into your applications. Choose your preferred programming language and get started quickly.
        </p>
      </div>

      {/* SDK Selection */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Official SDKs
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Official SDKs are maintained by Stellantis and provide the most up-to-date features, 
          comprehensive documentation, and full support.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sdks.map((sdk, index) => (
            <button
              key={index}
              onClick={() => setSelectedSDK(index)}
              className={`text-left p-6 rounded-lg border transition-all ${
                selectedSDK === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {sdk.language}
                </h3>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                  {sdk.version}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {sdk.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {sdk.features.slice(0, 3).map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Selected SDK Details */}
      <section className="space-y-8">
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sdks[selectedSDK].language} SDK
                </h3>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  {sdks[selectedSDK].version}
                </span>
              </div>
              <div className="flex space-x-2">
                <a
                  href={sdks[selectedSDK].github}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
                >
                  <Code size={14} />
                  <span>GitHub</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href={sdks[selectedSDK].docs}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Download size={14} />
                  <span>Docs</span>
                </a>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {sdks[selectedSDK].description}
            </p>
            <div className="flex flex-wrap gap-2">
              {sdks[selectedSDK].features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Installation */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Installation
              </h4>
              <CodeBlock
                code={sdks[selectedSDK].install}
                language="bash"
                title="Install Command"
              />
            </div>

            {/* Examples */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Code Examples
              </h4>
              <div className="space-y-6">
                {sdks[selectedSDK].examples.map((example, index) => (
                  <div key={index}>
                    <h5 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                      {example.title}
                    </h5>
                    <CodeBlock
                      code={example.code}
                      language={sdks[selectedSDK].language.toLowerCase().includes('javascript') ? 'javascript' : 
                               sdks[selectedSDK].language.toLowerCase().includes('python') ? 'python' :
                               sdks[selectedSDK].language.toLowerCase().includes('java') ? 'java' :
                               sdks[selectedSDK].language.toLowerCase().includes('go') ? 'go' : 'php'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community SDKs */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Community SDKs
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Community-maintained SDKs for additional programming languages. These are not officially 
          supported by Stellantis but are maintained by the developer community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communitySDKs.map((sdk, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {sdk.name}
                </h3>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">
                  {sdk.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {sdk.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  by {sdk.author}
                </span>
                <a
                  href={sdk.github}
                  className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Code size={14} />
                  <span>GitHub</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SDK Comparison */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          SDK Feature Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Language
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Async Support
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  TypeScript
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Webhooks
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Rate Limiting
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Auto Retry
                </th>
              </tr>
            </thead>
            <tbody>
              {sdks.map((sdk, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                    {sdk.language}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={sdk.language.includes('JavaScript') ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}>
                      {sdk.language.includes('JavaScript') ? '✓' : '—'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contributing */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Star className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Contributing to SDKs
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We welcome contributions to our official SDKs! Whether it's bug fixes, new features, 
              or improved documentation, your contributions help make the SDKs better for everyone.
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• Check out our contribution guidelines on GitHub</p>
              <p>• Submit issues and feature requests</p>
              <p>• Create pull requests with improvements</p>
              <p>• Help with documentation and examples</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SDKsPage;