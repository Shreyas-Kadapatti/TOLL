"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Car, Shield, Lock, User, Mail, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface LoginPageProps {
  onLogin: (userData: any) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "operator",
  })
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo credentials
      if (loginData.email === "admin@smarttoll.com" && loginData.password === "admin123") {
        const userData = {
          id: "1",
          name: "Admin User",
          email: loginData.email,
          role: "admin",
        }
        onLogin(userData)
        toast({
          title: "Login Successful!",
          description: "Welcome to SmartToll Blockchain System",
        })
      } else if (loginData.email === "operator@smarttoll.com" && loginData.password === "operator123") {
        const userData = {
          id: "2",
          name: "Toll Operator",
          email: loginData.email,
          role: "operator",
        }
        onLogin(userData)
        toast({
          title: "Login Successful!",
          description: "Welcome back, Toll Operator",
        })
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (registerData.password !== registerData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const userData = {
        id: Date.now().toString(),
        name: registerData.name,
        email: registerData.email,
        role: registerData.role,
      }

      onLogin(userData)
      toast({
        title: "Registration Successful!",
        description: "Your account has been created and verified on the blockchain",
      })
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const demoLogin = (type: "admin" | "operator") => {
    if (type === "admin") {
      setLoginData({ email: "admin@smarttoll.com", password: "admin123" })
    } else {
      setLoginData({ email: "operator@smarttoll.com", password: "operator123" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Car className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">SmartToll</h1>
              <p className="text-blue-600 font-medium">Blockchain System</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Secure Toll Management
              <br />
              <span className="text-blue-600">Powered by Blockchain</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the future of toll collection with our transparent, secure, and efficient blockchain-based
              system.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Blockchain Secured</h3>
                <p className="text-sm text-gray-600">Immutable transaction records</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Real-time Processing</h3>
                <p className="text-sm text-gray-600">Instant payment verification</p>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">Demo Credentials:</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => demoLogin("admin")}
                className="w-full justify-start"
              >
                <User className="h-4 w-4 mr-2" />
                Admin: admin@smarttoll.com / admin123
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => demoLogin("operator")}
                className="w-full justify-start"
              >
                <User className="h-4 w-4 mr-2" />
                Operator: operator@smarttoll.com / operator123
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Sign in to access your toll management dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={registerData.name}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Role</Label>
                      <div className="flex gap-2">
                        <Badge
                          variant={registerData.role === "operator" ? "default" : "outline"}
                          className="cursor-pointer px-3 py-1"
                          onClick={() => setRegisterData((prev) => ({ ...prev, role: "operator" }))}
                        >
                          Toll Operator
                        </Badge>
                        <Badge
                          variant={registerData.role === "admin" ? "default" : "outline"}
                          className="cursor-pointer px-3 py-1"
                          onClick={() => setRegisterData((prev) => ({ ...prev, role: "admin" }))}
                        >
                          Administrator
                        </Badge>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <User className="h-4 w-4 mr-2" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <div className="flex items-center gap-2 justify-center text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  Secured by blockchain technology
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
