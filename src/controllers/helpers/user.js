import { badRequest, notFound } from './http.js'

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

export const userNotFoundResponse = () => {
    return notFound({
        message: 'User not found',
    })
}
