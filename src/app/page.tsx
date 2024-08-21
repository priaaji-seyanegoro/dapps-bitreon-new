"use client";

import AppButton from "@/components/common/button/AppButton";
import Image from "next/image";
import { useState } from "react";
import { FiGlobe, FiLock, FiMenu, FiX, FiZap } from "react-icons/fi";
import { toast } from "react-toastify";
import LoginPage from "./login/page";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const notify = () => {
    toast.success("This is a success notification!");
  };

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
  //       <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
  //         Get started by editing&nbsp;
  //         <code className="font-mono font-bold">src/app/page.tsx</code>
  //       </p>
  //       <AppButton
  //         label="Start Trading"
  //         onClick={notify}
  //         icon={<FiActivity />} // Replace this with your specific icon
  //       />
  //       <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
  //         <a
  //           className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
  //           href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           By{" "}
  //           <Image
  //             src="/vercel.svg"
  //             alt="Vercel Logo"
  //             className="dark:invert"
  //             width={100}
  //             height={24}
  //             priority
  //           />
  //         </a>
  //       </div>
  //     </div>

  //     <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
  //       <Image
  //         className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  //         src="/next.svg"
  //         alt="Next.js Logo"
  //         width={180}
  //         height={37}
  //         priority
  //       />
  //     </div>

  //     <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
  //       <a
  //         onClick={() => {
  //           toast("Show Toast")
  //         }}
  //         // href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className="mb-3 text-2xl font-semibold">
  //           Docs{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p className="m-0 max-w-[30ch] text-sm opacity-50">
  //           Find in-depth information about Next.js features and API.
  //         </p>
  //       </a>

  //       <a
  //         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className="mb-3 text-2xl font-semibold">
  //           Learn{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p className="m-0 max-w-[30ch] text-sm opacity-50">
  //           Learn about Next.js in an interactive course with&nbsp;quizzes!
  //         </p>
  //       </a>

  //       <a
  //         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className="mb-3 text-2xl font-semibold">
  //           Templates{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p className="m-0 max-w-[30ch] text-sm opacity-50">
  //           Explore starter templates for Next.js.
  //         </p>
  //       </a>

  //       <a
  //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className="mb-3 text-2xl font-semibold">
  //           Deploy{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
  //           Instantly deploy your Next.js site to a shareable URL with Vercel.
  //         </p>
  //       </a>
  //     </div>
  //   </main>
  // );

  // return (
  //   <main className="flex flex-col items-center justify-between min-h-screen p-12 bg-gradient-to-b from-[#000516FF] via-[#0a0a0a] to-gray-900 text-white">
  //     <header className="w-full max-w-6xl mx-auto flex items-center justify-between p-4 lg:p-0">
  //       <div className="text-2xl font-bold text-white">Bitreon</div>

  //       <nav className="hidden lg:flex space-x-6">
  //         <a href="#" className="text-gray-400 hover:text-white">Features</a>
  //         <a href="#" className="text-gray-400 hover:text-white">Integrations</a>
  //         <a href="#" className="text-gray-400 hover:text-white">Pricing</a>
  //         <a href="#" className="text-gray-400 hover:text-white">Docs</a>
  //       </nav>

  //       <div className="hidden lg:flex space-x-4">
  //         <a
  //           href="/register"
  //           className="px-4 py-2 font-semibold text-black bg-white rounded-full hover:bg-gray-200">
  //           Get Started
  //         </a>
  //       </div>

  //       {/* Mobile Menu Button */}
  //       <button
  //         onClick={toggleMobileMenu}
  //         className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
  //       >
  //         {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
  //       </button>
  //     </header>

  //     {/* Mobile Menu */}
  //     {isMobileMenuOpen && (
  //       <>
  //         {/* Overlay */}
  //         <div
  //           onClick={toggleMobileMenu}
  //           className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
  //             }`}
  //         />

  //         {/* Mobile Menu */}
  //         <nav
  //           className={`fixed top-0 left-0 h-full w-64 bg-gray-950 p-6 transition-transform duration-300 ease-in-out z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
  //             }`}
  //         >
  //           <div className="space-y-4 mb-6">
  //             <a href="#" className="block text-gray-300 hover:text-white">
  //               Features
  //             </a>
  //             <a href="#" className="block text-gray-300 hover:text-white">
  //               Integrations
  //             </a>
  //             <a href="#" className="block text-gray-300 hover:text-white">
  //               Pricing
  //             </a>
  //             <a href="#" className="block text-gray-300 hover:text-white">
  //               Docs
  //             </a>
  //           </div>
  //           <a
  //             href="/register"
  //             className="w-full px-4 py-2 font-semibold text-black bg-white rounded-full hover:bg-gray-200">
  //             Get Started
  //           </a>
  //         </nav>
  //       </>
  //     )}

  //     <section className="text-center">
  //       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-sm text-white rounded-full px-4 py-1 mb-8 inline-block">
  //         <span className="flex items-center">
  //           <FiZap className="mr-2" /> New: One-click deployment with GitHub Actions
  //         </span>
  //       </div>

  //       <h1 className="text-3xl md:text-6xl font-extrabold leading-tight max-w-3xl mb-6">
  //         Seamless Deployment for Modern Web Projects
  //       </h1>

  //       <p className="text-gray-400 text-md max-w-3xl mx-auto mb-10">
  //         Deploy your web applications in seconds with Bitreon. Automate your CI/CD workflows, integrate with GitHub, GitLab, and Bitbucket, and enjoy a fast, secure, and scalable hosting platform designed for modern web development.
  //       </p>

  //       <div className="flex justify-center space-x-4">
  //         <a
  //           href="/login"
  //           className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
  //         >
  //           Deploy Now
  //         </a>
  //       </div>

  //       <div className="flex sm:flex-row flex-col items-center justify-center mt-16 gap-8">
  //         <div className="flex items-center space-x-2">
  //           <FiZap className="text-blue-500" />
  //           <p className="text-gray-300">Instant Deployments</p>
  //         </div>
  //         <div className="flex items-center space-x-2">
  //           <FiLock className="text-blue-500" />
  //           <p className="text-gray-300">Enterprise-Grade Security</p>
  //         </div>
  //         <div className="flex items-center space-x-2">
  //           <FiGlobe className="text-blue-500" />
  //           <p className="text-gray-300">Global CDN</p>
  //         </div>
  //       </div>
  //     </section>

  //     <footer className="w-full max-w-6xl mx-auto mt-24 text-center">
  //       <div className="flex justify-center items-center space-x-6">
  //         <p className="text-sm text-gray-400">
  //           © 2024 Bitreon. All rights reserved.
  //         </p>
  //         <a href="#" className="text-sm text-gray-400 hover:text-white">
  //           Privacy Policy
  //         </a>
  //         <a href="#" className="text-sm text-gray-400 hover:text-white">
  //           Terms of Service
  //         </a>
  //       </div>
  //     </footer>
  //   </main>
  // );

  return <LoginPage />
}
