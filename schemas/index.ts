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

export const FetchExpensesFormSchema = z.object({
    name: z.string(),
    type: z.string(),
    date: z.object({
        from: z.date(),
        to: z.date()
    }, { message: 'Podaj przedział dat' })
})

export const TransactionDataTableSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    amount: z.number(),
    date: z.date()
})

export const AddExpenseFormSchema = z.object({
    name: z.string().min(1, { message: 'Wymagany tytuł transakcji' }),
    type: z.string().min(1, { message: 'Wymagany typ transakcji' }),
    amount: z.number().min(0.01, { message: 'Wymagana kwota transakcji' }),
})