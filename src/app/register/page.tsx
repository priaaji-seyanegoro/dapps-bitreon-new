"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { post } from '@/services/api';
import Image from 'next/image';
import BitreonLogo from '@/assets/images/bitreon_logo.png'

interface RegisterResponse {
  message: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to the dashboard if already logged in
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const data = await post<RegisterResponse>('/api/user/register', { username, password });
      toast.success('Registration successful! Please sign in.');
      router.push('/login');
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a1a3e] text-white">
      {/* Left Section - Promotional Content */}
      <div className="flex items-center justify-center w-full md:w-1/2 lg:w-2/5 bg-[#040d20] p-8">
        <div className="text-center md:text-left">
          <div className='flex flex-row items-center space-x-2 mb-4'>
            <Image
              priority
              src={BitreonLogo}
              alt="Bitreon Cloud"
              width={48}
              height={48}
            />
            <h2 className="text-3xl md:text-4xl font-bold">Bitreon</h2>
          </div>
          <p className="text-gray-400">
            Effortlessly deploy your web projects and focus on creating exceptional digital experiences.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 lg:w-3/5 p-8 bg-[#0a1a3e]">
        <div className="w-full max-w-md">
          <h2 className="mb-2 text-2xl font-semibold text-white">Sign Up</h2>
          <p className="mb-10 text-gray-400">Enter your details below</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Username
              </label>
              <input
                required
                type="text"
                id="username"
                placeholder="username"
                className="w-full p-3 bg-[#1d2e57] rounded-lg border border-[#1d2e57] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                placeholder="password"
                className="w-full p-3 bg-[#1d2e57] rounded-lg border border-[#1d2e57] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Confirmation Password
              </label>
              <input
                required
                type="password"
                id="confirmPassword"
                placeholder="confirm password"
                className="mb-6 w-full p-3 bg-[#1d2e57] rounded-lg border border-[#1d2e57] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 font-semibold text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}