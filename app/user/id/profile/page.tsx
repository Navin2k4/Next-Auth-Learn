"use client"
import React from 'react'
import { User, Mail, Phone, MapPin, Edit, ThumbsUp, FileText, Award, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import { auth, signOut } from '@/auth'

const ProfilePage = async () => {
  const session = await auth()
  const user = session?.user;

  const userData = {
    name: user?.name || "Unknown User",
    email: user?.email || "No email provided",
    phone: "+1 (555) 123-4567",  
    location: "New York, NY", 
    avatar: user?.image || "/placeholder.svg?height=200&width=200",
    contributions: {
      issuesReported: 15,
      issuesResolved: 8,
      totalUpvotes: 127,
      totalComments: 42
    },
    recentActivity: [
      { type: 'report', description: 'Reported a pothole on Main St', date: '2023-06-20' },
      { type: 'upvote', description: 'Upvoted "Broken streetlight" issue', date: '2023-06-18' },
      { type: 'comment', description: 'Commented on "Park cleanup" event', date: '2023-06-15' },
    ]
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
          <CardTitle>Account Details</CardTitle>
          {user &&
          <CardTitle>{user?.role}</CardTitle>
          }
          
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold mb-4">{userData.name}</h2>
              <Link href='/user/id/profile/edit-profile'>
              <Button className="mb-4 bg-blue-100 text-black hover:text-white hover:bg-blue-600 border-blue-600 border" >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-500" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-500" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>{userData.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contribution Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{userData.contributions.issuesReported}</div>
                <div className="text-sm text-gray-600">Issues Reported</div>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{userData.contributions.issuesResolved}</div>
                <div className="text-sm text-gray-600">Issues Resolved</div>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">{userData.contributions.totalUpvotes}</div>
                <div className="text-sm text-gray-600">Total Upvotes</div>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{userData.contributions.totalComments}</div>
                <div className="text-sm text-gray-600">Total Comments</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contribution Level</h3>
              <Progress value={75} className="w-full mb-2" />
              <p className="text-sm text-gray-600">You're 75% of the way to the next level!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {userData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center mb-4 bg-gray-50 p-4 rounded-lg">
                {activity.type === 'report' && <FileText className="h-6 w-6 mr-4 text-blue-500" />}
                {activity.type === 'upvote' && <ThumbsUp className="h-6 w-6 mr-4 text-green-500" />}
                {activity.type === 'comment' && <Award className="h-6 w-6 mr-4 text-yellow-500" />}
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>


      {/* <Button variant="destructive" className="mt-8">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button> */}
    </div>
  )
}


export default ProfilePage