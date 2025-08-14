import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    InvalidIdResponse,
    checkIfIdIsValid,
    badRequest,
    serverError,
    ok,
} from '../helpers/index.js'
import { updateUserSchema } from '../../schemas/user.js'
import { ZodError } from 'zod'

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

            await updateUserSchema.parseAsync(params)

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.issues[0].message
                return badRequest({ message: errorMessage })
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
