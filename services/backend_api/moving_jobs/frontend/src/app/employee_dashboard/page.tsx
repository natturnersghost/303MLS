'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DM_Serif_Text } from 'next/font/google'

const dmSerifText = DM_Serif_Text({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

type ApiResponse = {
  success?: boolean
  error?: string
  data?: unknown
  // Add other possible response fields
}

export default function EmployeeDashboard() {
  const router = useRouter()
  const [result, setResult] = useState<ApiResponse | null>(null)
  const [userId, setUserId] = useState('')
  const [jobId, setJobId] = useState('')

  const baseUrl = 'http://localhost:8000' // Adjust this to your API URL

  const handleRequest = async (endpoint: string, method: string, body?: Record<string, unknown>) => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      })
      
      const data: ApiResponse = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Request failed:', error)  // Log the error
      setResult({ error: 'Request failed' })
    }
  }

  const handleDelete = async (type: 'job' | 'user', id: string) => {
    if (!id) {
      setResult({ error: `Please enter a ${type} ID` })
      return
    }
    
    if (!confirm(`Are you sure you want to delete this ${type}?`)) {
      return
    }

    try {
      const response = await fetch(`${baseUrl}/${type}/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error)  // Log the error
      setResult({ error: `Failed to delete ${type}` })
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-black-50 to-gray-100 p-8 ${dmSerifText.className}`}>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="relative pb-16 bg-gradient-to-r from-gray-900 to-gray-600 text-white rounded-t-lg">
          <div className="absolute top-2 right-2">
            <Image
              src="/303MLSlogo.png"
              alt="303 Moving And Labor Solutions Logo"
              width={150}
              height={75}
              className="rounded-lg shadow-md bg-white p-2 cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="pt-6">
            <CardTitle className="text-5xl font-bold">Employee Dashboard</CardTitle>
            <CardDescription className="text-xl text-gray-100"></CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="space-y-8">
            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="jobs" className="text-lg">Job Operations</TabsTrigger>
                <TabsTrigger value="users" className="text-lg">User Operations</TabsTrigger>
              </TabsList>
              <TabsContent value="jobs">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-black-600">Job Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-4">
                      <Button onClick={() => router.push('/new_job')} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Create Job</Button>
                      <Button onClick={() => router.push('/all_jobs')} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Get All Jobs</Button>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap gap-4">
                      <Input 
                        type="text" 
                        placeholder="Enter Job ID" 
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                        className="flex-grow"
                      />
                      <Button onClick={() => handleRequest(`/job/${jobId}`, 'GET')} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Get Job</Button>
                      <Button onClick={() => handleRequest(`/job/${jobId}/bill`, 'GET')} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Get Bill</Button>
                      <Button onClick={() => router.push(`/update_job?id=${jobId}`)} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Update Job</Button>
                      <Button 
                        onClick={() => handleDelete('job', jobId)} 
                        variant="destructive" 
                        className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105"
                      >
                        Delete Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-black-600">User Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-4">
                      <Button onClick={() => router.push('/new_user')} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Create User</Button>
                      <Button onClick={() => router.push('/all_users')} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Get All Users</Button>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap gap-4">
                      <Input 
                        type="text" 
                        placeholder="Enter User ID" 
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="flex-grow"
                      />
                      <Button onClick={() => handleRequest(`/user/${userId}`, 'GET')} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Get User</Button>
                      <Button onClick={() => router.push(`/update_user?id=${userId}`)} className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105">Update User</Button>
                      <Button 
                        onClick={() => handleDelete('user', userId)} 
                        variant="destructive" 
                        className="flex-grow shadow-lg border border-gray-200 transition-transform hover:scale-105"
                      >
                        Delete User
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700">Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-gray-50">
                    <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-center text-gray-500 text-sm">
          © 2023 303 Moving And Labor Solutions. All rights reserved.
        </CardFooter>
      </Card>
    </div>
  )
}

