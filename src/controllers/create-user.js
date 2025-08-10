import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers/http.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    EmailIsAlreadyInUseResponse,
    InvalidPasswordResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
} from './helpers/user.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `Missing required field: ${field}`,
                    })
                }
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return InvalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)
            if (!emailIsValid) {
                return EmailIsAlreadyInUseResponse()
            }

            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute(params)

            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
