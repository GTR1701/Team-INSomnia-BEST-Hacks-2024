"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function Navbar() {
	const loggedInUser = useUserStore((state) => state.loggedInUser)
    const updateUser = useUserStore((state) => state.setLoggedInUser)

	return (
		<nav className="bg-purple-700 p-4 sticky top-0 z-20">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/">
					<div className="flex">
						<h1 className="text-3xl font-bold">CodeWise</h1>
						<Image
							className="w-20 h-20 "
							src="/logobn.png"
							alt=""
							width={500}
							height={500}
						/>
					</div>
				</Link>
				{loggedInUser && (
					<ul className="flex space-x-10">
						<li>
							<Link
								href="/courses"
								className="text-white hover:text-purple-300"
							>
								Kursy
							</Link>
						</li>
						{/* <li>
                    <Link
                        href="#"
                        className="text-white hover:text-purple-300"
                    >
                        Leaderboard
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="text-white hover:text-purple-300"
                    >
                        Community
                        </Link>
                        </li> */}
					</ul>
				)}
				<Button
					className="bg-white text-black px-4 py-2 rounded-lg hover:bg-purple-500"
					asChild
				>
                    {!loggedInUser ? (
                        <Link href="/auth/login">Login</Link>
                    ) : (
                        <Link href="/" onClick={() => {deleteCookie("currentUser"); updateUser(undefined)}}>Logout</Link>
                    )}
				</Button>
			</div>
		</nav>
	);
}
