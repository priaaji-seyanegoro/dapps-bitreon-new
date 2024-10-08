"use client";

import BitreonLogo from "@/assets/images/bitreon_logo.png";
import { post } from "@/services/api";
import AuthService from "@/services/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { sepolia } from "thirdweb/chains";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import {
	generatePayload,
	getJwt,
	isLoggedIn,
	login,
	logout,
} from "../actions/login";
import { client } from "../client";

interface LoginResponse {
	token: string;
}

export default function LoginPage() {
	const router = useRouter();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const wallets = [
		createWallet("io.metamask"),
		createWallet("com.coinbase.wallet"),
		createWallet("me.rainbow"),
		createWallet("io.zerion.wallet"),
		createWallet("io.rabby"),
		createWallet("com.binance"),
	];

	const activeAccount = useActiveAccount();
	console.log({ activeAccount });

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			// Redirect to the dashboard if already logged in
			router.push("/dashboard");
		}
	}, [router]);

	const handleFileSelect = (file: File) => {
		console.log("Selected file:", file);
		// Handle the selected file (e.g., upload to server)
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await AuthService.login({
				username: username,
				password: password,
			});
			toast.success("Welcome to Bitreon");
			router.push("/dashboard");
		} catch (err) {
			console.log(err);
			toast.error("Invalid email or password");
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-[#0a1a3e] text-white">
			{/* Left Section - Promotional Content */}
			<div className="flex items-center justify-center w-full  bg-[#040d20] p-8">
				<div className="text-center md:text-left">
					<div className="flex flex-row items-center space-x-2 mb-4">
						<Image
							priority
							src={BitreonLogo}
							alt="Bitreon Cloud"
							width={48}
							height={48}
						/>
						<h2 className="text-3xl md:text-4xl font-bold">Bitreon dApps</h2>
					</div>
					<p className="text-gray-400 mb-3">
						Effortlessly deploy your web projects and focus on creating
						exceptional digital experiences.
					</p>
					<ConnectButton
						client={client}
						auth={{
							isLoggedIn: async (address) => {
								console.log("checking if logged in!", { address });
								const loggedIn = await isLoggedIn();

								if (loggedIn) {
									const jwt = await getJwt();
									localStorage.setItem("jwt", `${jwt}`);
									router.push("/dashboard");
								}

								return loggedIn;
							},
							doLogin: async (params) => {
								console.log("logging in!");
								await login(params);
							},
							getLoginPayload: async ({ address }) =>
								generatePayload({ address }),
							doLogout: async () => {
								console.log("logging out!");
								await logout();
								router.push("/");
							},
						}}
						wallets={wallets}
						theme={darkTheme({
							colors: {
								modalBg: "#000040",
								borderColor: "#ffffff",
								accentText: "#ffffff",
								separatorLine: "#ffffff",
								tertiaryBg: "#030303",
								connectedButtonBg: "#040d20",
								primaryButtonBg: "#2563eb",
								primaryButtonText: "#ffffff",
								secondaryButtonBg: "#ffffff",
							},
						})}
						connectButton={{ label: "Connect To Wallet" }}
						connectModal={{
							size: "compact",
							title: "Bitreon Connect",
							showThirdwebBranding: false,
						}}
					/>
				</div>
			</div>

			{/* Right Section - Login Form */}
			{/* <div className="flex items-center justify-center w-full md:w-1/2 lg:w-3/5 p-8 bg-[#0a1a3e]">
				<div className="w-full max-w-md">
					<h2 className="mb-2 text-2xl font-semibold text-white">Sign In</h2>
					<p className="mb-10 text-gray-400">
						Enter your account details below
					</p>
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
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium"
							>
								Password
							</label>
							<input
								required
								type="password"
								id="password"
								placeholder="password"
								className="mb-6 w-full p-3 bg-[#1d2e57] rounded-lg border border-[#1d2e57] focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							type="submit"
							className="w-full p-3 font-semibold text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Sign In
						</button>
						

						<div className='w-full'>
							<ConnectButton
								client={client}
								auth={{
									isLoggedIn: async (address) => {
										console.log("checking if logged in!", { address });
										const loggedIn = await isLoggedIn();

										if (loggedIn) {
											const jwt = await getJwt();
											localStorage.setItem("jwt", `${jwt}`);
											router.push("/dashboard");
										}

										return loggedIn;
									},
									doLogin: async (params) => {
										console.log("logging in!");
										await login(params);
									},
									getLoginPayload: async ({ address }) =>
										generatePayload({ address }),
									doLogout: async () => {
										console.log("logging out!");
										await logout();
									},
								}}
								wallets={wallets}
								theme={darkTheme({
									colors: {
										modalBg: "#000040",
										borderColor: "#ffffff",
										accentText: "#ffffff",
										separatorLine: "#ffffff",
										tertiaryBg: "#030303",
										connectedButtonBg: "#040d20",
										primaryButtonBg: "#2563eb",
										primaryButtonText: "#ffffff",
										secondaryButtonBg: "#ffffff",
									},
								})}
								connectButton={{ label: "Connect To Wallet" }}
								connectModal={{
									size: "compact",
									title: "Bitreon Connect",
									showThirdwebBranding: false,
								}}
							/>
						</div>
					</form>

					<p className="mt-8 text-sm text-center text-gray-300">
						Don’t have an account?{" "}
						<a href="/register" className="text-blue-400 hover:underline">
							Sign Up
						</a>
					</p>
				</div>
			</div> */}
		</div>
	);
}
