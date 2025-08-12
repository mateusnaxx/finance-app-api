import {
    InvalidIdResponse,
    checkIfIdIsValid,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'
export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return userNotFoundResponse()
            }

            return ok(user)
        } catch (error) {
            console.log('Error in GetUserByIdController:', error)
            return serverError()
        }
    }
}
