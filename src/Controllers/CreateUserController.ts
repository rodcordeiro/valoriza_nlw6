import { Request, Response } from "express"
import { CreateUserServices } from "../Services/CreateUserService"

class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email, admin} = req.body
        console.log({origin:"controller",name, email, admin})
        const createUserService = new CreateUserServices()
        const user = await createUserService.execute({name, email, admin})
        return res.json(user)
    }
}

export {
    CreateUserController
}