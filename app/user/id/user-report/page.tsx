'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Clock, MapPin, ThumbsUp, MessageSquare, FileText, Award, TrendingUp, Eye, Search, Filter } from 'lucide-react'

// Mock data for demonstration
const reports = [
  { id: 1, title: "Pothole on Main St", location: "123 Main St", date: "2023-06-15", status: "Resolved", type: "Roads", description: "Large pothole causing traffic issues", images: ["https://th.bing.com/th/id/OIP.PR-xkQ2VtSdJxL1_rXtOrQHaE8?rs=1&pid=ImgDetMain"], comments: [{ user: "John Doe", text: "This has been fixed quickly!", date: "2023-06-18" }] },
  { id: 2, title: "Broken streetlight", location: "456 Elm St", date: "2023-06-20", status: "InProgress", type: "Lighting", description: "Streetlight flickering and sometimes not working", images: ["https://th.bing.com/th/id/OIP.PR-xkQ2VtSdJxL1_rXtOrQHaE8?rs=1&pid=ImgDetMain"], comments: [{ user: "Jane Smith", text: "I noticed this too. Hope it gets fixed soon.", date: "2023-06-22" }] },
  { id: 3, title: "Graffiti in Central Park", location: "Central Park", date: "2023-06-25", status: "Pending", type: "Parks", description: "Graffiti on the main pavilion", images: ["https://th.bing.com/th/id/OIP.PR-xkQ2VtSdJxL1_rXtOrQHaE8?rs=1&pid=ImgDetMain"], comments: [] },
  // Add more mock reports as needed
]

const statusColors = {
  Resolved: "bg-green-500",
  InProgress: "bg-blue-500",
  Pending: "bg-yellow-500",
}

export default function YourReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [selectedReport, setSelectedReport] = useState(null)

  const filteredReports = reports.filter(report => 
    (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === "All" || report.status === statusFilter) &&
    (typeFilter === "All" || report.type === typeFilter)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Reports</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <FileText className="h-10 w-10 text-primary" />
              <div>
                <p className="text-2xl font-bold">{reports.length}</p>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === "Resolved").length}</p>
                <p className="text-sm text-muted-foreground">Resolved Issues</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-10 w-10 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{Math.round((reports.filter(r => r.status === "Resolved").length / reports.length) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filter and Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Roads">Roads</SelectItem>
                  <SelectItem value="Lighting">Lighting</SelectItem>
                  <SelectItem value="Parks">Parks</SelectItem>
                  <SelectItem value="Sanitation">Sanitation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[report.status]}>{report.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{selectedReport?.title}</DialogTitle>
                          <DialogDescription>
                            Reported on {selectedReport?.date}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Location</Label>
                              <p>{selectedReport?.location}</p>
                            </div>
                            <div>
                              <Label>Status: </Label>
                              <Badge className={statusColors[selectedReport?.status]}>{selectedReport?.status}</Badge>
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <p>{selectedReport?.description}</p>
                          </div>
                          <div>
                            <Label>Images</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {selectedReport?.images.map((img, index) => (
                                <img key={index} src={img} alt={`Report image ${index + 1}`} className="rounded-md" />
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label>Comments</Label>
                            {selectedReport?.comments.length > 0 ? (
                              <ul className="space-y-2">
                                {selectedReport.comments.map((comment, index) => (
                                  <li key={index} className="bg-muted p-2 rounded-md">
                                    
                                    <div className='flex flex-1'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXg4OC9vb3f39/Kysrc3Ny+vr7Q0NDHx8fNzc3ExMTU1NTV1dXY2NjBwcG6urrLy8vXjdnDAAAEKElEQVR4nO3d63KrIBQF4IAIBgXf/22P5GpbEwGVzfasb6bTv6zhoiCQywUAAAAAAAAAAAAAAAAAAAAAAABgiVTW6k5bqyR1UQ6gbOP8RAgR/rnGKuoi7ao3bcg251vTUxdrN/31d7xHyOs5Miq3nO+W0Z2grXaf890ydtQF3Eh+aKDzpsp6YFXtSr6gZdxSh4h8wUBd0FwqMqAQTGtRxjTRR0Pl2Rev0QGFuFIXNsfKY+Injg+N2FHmid9ok9JGA3bt1Ka00cBb6iIncokBhXDURU7Tp1bhVIm8JhqpvTBg1RPj32bmOL3Z6PRGymysMVl1aKiLHU+mj6SB4/N2qnIa6dRM+XTEITMhnze3rIFmSqipCx6tywooBJ8JxvkTNpkJG+qCRzt/HZ4/oc5MyGcszZg7BYzmT+d/p0lYKZ3jtGqaMwHmNQXOmx/yGWj+hzn++ddp0pdLmS1iTDLqkLrIiZLHGlbjTJC8VMNokeYhsScyemN7SVtRZLSS+JLUTvm10SDlsc/qYf8WPYni2AnvbGRCZs/6uT4qINsaDIb1mWLLZ6V7kTQrexMNy1H0B/tne/AsX8u4C77J7kNG33b8K/BO6oV9wt7ps+S7Ud30ivOMOf13HdOH/DdqsF1jjGk6O5wwHgAAAAAAAMBFymn2a3U3Nk1jpr8xXDswKHmGVYwwrzeu9Y/LBmarNEHrDOf5vhy0ccKvnnT2whk9sKvOYUz+BjzyWftW+iqydgyJq2bQYnPjcQlpt8R7hax2pV91m+M9Q1a5XDysfGRKDGlqG3f2zVdfRpW3n3TNtZa2Kse96+/Jj1W8CHz7Aro5YgVfUNe+Ym/OSP0VPGInwla0OxmS7r7IRXlnxsEt9BWRalufPOYZsYTmLqnMYyN5WoqA5WowINieWTYgwVmFpswg8+YLHzDNOE+xOWLR1xtZPF9QsivmHmXepmA7zTu4tV252RRNFRasxKLP+rlih0wzDzJvV2xPf+5x++1KzTLybhDaQ6lJRt4NQnsodafb+evw/GNp5FGY/RU8XFN8ZhGUnV1QDDZlr46keDMtvMZfvisWP+GWeWNZLorD7Id9j1kMOJYPWGw9+BaQaE244IowTcByEQlvPSkTkfRal9Wfr9jOE99bc/hwQ/bh6eXgT4g1XLife8FenCpurTnwS3ctZ/XVQeONr2ZDzVGrbxV0wbdh/wmjq6SFPsmdp/2+qWI71A/Dl18fS85XWwU+6L0G1baKZ8QStc9HqaaeIfQvtbk7+qrzBRvrsfp8gfp0W8tq9fG5DkRak7yp3Qtj63tAfKG0Wz0QNIvnXeXnLBYpa+IeH63h+8Oyt9NdX+pyqjuOp7p+kaq/H2Lzs98D9vcja/2pfvtYDb21WndaW9vzPXQIAAAAAAAAAAAAAAAAAAAAAAAAh/oHOVI0YSQb7ewAAAAASUVORK5CYII=" alt="User avatar" className="h-8 w-8 rounded-full mr-4" />
                                    <p className="font-semibold ">{comment.user}</p></div>
                                    <p>{comment.text}</p>
                                    <p className="text-sm text-muted-foreground">{comment.date}</p>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No comments yet.</p>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}