import React from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';
import { FiBell, FiLogOut, FiUser } from 'react-icons/fi';
import AuthService from '@/services/auth';
import Image from 'next/image';
import { isLoggedIn, getJwt, login, generatePayload, logout } from '@/app/actions/login';
import { client } from '@/app/client';
import { ConnectButton, darkTheme } from 'thirdweb/react';
import { createWallet } from "thirdweb/wallets";

interface AppBarProps {
    username: string;
    avatarUrl: string;
}

const AppBar: React.FC<AppBarProps> = ({ username, avatarUrl }) => {
    const router = useRouter();
    const wallets = [
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),
        createWallet("io.zerion.wallet"),
        createWallet("io.rabby"),
        createWallet("com.binance"),
    ];

    const handleLogout = () => {
        AuthService.logout(router);
    };


    return (
        <div className="flex justify-between items-center px-6 py-4 bg-[#040d20] text-white">
            <div className="flex items-center space-x-4">
                {/* <div className="flex items-center space-x-2">
                    <Image src={avatarUrl} alt="Avatar" height={8} width={8} className="rounded-full" />
                    <span>{username}</span>
                </div>
                <FiBell className="w-6 h-6 cursor-pointer" /> */}
            </div>
            {/* <FiLogOut onClick={handleLogout} className='w-5 h-5' color='#2d91f5' /> */}
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
    );
};

export default AppBar;
