import getUserModel from '../../models/user';
import {configureDb} from '../../config/mongoose-connection';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe("user-model tests",()=>{


    let connection:any=null;
    let UserModel:any=null;
    beforeAll(async()=>{
        console.log('process.env.NODE_ENV',process.env.NODE_ENV);
        
        //console.log('connecting to datbase');
        await configureDb();
        UserModel=getUserModel();
        console.log('connected...');
        connection=mongoose.connection;
    });

    beforeEach(async()=>{
        await mongoose.connection.db.dropCollection("users");
        await UserModel.create(new UserModel({name:"Vivek",email:"vivek@email.com",password:"pass"}));
        await UserModel.create(new UserModel({name:"Admin",email:"admin@email.com",password:"pass"}));
    });

    afterAll(async()=>{
        //console.log('disconnecting database');
        await mongoose.connection.close();
    });

    it('has 2 users in the database',async()=>{
        
        const users=await UserModel.find();

        expect(users.length).toBe(2);

        //await expect(UserModel.countDocuments()).toBe(4);

    });

    it('can create new user',async()=>{
        //console.log("testing create new user");
        const name="New Name";
        const user:any=await UserModel.create(new UserModel({name:name,email:"new@email.com",password:"pass"}));

        expect(user._id).not.toBeNull();

        let dbUser= await UserModel.findById(user._id);

        expect(dbUser.name).toStrictEqual(name);

    });

    it('fails to create a new user with missing required fields',async()=>{
       // console.log("testing create new user failure");
        const name="New Name";
        const user=new UserModel({name:name,password:"pass"});

        // try{
        //     await UserModel.create(user);

        // }catch(err){
        //     console.log(err.message);
        //     expect(err).not.toBeNull();
        //     expect(err.message).toMatch(/Path `email` is required/);
        // }

        await expect( UserModel.create(user)).rejects.toThrow(/Path `email` is required/);
    });

    it('returns user with valid email address',()=>{
       // console.log("testing get valid user");
    });

    it('returns undefined with invalid email address',()=>{
       // console.log("testing get invalid user");
    });


});
