import React, { useState } from 'react';
import {
  Search,
  Calendar,
  MessageSquare,
  TrendingUp,
  Filter,
  BarChart3,
  Mic2,
  Film,
  Smile,
  HelpCircle,
  FileText,
  AlertCircle,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

// Sample data for the line chart
const sentimentData = [
  { date: '2025-03-01', positive: 45, negative: 20, neutral: 35 },
  { date: '2025-03-02', positive: 52, negative: 18, neutral: 30 },
  { date: '2025-03-03', positive: 48, negative: 22, neutral: 30 },
  { date: '2025-03-04', positive: 56, negative: 24, neutral: 20 },
  { date: '2025-03-05', positive: 51, negative: 19, neutral: 30 },
  { date: '2025-03-06', positive: 58, negative: 15, neutral: 27 },
  { date: '2025-03-07', positive: 54, negative: 21, neutral: 25 },
];

// Sample data for the bubble chart
const topicData = [
  { topic: 'Audio Quality', mentions: 145, sentiment: 0.3, size: 800 },
  { topic: 'Editing Style', mentions: 120, sentiment: 0.8, size: 600 },
  { topic: 'Content Depth', mentions: 90, sentiment: 0.6, size: 400 },
  { topic: 'Humor', mentions: 80, sentiment: 0.9, size: 350 },
  { topic: 'Visuals', mentions: 70, sentiment: 0.7, size: 300 },
  { topic: 'Pacing', mentions: 60, sentiment: 0.5, size: 250 },
];

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">YouTube Comment Analyzer</h1>
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-700">John Doe</div>
                  <div className="text-xs text-gray-500">john@example.com</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {}}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {}}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* URL Input */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube Video URL here"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Analyze</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 mt-4">
            <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Date Range</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg">
              <Filter className="h-4 w-4 text-gray-500" />
              <span>Sentiment</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search keywords..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Sentiment Gauge */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Sentiment Analysis</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Positive</span>
                <span className="text-green-600">56%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '56%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Negative</span>
                <span className="text-red-600">24%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '24%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Neutral</span>
                <span className="text-gray-600">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gray-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>

          {/* Total Comments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Total Comments</h3>
            <div className="flex items-center space-x-4">
              <MessageSquare className="h-12 w-12 text-blue-600" />
              <div>
                <p className="text-3xl font-bold">345</p>
                <p className="text-gray-500">Total comments analyzed</p>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Top Trending Topics</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mic2 className="h-5 w-5 text-blue-600" />
                <span>Audio Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Film className="h-5 w-5 text-purple-600" />
                <span>Editing Style</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smile className="h-5 w-5 text-yellow-600" />
                <span>Humor Content</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sentiment Over Time Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Sentiment Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="positive"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: '#10B981' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="negative"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ fill: '#EF4444' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="neutral"
                    stroke="#6B7280"
                    strokeWidth={2}
                    dot={{ fill: '#6B7280' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Topic Clusters Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Topic Clusters</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="mentions"
                    name="Mentions"
                    type="number"
                    domain={[0, 160]}
                  />
                  <YAxis
                    dataKey="sentiment"
                    name="Sentiment"
                    domain={[0, 1]}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <ZAxis
                    dataKey="size"
                    range={[100, 1000]}
                    name="Topic Size"
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 shadow-lg rounded-lg border">
                            <p className="font-semibold">{data.topic}</p>
                            <p>Mentions: {data.mentions}</p>
                            <p>Sentiment: {(data.sentiment * 100).toFixed(0)}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter
                    name="Topics"
                    data={topicData}
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Comments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Comments</h3>
              <div className="flex space-x-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Sort by Date</option>
                  <option>Sort by Sentiment</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Sentiments</option>
                  <option>Positive</option>
                  <option>Negative</option>
                  <option>Neutral</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Positive
                    </span>
                  </td>
                  <td className="px-6 py-4">Loved your editing skills!</td>
                  <td className="px-6 py-4 whitespace-nowrap">2025-03-05</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Negative
                    </span>
                  </td>
                  <td className="px-6 py-4">Audio quality could improve</td>
                  <td className="px-6 py-4 whitespace-nowrap">2025-03-04</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            AI Recommendations
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mic2 className="h-5 w-5 text-blue-600 mt-1" />
              <p>Many users request improved audio quality – consider upgrading mic.</p>
            </div>
            <div className="flex items-start space-x-3">
              <Smile className="h-5 w-5 text-yellow-600 mt-1" />
              <p>Positive response to humor segments – include more comedic elements.</p>
            </div>
            <div className="flex items-start space-x-3">
              <Film className="h-5 w-5 text-purple-600 mt-1" />
              <p>Frequent mentions of editing style – maintain consistent editing quality.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                <HelpCircle className="h-5 w-5 mr-1" />
                Support
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-1" />
                Docs
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
            </div>
            <button className="text-gray-600 hover:text-gray-900 flex items-center">
              <AlertCircle className="h-5 w-5 mr-1" />
              Report Issue
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;