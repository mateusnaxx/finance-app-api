import { z } from 'zod'
import validator from 'validator'

export const createTransactionSchema = z.object({
    user_id: z.uuid({ error: 'User ID must be a valid UUID.' }),
    name: z
        .string({ error: 'Name is required.' })
        .trim()
        .min(1, { message: 'Name is required.' }),
    date: z.coerce.date({ error: 'Date is required.' }),
    type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
        error: 'Type must be EARNING, EXPENSE or INVESTMENT',
    }),
    amount: z
        .number({ error: 'Amount must be a number.' })
        .min(1, { message: 'Amount must be greater than 0.' })
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: '.',
            }),
        ),
})

/* export const updateTransactionSchema = createTransactionSchema
    .partial()
    .strict()
 */
