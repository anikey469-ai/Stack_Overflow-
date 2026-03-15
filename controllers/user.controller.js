// input from the client from the request body.
// that the user has entered the values of the parameters or not
// check that the user with the email or username is already registered or not
// register kar do
// server se respond send kar do

import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    const { displayName, email, password, username, department, role } =
        req.body;

    if (
        !displayName ||
        !email ||
        !password ||
        !username ||
        !department ||
        !role
    ) {
        throw new ApiError(
            400,
            "All fields are required to fill by the client"
        );
    }

    // TODO check the role that it is user or admin if not then throw error

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new ApiError(
            400,
            "Email or username already exists in the database"
        );
    }

    const newUser = await User.create({
        displayName,
        email,
        password,
        username,
        department,
        role,
    });

    const checkSaveUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    );

    if (!checkSaveUser) {
        throw new ApiError(
            500,
            "User registration failed due to server error."
        );
    }

    return res
        .status(201)
        .json(
            new APiResponse(201, checkSaveUser, "User registered Successfully.")
        );
});

export { registerUser };