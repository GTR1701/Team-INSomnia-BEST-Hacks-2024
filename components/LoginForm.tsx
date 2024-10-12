"use client"

import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { loginUser } from "@/actions/loginUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { setCookie } from "cookies-next";
import Link from "next/link";

export default function LoginForm() {
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: "",
			password: "", 
		},
	})

	const router = useRouter()
	const updateUser = useUserStore((state) => state.setLoggedInUser)

	const [loginResponse, setLoginResponse] = useState('')

	const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
		const loginStatus = await loginUser(data)
		setLoginResponse(loginStatus.message)
		if (loginStatus.message === 'Logged in') {
			updateUser(loginStatus.uuid)
			setCookie('currentUser', {'uuid': loginStatus.uuid, 'userType': loginStatus.userType})
			router.push('/courses')
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} method="post" className="space-y-8 mt-16 bg-neutral-900 custom-shadow m-20 py-10 px-5 rounded-md">
				<h2 className="text-slate-100 font-medium text-3xl text-center">Zaloguj sie</h2>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Username" type="text" className="w-[80%] mx-auto  text-white placeholder:text-gray-400 focus:placeholder-transparent" {...field} />
							</FormControl>
							<FormMessage className="w-[80%] mx-auto" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input 
								placeholder="Password" 
								type="password" 
								className="w-[80%] mx-auto text-white placeholder:text-gray-400 focus:placeholder-transparent" 
								{...field} 
								/>
							</FormControl>
							<FormMessage className="w-[80%] mx-auto" />
						</FormItem>
					)}
				/>
				<div>
					<Link className="text-slate-100 hover:text-purple-500" href="register">nie masz konta? Zarejestruj się</Link>
				</div>
				

				{loginResponse && loginResponse !== 'Logged in' && <p className="text-sm mx-auto w-[80%] text-[#ef3f3b]">{loginResponse}</p>}
				
				<Button variant="accept" type="submit" className="mx-auto block w-[80%] mt-20">Login</Button>
			</form>
		</Form>
	);
};
