import * as z from 'zod';

export const LoginSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }).max(50),
    password: z.string().min(1, { message: 'Password is required' })
})

export const RegisterSchema = z.object({
    username: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }).max(50),
    password: z.string().min(8, { message: 'Hasło musi zawierać co najmniej 8 znaków' }),
    passwordConfirmation: z.string(),
    userType: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
            code: "custom",
            message: 'Hasła muszą być takie same',
            path: ['passwordConfirmation'],
        });
    }
})

export const AddCourseSchema = z.object({
    title: z.string().min(1, { message: 'Podaj Tytuł' }),
    description: z.string().min(1, { message: 'Podaj Opis' }),
    price: z.string().min(1, { message: 'Podaj Cenę' }),
    lessons: z.number().min(1, { message: 'Podaj Liczbę Lekcji' }),
    level: z.string().min(1, { message: 'Podaj Poziom Zaawansowania' }),
    image: z.string().min(1, { message: 'Podaj Link do Obrazu' }),
    category: z.string().min(1, { message: 'Podaj Kategorię' }),
    rating: z.number().min(1, { message: 'Podaj Ocenę' }),
})

export const AddLessonSchema = z.object({
    lessonName: z.string().min(1, { message: 'Podaj Nazwę Lekcji' }),
    course: z.string().min(1, { message: 'Wybierz Kurs' }),
    route: z.string().min(1, { message: 'Podaj Ścieżkę' }),
    description: z.string().min(1, { message: 'Podaj Opis' }),
    codeEditorDefault: z.string().min(1, { message: 'Podaj Domyślny Kod' }),
    codeEditorSolution: z.string().min(1, { message: 'Podaj Rozwiązanie' }),
    nextLesson: z.string().min(1, { message: 'Podaj Następną Lekcję' }),
    previousLesson: z.string().min(1, { message: 'Podaj Poprzednią Lekcję' }),
    reward: z.number().min(1, { message: 'Podaj Nagrodę w Postaci Ilości Punktów' }),
})