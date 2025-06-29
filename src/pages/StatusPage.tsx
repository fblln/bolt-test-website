import React from 'react';
import { Activity, CheckCircle, AlertCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

const StatusPage: React.FC = () => {
  const overallStatus = 'operational'; // operational, degraded, outage

  const services = [
    {
      name: 'Vehicle Data API',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '145ms',
      description: 'Core vehicle information and status endpoints'
    },
    {
      name: 'Location Services',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '89ms',
      description: 'Real-time vehicle location and tracking'
    },
    {
      name: 'Vehicle Control',
      status: 'operational',
      uptime: '99.92%',
      responseTime: '234ms',
      description: 'Remote vehicle control functions'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '67ms',
      description: 'OAuth 2.0 authentication and token management'
    },
    {
      name: 'Webhooks',
      status: 'degraded',
      uptime: '98.45%',
      responseTime: '456ms',
      description: 'Real-time event notifications'
    },
    {
      name: 'Developer Portal',
      status: 'operational',
      uptime: '99.87%',
      responseTime: '123ms',
      description: 'Documentation and developer resources'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Webhook Delivery Delays',
      status: 'investigating',
      severity: 'minor',
      startTime: '2023-12-07T14:30:00Z',
      description: 'We are investigating reports of delayed webhook deliveries. Vehicle data and control functions are not affected.',
      updates: [
        {
          time: '2023-12-07T15:15:00Z',
          message: 'We have identified the root cause and are implementing a fix. Webhook deliveries are gradually returning to normal.'
        },
        {
          time: '2023-12-07T14:45:00Z',
          message: 'We are continuing to investigate the webhook delivery delays. Average delay is currently 2-3 minutes.'
        },
        {
          time: '2023-12-07T14:30:00Z',
          message: 'We are investigating reports of webhook delivery delays affecting some customers.'
        }
      ]
    }
  ];

  const pastIncidents = [
    {
      id: 2,
      title: 'Scheduled Maintenance - Authentication Service',
      status: 'resolved',
      severity: 'maintenance',
      startTime: '2023-12-05T02:00:00Z',
      endTime: '2023-12-05T04:00:00Z',
      description: 'Scheduled maintenance window for authentication service upgrades.'
    },
    {
      id: 3,
      title: 'Elevated Error Rates - Vehicle Control API',
      status: 'resolved',
      severity: 'major',
      startTime: '2023-12-03T09:15:00Z',
      endTime: '2023-12-03T11:30:00Z',
      description: 'Elevated error rates affecting vehicle control operations. Issue was resolved by rolling back a recent deployment.'
    },
    {
      id: 4,
      title: 'Partial Outage - Location Services',
      status: 'resolved',
      severity: 'major',
      startTime: '2023-11-28T16:20:00Z',
      endTime: '2023-11-28T18:45:00Z',
      description: 'Partial outage affecting location services in the EU region. Service was restored after infrastructure repairs.'
    }
  ];

  const metrics = [
    {
      name: 'API Uptime',
      value: '99.95%',
      change: '+0.02%',
      period: 'Last 30 days'
    },
    {
      name: 'Average Response Time',
      value: '156ms',
      change: '-12ms',
      period: 'Last 24 hours'
    },
    {
      name: 'Successful Requests',
      value: '99.87%',
      change: '+0.05%',
      period: 'Last 7 days'
    },
    {
      name: 'Webhook Success Rate',
      value: '98.92%',
      change: '-1.23%',
      period: 'Last 24 hours'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'outage':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'major':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'minor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTimeDifference = (start: string, end?: string) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          API Status
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Real-time status and performance metrics for the Stellantis Connected Vehicles API. 
          Monitor service availability, response times, and any ongoing incidents.
        </p>
      </div>

      {/* Overall Status */}
      <section className="text-center">
        <div className={`inline-flex items-center space-x-3 px-6 py-4 rounded-lg border ${getStatusColor(overallStatus)}`}>
          {getStatusIcon(overallStatus)}
          <div>
            <h2 className="text-2xl font-bold">
              {overallStatus === 'operational' ? 'All Systems Operational' : 
               overallStatus === 'degraded' ? 'Some Systems Degraded' : 'Service Disruption'}
            </h2>
            <p className="text-sm opacity-75">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Current Incidents */}
      {incidents.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Current Incidents
          </h2>
          
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {incident.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Started {formatTime(incident.startTime)} • Duration: {getTimeDifference(incident.startTime)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                    {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {incident.description}
              </p>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Updates:</h4>
                {incident.updates.map((update, index) => (
                  <div key={index} className="flex space-x-3 text-sm">
                    <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {formatTime(update.time)}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {update.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Service Status */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Service Status
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
                {getStatusIcon(service.status)}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {service.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Uptime:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{service.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Response Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{service.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`font-medium capitalize ${
                    service.status === 'operational' ? 'text-green-600' :
                    service.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Performance Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {metric.name}
                </h3>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </span>
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 
                  metric.change.startsWith('-') && metric.name.includes('Response Time') ? 'text-green-600' :
                  metric.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {metric.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Past Incidents */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Incident History
        </h2>
        
        <div className="space-y-4">
          {pastIncidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {incident.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {formatTime(incident.startTime)} - {incident.endTime ? formatTime(incident.endTime) : 'Ongoing'} 
                      {incident.endTime && ` • Duration: ${getTimeDifference(incident.startTime, incident.endTime)}`}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                    {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    Resolved
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                {incident.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Stay Updated
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Subscribe to status updates to receive notifications about incidents, maintenance windows, 
              and service announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe to Email Updates
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                RSS Feed
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                Webhook Notifications
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatusPage;