import { badRequest, notFound } from './http.js'
import validator from 'validator'

export const InvalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be at least 6 characters long',
    })
}

export const EmailIsAlreadyInUseResponse = () => {
    return badRequest({
        message: 'Invalid e-mail. Please provide a valid e-mail address.',
    })
}

export const notFoundResponse = () => {
    return notFound({
        message: 'User not found',
    })
}

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)
