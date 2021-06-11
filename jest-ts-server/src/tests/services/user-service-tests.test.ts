import getUserModel from '../../models/user';
import { mocked } from 'ts-jest/utils';
import { register } from '../../services/user-authentication';
import Exception from '../../utils/exception';

jest.mock('../../models/user', () => {

    const userModel = {
        findOne: jest.fn(),
        create:jest.fn()
    };
    return jest.fn(() => userModel);

});

describe('user service tests', () => {

    let mockedGetUserModel= mocked(getUserModel,true);
        

    describe('register function tests', () => {

        it('should fail to add records without valid fields', async () => {

            let user = { name: 'vivek', password: 'hello' };

            //await expect(register(user)).rejects.toThrow();
            try {
                await register(user);
            } catch (err) {
                expect(err.error.requiredField).toStrictEqual('email');
                expect(err.status).toBe(400);
                expect(mockedGetUserModel).toHaveBeenCalledTimes(0);
            }

        });

        it('should return a valid token for valid object created',async()=>{

            const user={ name:'vivek',email:'vivek@email.com',password:'pass'};

            const create= mockedGetUserModel().create;
            create.mockClear();
            create.mockImplementation(async(user:any)=>{
                return await{
                    ...user,
                    _id:1
                };
            });


            let result= await register(user);

            expect(create).toHaveBeenCalledTimes(1);
            expect(result).not.toBeNull();
            expect(result.email).toStrictEqual(user.email);


        });

        it('should throw exception create fails',async()=>{

            const user={ name:'vivek',email:'vivek@email.com',password:'pass'};

            const create= mockedGetUserModel().create;
            create.mockClear();
            
            create.mockImplementation(async()=>{
                throw new Exception('duplicate email',400);
            });

            try{

             let result= await register(user);

            } catch(err){
                expect(create).toHaveBeenCalledTimes(1);
                expect(err.message).toStrictEqual('duplicate email');
                expect(err.status).toBe(400);
            }
            


        });

    })

});

