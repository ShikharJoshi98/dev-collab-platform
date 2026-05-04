import jwt from 'jsonwebtoken';
import serverConfig from '../config/serverConfig';

export const generateToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        serverConfig.JWT_SECRET as string,
        {
            expiresIn: "7d"
        }
    );
};