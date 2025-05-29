"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Activity, Users, DollarSign, Settings } from "lucide-react"
import { useState } from "react"

interface TollBooth {
  id: string
  name: string
  location: string
  status: "active" | "maintenance" | "offline"
  dailyRevenue: number
  vehicleCount: number
  avgWaitTime: number
  fee: number
}

export default function TollBoothDashboard() {
  const [booths, setBooths] = useState<TollBooth[]>([
    {
      id: "TB001",
      name: "Highway 101 North",
      location: "Mile 45.2",
      status: "active",
      dailyRevenue: 1250.75,
      vehicleCount: 234,
      avgWaitTime: 1.8,
      fee: 5.5,
    },
    {
      id: "TB002",
      name: "Interstate 95 South",
      location: "Mile 78.9",
      status: "active",
      dailyRevenue: 1890.25,
      vehicleCount: 312,
      avgWaitTime: 2.1,
      fee: 7.25,
    },
    {
      id: "TB003",
      name: "Route 66 East",
      location: "Mile 12.4",
      status: "maintenance",
      dailyRevenue: 0,
      vehicleCount: 0,
      avgWaitTime: 0,
      fee: 4.75,
    },
    {
      id: "TB004",
      name: "Pacific Coast Highway",
      location: "Mile 156.7",
      status: "active",
      dailyRevenue: 2100.5,
      vehicleCount: 445,
      avgWaitTime: 1.5,
      fee: 6.0,
    },
    {
      id: "TB005",
      name: "Golden Gate Bridge",
      location: "San Francisco",
      status: "active",
      dailyRevenue: 3250.0,
      vehicleCount: 567,
      avgWaitTime: 3.2,
      fee: 8.5,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-4 w-4 text-green-600" />
      case "maintenance":
        return <Settings className="h-4 w-4 text-yellow-600" />
      case "offline":
        return <Activity className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Toll Booth Management
          </CardTitle>
          <CardDescription>Monitor and manage all toll booth operations in real-time</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booths.map((booth) => (
          <Card key={booth.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{booth.name}</CardTitle>
                <Badge className={getStatusColor(booth.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(booth.status)}
                    {booth.status}
                  </div>
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {booth.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Daily Revenue</div>
                  <div className="font-bold text-blue-600">${booth.dailyRevenue.toFixed(2)}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Users className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Vehicles</div>
                  <div className="font-bold text-green-600">{booth.vehicleCount}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Toll Fee:</span>
                  <span className="font-medium">${booth.fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Wait Time:</span>
                  <span className="font-medium">{booth.avgWaitTime}s</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-1" />
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Activity className="h-4 w-4 mr-1" />
                  Monitor
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
