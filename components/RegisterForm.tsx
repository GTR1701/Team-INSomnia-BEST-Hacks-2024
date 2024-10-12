"use client"

import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { setCookie } from "cookies-next";
import { registerUser } from "@/actions/registerUser";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { UserTypes } from "@prisma/client";

type Props = {
    userTypes: UserTypes[]
}

export default function RegisterForm({userTypes}: Readonly<Props>) {
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: "",
			password: "",
            passwordConfirmation: "",
            userType: ""
		},
	})

	const router = useRouter()
	const updateUser = useUserStore((state) => state.setLoggedInUser)

	const [registerResponse, setRegisterResponse] = useState('')
    const [open, setOpen] = useState(false)

	const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
		const registerStatus = await registerUser(data)
		setRegisterResponse(registerStatus.message)
		if (registerStatus.message === 'Logged in') {
			updateUser(registerStatus.uuid)
			setCookie('currentUser', registerStatus.uuid)
			router.push('/login')
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} method="post" className="space-y-8 mt-16">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Username" type="text" className="w-[80%] mx-auto" {...field} />
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
								<Input placeholder="Password" type="password" className="w-[80%] mx-auto" {...field} />
							</FormControl>
							<FormMessage className="w-[80%] mx-auto" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="passwordConfirmation"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Password" type="password" className="w-[80%] mx-auto" {...field} />
							</FormControl>
							<FormMessage className="w-[80%] mx-auto" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="userType"
					render={({ field }) => (
						<FormItem>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[200px] justify-between ml-28",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value
												? userTypes.find(
														(userType) =>
															userType.type ===
															field.value
												  )?.type
												: "Typ transakcji"}
											<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput
											placeholder="Wyszukaj typ..."
											className="h-9"
										/>
										<CommandList>
											<CommandEmpty>
												Nie znaleziono typu.
											</CommandEmpty>
											<CommandGroup>
												{userTypes.map((transactionType) => (
													<CommandItem
														value={transactionType.type}
														key={transactionType.id}
														onSelect={() => {
															form.setValue(
																"userType",
																transactionType.type
															);
															setOpen(false)
														}}
													>
														{transactionType.type}
														<CheckIcon
															className={cn(
																"ml-auto h-4 w-4",
																transactionType.type ===
																	field.value
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</FormItem>
					)}
				/>
				{registerResponse && registerResponse !== 'Logged in' && <p className="text-sm mx-auto w-[80%] text-[#ef3f3b]">{registerResponse}</p>}
				<Button type="submit" className="mx-auto block w-[80%] mt-20">Login</Button>
			</form>
		</Form>
	);
};
