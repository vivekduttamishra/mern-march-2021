import { assert } from 'console';
import {findPrimesCb,findPrimesEvents,findPrimesPromise} from '../../utils/primes';
import {doneCallback} from '../../utils/test-utils';

describe('asyncrhonous findPrimes tests',()=>{

    xdescribe('findPrimesCb Tests',()=>{

        it('should return 4 primes between 2 and 10',(done)=>{

            findPrimesCb(2,10, (err:any,result:any)=>{
                try{
                    expect(err).toBeNull();                 
                    expect(result.length).toBe(4);
                    done(); 
                } catch(err){
                    done(err);
                }
            });
        });

        it('should return 25 primes between 2 and 100',(done)=>{

            findPrimesCb(2,100, doneCallback((err:any,result:any)=>{
                expect(err).toBeNull(); 
                expect(result.length).toBe(25);

            },done));
        });

    });

    xdescribe('findPrimesEvents Tests',()=>{

        it('should return 25 primes between 0 and 100',done=>{

            findPrimesEvents(0,100)
            .on('prime',(e:any)=>{
                console.log(e);
            })
            .on('end',doneCallback((event:any)=>{

                expect(event.count).toBe(25);

            },done));

        })

    });


    describe('findPrimesPromise Tests',()=>{

        it('should return 4 primes between 0 and 10',done=>{

            findPrimesPromise(2,10)
                .then(doneCallback((primes:any)=>{
                    expect(primes.length).toBe(4); 
                },done));
        });


        it('should return error for invalid range',done=>{

            findPrimesPromise(10,2)
                .catch(doneCallback((err:any)=>{
                    expect(err.message).toMatch(/Invalid Range/);
                    },done));                
        }); 

        it('should return 25 primes between 0 and 100',()=>{

          return findPrimesPromise(0,100)
            .then((primes:number[])=>{
                expect(primes.length).toBe(25);
            });
        });

        it('should return 25 primes between 2 and 100',async()=>{

            let primes=await findPrimesPromise(2,100);

            expect(primes.length).toBe(25);
            
        });


        it('should return all primes under 10', async()=>{


            await expect(findPrimesPromise(0,10))
                    .resolves.toEqual([2,3,5,7]);

        });



        it('should reject the invalid range',async()=>{

            await expect(()=>findPrimesPromise(100,1))
                .rejects
                .toThrow(/Invalid Range/);

        })



    })

    describe('exception handling tests',()=>{

        function test(value:number){
            if(value%2===0)
                return "hello world";
            else
                throw new Error('value must be even');
        }

        it('should return result for even numbers',()=>{
            expect(test(10)).toStrictEqual("hello world");
        });

        it('should throw an error for not evens',()=>{
            try{
                test(3);
            }catch(err){
                expect(err.message).toMatch(/value must be even/);
            }

        });

        
        it('should throw an error for not evens test 2',()=>{
            
            expect(()=>test(3)).toThrow(/value must be even/);

        });

        



    })
})