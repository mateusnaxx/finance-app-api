import { GetUserByIdUseCase } from '../use-cases/index.js'
import {
    InvalidIdResponse,
    checkIfIdIsValid,
    notFound,
    ok,
    serverError,
} from './helpers/index.js'
export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

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
