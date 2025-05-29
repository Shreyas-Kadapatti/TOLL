"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Car, Shield, Search, ExternalLink } from "lucide-react"
import { useState } from "react"

interface Transaction {
  id: string
  vehicleNumber: string
  vehicleType: string
  tollBooth: string
  amount: number
  timestamp: string
  blockchainHash: string
  status: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.tollBooth.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVehicleIcon = (type: string) => {
    return <Car className="h-4 w-4" />
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Transaction History
        </CardTitle>
        <CardDescription>All transactions are verified and stored on the blockchain</CardDescription>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by vehicle number or toll booth..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "Start by making your first toll payment"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Toll Booth</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Blockchain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getVehicleIcon(transaction.vehicleType)}
                        <div>
                          <div className="font-medium">{transaction.vehicleNumber}</div>
                          <div className="text-sm text-gray-500 capitalize">{transaction.vehicleType}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.tollBooth}</TableCell>
                    <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(transaction.timestamp).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.timestamp).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Shield className="h-3 w-3 mr-1" />
                        <span className="font-mono text-xs">{transaction.blockchainHash.substring(0, 8)}...</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
