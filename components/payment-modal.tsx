"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, CreditCard, Shield, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (transaction: any) => void
}

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    tollBooth: "",
    amount: 0,
  })
  const { toast } = useToast()

  const tollBooths = [
    { id: "TB001", name: "Highway 101 North", fee: 5.5 },
    { id: "TB002", name: "Interstate 95 South", fee: 7.25 },
    { id: "TB003", name: "Route 66 East", fee: 4.75 },
    { id: "TB004", name: "Pacific Coast Highway", fee: 6.0 },
    { id: "TB005", name: "Golden Gate Bridge", fee: 8.5 },
  ]

  const vehicleTypes = [
    { type: "car", label: "Car", multiplier: 1 },
    { type: "motorcycle", label: "Motorcycle", multiplier: 0.5 },
    { type: "truck", label: "Truck", multiplier: 2 },
    { type: "bus", label: "Bus", multiplier: 1.5 },
  ]

  const handleBoothChange = (boothId: string) => {
    const booth = tollBooths.find((b) => b.id === boothId)
    const vehicleType = vehicleTypes.find((v) => v.type === formData.vehicleType)
    const multiplier = vehicleType?.multiplier || 1

    setFormData((prev) => ({
      ...prev,
      tollBooth: boothId,
      amount: booth ? booth.fee * multiplier : 0,
    }))
  }

  const handleVehicleTypeChange = (type: string) => {
    const booth = tollBooths.find((b) => b.id === formData.tollBooth)
    const vehicleType = vehicleTypes.find((v) => v.type === type)
    const multiplier = vehicleType?.multiplier || 1

    setFormData((prev) => ({
      ...prev,
      vehicleType: type,
      amount: booth ? booth.fee * multiplier : 0,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Payment Successful!",
          description: `Transaction verified on blockchain. Hash: ${result.transaction.blockchainHash.substring(0, 16)}...`,
        })
        onSuccess(result.transaction)
        onClose()
        setFormData({ vehicleNumber: "", vehicleType: "", tollBooth: "", amount: 0 })
      } else {
        throw new Error(result.error || "Payment failed")
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Toll Payment
          </DialogTitle>
          <DialogDescription>Complete your toll payment with blockchain verification</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
            <Input
              id="vehicleNumber"
              placeholder="ABC-1234"
              value={formData.vehicleNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, vehicleNumber: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select value={formData.vehicleType} onValueChange={handleVehicleTypeChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type.type} value={type.type}>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tollBooth">Toll Booth</Label>
            <Select value={formData.tollBooth} onValueChange={handleBoothChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select toll booth" />
              </SelectTrigger>
              <SelectContent>
                {tollBooths.map((booth) => (
                  <SelectItem key={booth.id} value={booth.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{booth.name}</span>
                      <Badge variant="secondary">${booth.fee}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.amount > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Total Amount</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">${formData.amount.toFixed(2)}</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">Secured by blockchain technology</p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.vehicleNumber || !formData.vehicleType || !formData.tollBooth}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay ${formData.amount.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
