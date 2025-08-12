import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfAmountIsValid = (amount) => {
    const numericAmount = Number(amount)
    if (isNaN(numericAmount) || numericAmount === 0 || numericAmount < 0.01)
        return false

    const amountString = numericAmount.toFixed(2)
    const amountIsValid = validator.isCurrency(amountString, {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
    return amountIsValid
}

export const checkIfTypeIsValid = (type) =>
    ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)

export const invalidAmountResponse = () =>
    badRequest({
        message: 'The amount must be a valid currency',
    })

export const invalidTypeResponse = () =>
    badRequest({
        message: 'The type must be EARNING, EXPENSE, or INVESTMENT.',
    })
