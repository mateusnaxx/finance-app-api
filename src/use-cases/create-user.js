import { v4 as uuidv4 } from 'uuid'
import { bcrypt } from 'bcrypt'
import { postgresCreateUsersRepository } from '../repositories/postgres/create-users.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: verificar se e-mail ja existe

        //gerar ID do usuario
        const userId = uuidv4()

        //criptografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //inserir usuario no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositório para criar o usuário
        const postgresCreateUserRepository = new postgresCreateUsersRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
