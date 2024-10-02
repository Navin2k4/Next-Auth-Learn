"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs } from "@/components/ui/tabs"
import { MapPin, Calendar, ThumbsUp, MessageSquare, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from 'next/link'

// function ImageSlider({ images }) {
//   const [currentIndex, setCurrentIndex] = useState(0)

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
//   }
//   return (
//     <div className="relative w-full h-72 overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover p-2"
//           />
//         </div>
//       ))}
//       <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>
//       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`mb-1  w-2 h-2 rounded-full ${
//               index === currentIndex ? 'bg-white' : 'bg-gray-400'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
type Issue = {
  id: string
  image: string
  location: string
  maplocation:string
  severity: 'Critical' | 'Major' | 'Minor'
  description: string
  reportedBy: string
  reportedAt: string
  status: 'Completed' | 'In Progress' | 'Pending'
  upvotes: number
  comments: number
}

const index = {
    1: "completed",
    2: "in-progress",
    3: "pending"
};

const issuesData: Issue[] = [
  {
    id: "1",
    image: "/assets/images/image.png",
    location: "Main Street Bridge",
    maplocation:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.158861547604!2d76.9657623!3d11.101535499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7000afa766b%3A0x2b5757b8d520a3af!2sSri Ramakrishna Engineering College!5e0!3m2!1sen!2sin!4v1727586721876!5m2!1sen!2sin",
    severity: "Major",
    description: "Large crack in the bridge surface, now repaired.",
    reportedBy: "Jane Doe",
    reportedAt: "2023-06-15 09:30 AM",
    status: "Completed",
    upvotes: 88,
    comments: 15
  },
  {
    id: "2",
    image: "/assets/images/image.png",
    location: "City Park Fountain",
    maplocation:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.158861547604!2d76.9657623!3d11.101535499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7000afa766b%3A0x2b5757b8d520a3af!2sSri Ramakrishna Engineering College!5e0!3m2!1sen!2sin!4v1727586721876!5m2!1sen!2sin",
    severity: "Minor",
    description: "Fountain not working properly, repairs underway.",
    reportedBy: "John Smith",
    reportedAt: "2023-06-18 14:45 PM",
    status: "In Progress",
    upvotes: 42,
    comments: 8
  },
  {
    id: "3",
    image: "/assets/images/image.png",
    location: "Downtown Crosswalk",
    maplocation:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.158861547604!2d76.9657623!3d11.101535499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7000afa766b%3A0x2b5757b8d520a3af!2sSri Ramakrishna Engineering College!5e0!3m2!1sen!2sin!4v1727586721876!5m2!1sen!2sin",
    severity: "Critical",
    description: "Faded crosswalk markings, needs immediate repainting.",
    reportedBy: "Alice Johnson",
    reportedAt: "2023-06-20 11:15 AM",
    status: "Pending",
    upvotes: 100,
    comments: 22
  },
]

function IssueCard({ issue }: { issue: Issue }) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "bg-red-500"
      case "major": return "bg-orange-500"
      case "minor": return "bg-yellow-500"
      default: return "bg-blue-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-500"
      case "in progress": return "bg-blue-500"
      case "pending": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  const images = [issue.image, issue.image, issue.image]

  return (
    <Card className="mb-8 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
    <CardHeader className="p-0">
      <div className="relative flex flex-col sm:flex-row">
        <div className="sm:w-1/2">
          {/* <ImageSlider images={images} /> */}
        </div>
        <div className="sm:w-1/2 h-72 p-2 sm:p-4 flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.158861547604!2d76.9657623!3d11.101535499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7000afa766b%3A0x2b5757b8d520a3af!2sSri%20Ramakrishna%20Engineering%20College!5e0!3m2!1sen!2sin!4v1727586721876!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
        <Badge className={`absolute top-4 right-4 ${getSeverityColor(issue.severity)} px-3 py-1 text-xs font-semibold rounded-full z-10 shadow-md`}>
          {issue.severity}
        </Badge>
      </div>
    </CardHeader>
    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
      <CardTitle className="text-2xl font-bold mb-2 text-gray-800">{issue.location}</CardTitle>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
        <div className="flex items-center mr-6 mb-2">
          <MapPin className="w-5 h-5 mr-2 text-gray-400" />
          <span>{issue.location}</span>
        </div>
        <div className="flex items-center mb-2">
          <Calendar className="w-5 h-5 mr-2 text-gray-400" />
          <span>{issue.reportedAt}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="w-10 h-10 mr-3 border-2 border-white shadow-md">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-gray-200 text-gray-600 text-lg font-semibold">{issue.reportedBy[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-700">Reported by <span className="font-semibold text-gray-900">{issue.reportedBy}</span></span>
      </div>
    </div>
    <CardFooter className="bg-gray-100 px-6 py-4 flex flex-wrap justify-between items-center">
      <div className="flex space-x-3 mb-2 sm:mb-0">
        <Badge variant="secondary" className="flex items-center bg-white text-gray-700 shadow-sm px-3 py-1">
          <ThumbsUp className="w-4 h-4 mr-2 text-blue-500" />
          {issue.upvotes}
        </Badge>
        <Badge variant="secondary" className="flex items-center bg-white text-gray-700 shadow-sm px-3 py-1">
          <MessageSquare className="w-4 h-4 mr-2 text-green-500" />
          {issue.comments}
        </Badge>
      </div>
      <div className="flex items-center">
        <Badge className={`${getStatusColor(issue.status)} mr-3 px-3 py-1 text-xs font-semibold rounded-full shadow-sm`}>
          {issue.status}
        </Badge>
        {/* <Link href={`/issue/id/${index[Number(issue.id)]}`}>
          <Button variant="ghost" size="sm" className="hover:bg-gray-200 transition-colors duration-200 rounded-full">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link> */}
      </div>
    </CardFooter>
  </Card>
  )
}

export default function IssuesPage() {
  const [activeTab, setActiveTab] = useState<'completed' | 'inProgress' | 'pending'>('completed')

  const filteredIssues = issuesData.filter(issue => {
    if (activeTab === 'completed') return issue.status === 'Completed'
    if (activeTab === 'inProgress') return issue.status === 'In Progress'
    if (activeTab === 'pending') return issue.status === 'Pending'
    return false
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Community Issues</h1>
      {/* <Tabs>
        <Tab label="Completed" onClick={() => setActiveTab('completed')}>
          {filteredIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </Tab>
        <Tab label="In Progress" onClick={() => setActiveTab('inProgress')}>
          {filteredIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </Tab>
        <Tab label="Pending" onClick={() => setActiveTab('pending')}>
          {filteredIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </Tab>
      </Tabs> */}
    </div>
  )
}