import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    EmailIsAlreadyInUseResponse,
    InvalidIdResponse,
    InvalidPasswordResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    checkIfIdIsValid,
    badRequest,
    serverError,
    ok,
} from './helpers/index.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)
            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const params = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            const someFieldsNotAllowed = Object.keys(params).some(
                (fields) => !allowedFields.includes(fields),
            )

            if (someFieldsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)

                if (!passwordIsValid) {
                    return InvalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)
                if (!emailIsValid) {
                    return EmailIsAlreadyInUseResponse()
                }
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
