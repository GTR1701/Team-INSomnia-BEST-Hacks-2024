//@ts-nocheck
"use client";

import { AddLessonSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { getCookie } from "cookies-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { Course } from "@prisma/client";
import { createLesson } from "@/data/queries";

type Props = {
    courses: { id: string, title: string }[];
}

export default function AddLesson({courses}: Readonly<Props>) {
	const form = useForm<z.infer<typeof AddLessonSchema>>({
		resolver: zodResolver(AddLessonSchema),
		defaultValues: {
			lessonName: "",
			course: "",
			route: "",
			description: "",
			codeEditorDefault: "",
			codeEditorSolution: "",
			nextLesson: "",
			previousLesson: "",
			reward: 10,
		},
	});
    const currentUser = getCookie('currentUser')

	const router = useRouter();
	const updateUser = useUserStore((state) => state.setLoggedInUser);

	const [createLessonResponse, setCreateLessonResponse] = useState("");
    const [open, setOpen] = useState(false)

	const onSubmit = async (data: z.infer<typeof AddLessonSchema>) => {
        console.log(data)
        await createLesson(data).then((e) => router.push("/admin"));
    };

    return currentUser?.toString().includes("Administrator") && (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                method="post"
                className="space-y-8 mt-16 text-white"
            >
                <FormField
                    control={form.control}
                    name="lessonName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Tytuł Lekcji"
                                    type="text"
                                    className="w-[80%] mx-auto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-[80%] mx-auto" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="route"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Ścieżka (np. /lekcja-1)"
                                    type="text"
                                    className="w-[80%] mx-auto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-[80%] mx-auto" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Treść Lekcji"
                                    type="text"
                                    className="w-[80%] mx-auto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-[80%] mx-auto" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="codeEditorDefault"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Domyslny Kod w Edytorze"
                                    type="text"
                                    className="w-[80%] mx-auto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-[80%] mx-auto" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="codeEditorSolution"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Rozwiązanie w Edytorze"
                                    type="text"
                                    className="w-[80%] mx-auto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-[80%] mx-auto" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nextLesson"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Ścieżka Następnej Lekcji"
                                    type="text"
                                    className="w-[80%] mx-auto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-[80%] mx-auto" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="previousLesson"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Ścieżka Poprzedniej Lekcji"
                                    type="text"
                                    className="w-[80%] mx-auto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-[80%] mx-auto" />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="reward"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Nagroda w Postaci Ilości Punktów"
                                    type="number"
                                    className="w-[80%] mx-auto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-[80%] mx-auto" />
                        </FormItem>
                    )}
                /> */}
                <FormField
                    control={form.control}
                    name="course"
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
                                                ? courses.find(
                                                        (course) =>
                                                            course.id ===
                                                            field.value
                                                  )?.title
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
                                                {courses.map(
                                                    (course, index) => (
                                                        <CommandItem
                                                            value={
                                                                course.id
                                                            }
                                                            key={
                                                                course.id
                                                            }
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "course",
                                                                    course.id
                                                                );
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            {
                                                                course.title
                                                            }
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    course.id ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    )
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />
                {createLessonResponse && createLessonResponse !== "Logged in" && (
                    <p className="text-sm mx-auto w-[80%] text-[#ef3f3b]">
                        {createLessonResponse}
                    </p>
                )}
                <Button type="submit" className="mx-auto block w-[80%] mt-20">
                    Stwórz Lekcję
                </Button>
            </form>
        </Form>
    );
}
