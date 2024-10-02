import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, MapPin, ThumbsUp, MessageSquare, Users, TrendingUp } from 'lucide-react'

const dashboardData = {
  totalIssues: 1250,
  resolvedIssues: 980,
  pendingIssues: 270,
  totalUsers: 5000,
  activeUsers: 3200,
  totalUpvotes: 15000,
  totalComments: 8500,
  issuesByCategory: [
    { name: 'Roads', count: 450 },
    { name: 'Sanitation', count: 320 },
    { name: 'Lighting', count: 280 },
    { name: 'Parks', count: 200 },
  ],
  issuesByMonth: [
    { name: 'Jan', reported: 65, resolved: 50 },
    { name: 'Feb', reported: 80, resolved: 70 },
    { name: 'Mar', reported: 95, resolved: 85 },
    { name: 'Apr', reported: 110, resolved: 100 },
    { name: 'May', reported: 130, resolved: 115 },
    { name: 'Jun', reported: 150, resolved: 130 },
  ],
  topLocations: [
    { name: 'Downtown', issues: 300 },
    { name: 'Midtown', issues: 250 },
    { name: 'Uptown', issues: 200 },
    { name: 'Suburb A', issues: 150 },
    { name: 'Suburb B', issues: 100 },
  ]
}

const COLORS = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']

export default function DashboardPage() {
  const maxReportedIssues = Math.max(...dashboardData.issuesByMonth.map(item => item.reported))
  const maxResolvedIssues = Math.max(...dashboardData.issuesByMonth.map(item => item.resolved))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Urban Uplift Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalIssues}</div>
            <Progress 
              value={(dashboardData.resolvedIssues / dashboardData.totalIssues) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {dashboardData.resolvedIssues} resolved, {dashboardData.pendingIssues} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalUsers}</div>
            <Progress 
              value={(dashboardData.activeUsers / dashboardData.totalUsers) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {dashboardData.activeUsers} active users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Upvotes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalUpvotes}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Across all reported issues
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalComments}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Community engagement
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64">
              {dashboardData.issuesByCategory.map((category, index) => (
                <div key={index} className="flex flex-col items-center justify-end flex-1">
                  <div 
                    className={`w-full ${COLORS[index]} rounded-t`} 
                    style={{height: `${(category.count / Math.max(...dashboardData.issuesByCategory.map(c => c.count))) * 100}%`}}
                  ></div>
                  <p className="text-xs mt-2">{category.name}</p>
                  <p className="text-xs font-bold">{category.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Issues Reported vs Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64">
              {dashboardData.issuesByMonth.map((month, index) => (
                <div key={index} className="flex flex-col items-center justify-end flex-1">
                  <div className="w-full flex justify-center space-x-1">
                    <div 
                      className="w-1/3 bg-blue-500 rounded-t" 
                      style={{height: `${(month.reported / maxReportedIssues) * 100}%`}}
                    ></div>
                    <div 
                      className="w-1/3 bg-green-500 rounded-t" 
                      style={{height: `${(month.resolved / maxResolvedIssues) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-xs mt-2">{month.name}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs">Reported</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs">Resolved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topLocations.map((location, index) => (
                <div key={index} className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{location.name}</span>
                      <span className="text-sm text-muted-foreground">{location.issues} issues</span>
                    </div>
                    <Progress value={(location.issues / dashboardData.topLocations[0].issues) * 100} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Badge className="mr-2" variant="secondary"><AlertTriangle className="h-4 w-4" /></Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">New issue reported in Downtown</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge className="mr-2" variant="secondary"><CheckCircle className="h-4 w-4" /></Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">Issue resolved in Midtown</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge className="mr-2" variant="secondary"><ThumbsUp className="h-4 w-4" /></Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">50 new upvotes on Lighting issue</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge className="mr-2" variant="secondary"><Users className="h-4 w-4" /></Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">100 new users joined</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge className="mr-2" variant="secondary"><TrendingUp className="h-4 w-4" /></Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">20% increase in issue resolution rate</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}