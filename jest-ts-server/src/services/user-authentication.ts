import dotenv from 'dotenv';
import Exception from '../utils/exception';
import getUserModel from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateRequiredField } from '../utils/helper';
import user from '../models/user';

dotenv.config();

export const verifyUser = async (request: any) => {

    if (!request.headers.authorization)
        throw new Exception("No Authorization Header", 401);
    const token = request.headers.authorization.split(' ')[1];

    if (!token)
        throw new Exception("No Authorization Header", 401);

    const tokenUser: any = await jwt.verify(token, `${process.env.JWT_SECRET}`);
    const dbUser = await getUserModel().findById(tokenUser.id);

    if (!dbUser)
        throw new Exception('Invalid Credentials', 401);
    else {
        request.user = dbUser;
        return dbUser;
    }

}

export const authorize = (...roles: string[]) => {

    return async (request: any, response: any, next: any) => {
        try{
            const user= await verifyUser(request);
            console.log(user,roles);
            if(!roles.length)
                return next(); //nothing to authorize

           

            if(!user.roles || !user.roles.length)
                throw new Exception("User not authorized for the action",403);

            
            let match= roles.anyMatch(user.roles);
            if(match)
                return next();
            else
                throw new Exception("User not authorzied for the action",403);

        } catch(error){
            if(error.send)
                error.send(request,response);
            else
                response.status(401).send({message:error.message});
        }

    }

}

export const authenticate=async (request:any, response:any, next:any)=>{
    try{
        await verifyUser(request);
        return next();
    }catch(error){
        if(error.send)
            error.send(request,response);
        else
            response.status(401).send({message:error.message});
    }
}

export const _authenticate = async (request: any, response: any, next: any) => {
    try {
        const User = getUserModel();
        console.log('request.headers', request.headers);

        if (!request.headers.authorization)
            throw new Exception("No Authorization Header", 401);
        const token = request.headers.authorization.split(' ')[1];
        console.log('token', token);

        if (!token)
            throw new Exception("No Authorization Header", 401);

        const tokenUser: any = await jwt.verify(token, `${process.env.JWT_SECRET}`);
        console.log('token user', tokenUser);

        const dbUser = await User.findById(tokenUser.id);

        if (!dbUser)
            throw new Exception('Invalid Credentials', 401);
        else {
            request.user = tokenUser;
            console.log('request.user', request.user);

        }
        next();

    } catch (err) {
        //console.log('authentication middleware error',err.message);
        if (err.send)
            await err.send(request, response);
        else
            await response.status(401).send({ message: err.message });

    }

}


export const register = async (user: any) => {

    
    validateRequiredField(user, "name", "password", "email");

    const User = getUserModel();
    try {
        
        
        user.password = await bcrypt.hash(user.password, 10);        
        console.log('user',user);
        let result = await User.create(user);
        console.log('result',result);
        
        return _generateToken(result);

    } catch (error) {
        throw new Exception(error.message, 400);
    }


}

export const login = async (credentials: any) => {
    //  console.log('credentials',credentials);

    validateRequiredField(credentials, "email", "password");
    const User = getUserModel();
    let user = await User.findOne({ email: credentials.email });
    if (!user)
        throw new Exception("invalid username/password", 401);

    //  console.log('db user',user);
   
    let match = await bcrypt.compare(credentials.password, user.password);
    if (match) {
        return _generateToken(user);
    }
    else {
        throw new Exception("invalid username/password", 401);
        //return response.status(401).json({success:false,message:'Incorrect Password'});
    }

}

export const getCurrentUser = async (model:any,request:any) =>{
    let user=request.user;
    return {name:user.name, email:user.email, roles:user.roles};
}



function _generateToken(user: any) {
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1D' });
    return { name: user.name, email: user.email, roles:user.roles, token };
}

