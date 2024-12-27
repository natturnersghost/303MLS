'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function TokenForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tokenInfo, setTokenInfo] = useState<{
    access_token: string;
    token_type: string;
    user_id: number;
    username: string;
  } | null>(null)
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setTokenInfo(null)

    try {
      const response = await fetch('/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
          grant_type: 'password',
        }).toString(),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to sign in');
      }

      const data = await response.json();
      setTokenInfo(data);
      login(data.access_token, data)
      router.push('/employee_dashboard')
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your login credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full mt-4" type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Sign In'}
          </Button>
        </form>
        {isAuthenticated && (
          <Button 
            className="w-full mt-4" 
            onClick={() => router.push('/employee_dashboard')}
          >
            Go to Employee Dashboard
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {tokenInfo && (
          <Alert className="mb-4">
            <AlertTitle>Token Generated Successfully</AlertTitle>
            <AlertDescription>
              <p>Access Token: {tokenInfo.access_token.slice(0, 10)}...</p>
              <p>Token Type: {tokenInfo.token_type}</p>
              <p>User ID: {tokenInfo.user_id}</p>
              <p>Username: {tokenInfo.username}</p>
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  )
}






// "use client";
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useRouter } from 'next/navigation';

// const SignInForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // OAuth2 password flow expects form-urlencoded data
//       const formData = new URLSearchParams();
//       formData.append('username', username);
//       formData.append('password', password);

//       const response = await fetch('/api/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: formData,
//       });

//       let data;
//       try {
//         data = await response.json();
//       } catch (jsonError) {
//         throw new Error('Server returned an invalid response. Please try again later.');
//       }

//       if (!response.ok) {
//         throw new Error(data.detail || 'Sign in failed');
//       }

//       // Store the access token
//       localStorage.setItem('access_token', data.access_token);
      
//       // Reset form
//       setUsername('');
//       setPassword('');
      
//       // Redirect to dashboard
//       router.push('/dashboard');
      
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unexpected error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Sign In</CardTitle>
//       </CardHeader>
//       <form onSubmit={handleSignIn}>
//         <CardContent className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//           <div className="space-y-2">
//             <Input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="w-full"
//             />
//           </div>
//           <div className="space-y-2">
//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full"
//             />
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button 
//             type="submit" 
//             className="w-full"
//             disabled={loading}
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// };

// export default SignInForm;
