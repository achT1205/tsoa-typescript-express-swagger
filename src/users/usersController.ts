import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    Response,
    SuccessResponse,
} from "tsoa";
import { User } from "./user";
import { UsersService, UserCreationParams } from "./usersService";


interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("/users")
export class UsersController extends Controller {
    @Get("/{id}")
    public async getUser(
        @Path() id: number,
        @Query() name?: string
    ): Promise<User> {
        return new UsersService().get(id, name);
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        new UsersService().create(requestBody);
        return;
    }
}