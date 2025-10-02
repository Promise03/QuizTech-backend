import httpStatus from "http-status";
import jwt from 'jsonwebtoken';

const authorizeUser = (req, res, next) => {
    const autHeader = req.headers.authorization;
    if(!autHeader || !autHeader.startsWith("Bearer")){
        return res.status(httpStatus.UNAUTHORIZED).json({
            stattus: 'Unauthorized',
            message: "Token not Provided!"
        });
    }

    const token = autHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded)
        req.user = decoded;
        next();
    }catch(e){
        console.log("JWT Error:", e.message)
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: "Unauthorized",
            message: "Unauthorized: Token failed!"
        });
    }
};

const checkRole = (...allowedRoles) =>{
return (req, res, next) => {
    console.log("Allowed Roles:", allowedRoles);
    console.log("User Role:", req.user.role)
    if (!allowedRoles.includes(req.user.role)){
        return res.status(httpStatus.FORBIDDEN).json({
            status: "Forbidden",
            message: "forbidden: Acess denied!",
        })
    }
    next()
}
}

export { authorizeUser, checkRole}