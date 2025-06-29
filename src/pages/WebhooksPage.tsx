import React from 'react';
import { Webhook, Shield, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import LanguageTabs from '../components/LanguageTabs';

const WebhooksPage: React.FC = () => {
  const webhookSetupExamples = [
    {
      language: 'bash',
      label: 'cURL',
      code: `curl -X POST https://api.stellantis.com/v1/webhooks \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/stellantis",
    "events": ["vehicle.location.updated", "vehicle.fuel.low"],
    "description": "Vehicle status notifications"
  }'`,
    },
    {
      language: 'javascript',
      label: 'JavaScript',
      code: `const webhook = await fetch('https://api.stellantis.com/v1/webhooks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://your-app.com/webhooks/stellantis',
    events: ['vehicle.location.updated', 'vehicle.fuel.low'],
    description: 'Vehicle status notifications'
  })
});

const result = await webhook.json();
console.log('Webhook created:', result);`,
    },
    {
      language: 'python',
      label: 'Python',
      code: `import requests

webhook_data = {
    'url': 'https://your-app.com/webhooks/stellantis',
    'events': ['vehicle.location.updated', 'vehicle.fuel.low'],
    'description': 'Vehicle status notifications'
}

response = requests.post(
    'https://api.stellantis.com/v1/webhooks',
    headers={
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
    },
    json=webhook_data
)

result = response.json()
print('Webhook created:', result)`,
    },
  ];

  const webhookHandlerExamples = [
    {
      language: 'javascript',
      label: 'Node.js/Express',
      code: `const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// Webhook endpoint
app.post('/webhooks/stellantis', (req, res) => {
  const signature = req.headers['x-stellantis-signature'];
  const payload = JSON.stringify(req.body);
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== \`sha256=\${expectedSignature}\`) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook event
  const event = req.body;
  console.log('Received event:', event.type);
  
  switch (event.type) {
    case 'vehicle.location.updated':
      handleLocationUpdate(event.data);
      break;
    case 'vehicle.fuel.low':
      handleLowFuel(event.data);
      break;
    case 'vehicle.maintenance.due':
      handleMaintenanceDue(event.data);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }
  
  res.status(200).send('OK');
});

function handleLocationUpdate(data) {
  console.log(\`Vehicle \${data.vehicle_id} location updated:\`, data.location);
  // Your location update logic here
}

function handleLowFuel(data) {
  console.log(\`Vehicle \${data.vehicle_id} has low fuel:\`, data.fuel_level);
  // Send notification to user
}

function handleMaintenanceDue(data) {
  console.log(\`Vehicle \${data.vehicle_id} maintenance due:\`, data.service_type);
  // Schedule maintenance reminder
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`,
    },
    {
      language: 'python',
      label: 'Python/Flask',
      code: `from flask import Flask, request, jsonify
import hashlib
import hmac
import os

app = Flask(__name__)

@app.route('/webhooks/stellantis', methods=['POST'])
def handle_webhook():
    # Verify webhook signature
    signature = request.headers.get('X-Stellantis-Signature')
    payload = request.get_data()
    
    expected_signature = hmac.new(
        os.environ['WEBHOOK_SECRET'].encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    if signature != f'sha256={expected_signature}':
        return jsonify({'error': 'Invalid signature'}), 401
    
    # Process the webhook event
    event = request.json
    print(f'Received event: {event["type"]}')
    
    if event['type'] == 'vehicle.location.updated':
        handle_location_update(event['data'])
    elif event['type'] == 'vehicle.fuel.low':
        handle_low_fuel(event['data'])
    elif event['type'] == 'vehicle.maintenance.due':
        handle_maintenance_due(event['data'])
    else:
        print(f'Unhandled event type: {event["type"]}')
    
    return jsonify({'status': 'success'}), 200

def handle_location_update(data):
    print(f'Vehicle {data["vehicle_id"]} location updated: {data["location"]}')
    # Your location update logic here

def handle_low_fuel(data):
    print(f'Vehicle {data["vehicle_id"]} has low fuel: {data["fuel_level"]}')
    # Send notification to user

def handle_maintenance_due(data):
    print(f'Vehicle {data["vehicle_id"]} maintenance due: {data["service_type"]}')
    # Schedule maintenance reminder

if __name__ == '__main__':
    app.run(debug=True, port=3000)`,
    },
  ];

  const eventPayloadExample = `{
  "id": "evt_550e8400-e29b-41d4-a716-446655440000",
  "type": "vehicle.location.updated",
  "created_at": "2023-12-07T10:30:00Z",
  "data": {
    "vehicle_id": "550e8400-e29b-41d4-a716-446655440000",
    "vin": "1HGBH41JXMN109186",
    "location": {
      "latitude": 40.7589,
      "longitude": -73.9851,
      "accuracy": 5.0,
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zip": "10001",
        "country": "US"
      },
      "timestamp": "2023-12-07T10:30:00Z"
    }
  }
}`;

  const events = [
    {
      event: 'vehicle.location.updated',
      description: 'Triggered when vehicle location changes significantly',
      frequency: 'Real-time',
    },
    {
      event: 'vehicle.fuel.low',
      description: 'Triggered when fuel level drops below 15%',
      frequency: 'Once per threshold',
    },
    {
      event: 'vehicle.fuel.empty',
      description: 'Triggered when fuel level drops below 5%',
      frequency: 'Once per threshold',
    },
    {
      event: 'vehicle.battery.low',
      description: 'Triggered when battery level drops below 20% (EVs)',
      frequency: 'Once per threshold',
    },
    {
      event: 'vehicle.maintenance.due',
      description: 'Triggered when scheduled maintenance is due',
      frequency: 'Daily check',
    },
    {
      event: 'vehicle.alarm.triggered',
      description: 'Triggered when vehicle alarm is activated',
      frequency: 'Real-time',
    },
    {
      event: 'vehicle.engine.started',
      description: 'Triggered when engine is started',
      frequency: 'Real-time',
    },
    {
      event: 'vehicle.engine.stopped',
      description: 'Triggered when engine is stopped',
      frequency: 'Real-time',
    },
    {
      event: 'vehicle.doors.locked',
      description: 'Triggered when doors are locked',
      frequency: 'Real-time',
    },
    {
      event: 'vehicle.doors.unlocked',
      description: 'Triggered when doors are unlocked',
      frequency: 'Real-time',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Webhooks
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Receive real-time notifications about vehicle events and status changes. 
          Webhooks allow your application to react immediately to important vehicle events 
          without constantly polling the API.
        </p>
      </div>

      {/* Overview */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Webhook className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              How Webhooks Work
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When a subscribed event occurs, Stellantis sends an HTTP POST request to your configured 
              endpoint with the event data. This enables real-time integration and immediate response 
              to vehicle events.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Real-time delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Secure with HMAC signatures</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Automatic retry mechanism</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setting Up Webhooks */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Setting Up Webhooks
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Create a webhook subscription to start receiving event notifications. You can subscribe 
          to multiple event types with a single webhook endpoint.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                1
              </div>
              <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Create Endpoint
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Set up an HTTPS endpoint in your application to receive webhook events.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                2
              </div>
              <Webhook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Register Webhook
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Use the API to register your endpoint and select the events you want to receive.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                3
              </div>
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Verify & Process
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Verify webhook signatures and process incoming events in your application.
            </p>
          </div>
        </div>

        <LanguageTabs examples={webhookSetupExamples} />
      </section>

      {/* Available Events */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Available Events
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Subscribe to specific vehicle events that are relevant to your application. 
          Each event includes detailed information about what triggered it.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Event Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Frequency
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4">
                    <code className="text-blue-600 dark:text-blue-400 text-sm font-mono">
                      {event.event}
                    </code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {event.description}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                      {event.frequency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Event Payload */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Event Payload Structure
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          All webhook events follow a consistent structure with metadata about the event 
          and the specific data related to the event type.
        </p>

        <CodeBlock code={eventPayloadExample} language="json" title="Example Event Payload" />

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Payload Fields
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <code className="text-blue-600 dark:text-blue-400 font-mono">id</code>
              <span className="text-gray-600 dark:text-gray-300">
                Unique identifier for the event (can be used for deduplication)
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <code className="text-blue-600 dark:text-blue-400 font-mono">type</code>
              <span className="text-gray-600 dark:text-gray-300">
                The event type that triggered this webhook
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <code className="text-blue-600 dark:text-blue-400 font-mono">created_at</code>
              <span className="text-gray-600 dark:text-gray-300">
                ISO 8601 timestamp when the event occurred
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <code className="text-blue-600 dark:text-blue-400 font-mono">data</code>
              <span className="text-gray-600 dark:text-gray-300">
                Event-specific data including vehicle information and event details
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Handling Webhooks */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Handling Webhook Events
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Implement webhook handlers in your application to process incoming events. 
          Always verify the webhook signature to ensure the request is from Stellantis.
        </p>

        <LanguageTabs examples={webhookHandlerExamples} />
      </section>

      {/* Security */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Security & Best Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Signature Verification
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Always verify HMAC signatures</li>
              <li>• Use timing-safe comparison functions</li>
              <li>• Reject requests with invalid signatures</li>
              <li>• Store webhook secrets securely</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Endpoint Requirements
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Must use HTTPS with valid certificate</li>
              <li>• Return 200 status code for success</li>
              <li>• Respond within 30 seconds</li>
              <li>• Handle duplicate events gracefully</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Error Handling
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Implement idempotent event processing</li>
              <li>• Log all webhook events for debugging</li>
              <li>• Handle network failures gracefully</li>
              <li>• Provide fallback mechanisms</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Retry Mechanism
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Failed webhooks are retried automatically</li>
              <li>• Exponential backoff strategy used</li>
              <li>• Up to 5 retry attempts</li>
              <li>• 24-hour maximum retry window</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testing */}
      <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Testing Webhooks
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
              Use tools like ngrok to expose your local development server for testing webhooks, 
              or use our webhook testing tools in the developer dashboard.
            </p>
            <div className="bg-yellow-100 dark:bg-yellow-900/40 rounded p-3">
              <code className="text-sm text-yellow-800 dark:text-yellow-200">
                # Install ngrok and expose your local server<br />
                ngrok http 3000<br />
                # Use the HTTPS URL for your webhook endpoint
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebhooksPage;