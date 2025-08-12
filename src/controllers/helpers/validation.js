import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const InvalidIdResponse = () => {
    return badRequest({
        message: 'The provided Id is not valid.',
    })
}
