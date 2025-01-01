import { Admin } from '../models/admin.model.js';
import { ApiError } from '../utilis/ApiError.js'
import { asyncHandler } from '../utilis/asyncHandler.js';
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler (async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            throw new ApiError(401, 'Unauthorized request')
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const admin = await Admin.findById(decodedToken?._id).select('-password -refreshToken')

        if (!admin) {
            throw new ApiError(401, 'invalid access token')
        }

        req.admin = admin
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || 'invalid method')
    }
})

export { verifyJWT }