import { notFound, ok, serverError } from './helpers/http.js'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { InvalidIdResponse } from './helpers/user.js'
import validator from 'validator'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound({
                    message: 'User not found',
                })
            }

            return ok(user)
        } catch (error) {
            console.log('Error in GetUserByIdController:', error)
            return serverError()
        }
    }
}
