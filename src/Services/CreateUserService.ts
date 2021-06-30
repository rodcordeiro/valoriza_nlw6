import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../database/repositories/User"

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserServices {
    async execute({name, email, admin} : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository)
        console.log({origin:"services",name, email, admin})
        
        if (!email){
            throw new Error("Email incorrect");
        }
        const userAlreadyExists = await usersRepository.findOne({email})
        
        if(userAlreadyExists){
            throw new Error("User already exists");
        }
        
        const user = usersRepository.create({name, email, admin})
        await usersRepository.save(user)

        return user;
    }
}



export {
    IUserRequest,
    CreateUserServices
}