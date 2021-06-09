import {isPrime} from '../../utils/primes'


xdescribe('isprime tests',()=>{

    test('isPrime should return true for 2',()=>{

        let result=isPrime(2);
        expect(result).toBeTruthy();
    });
    
    test('isPrime should return false for 8',()=>{
        expect(isPrime(8)).toBeFalsy();
    })
    
    
    it('should return false for 0',()=>{
        expect(isPrime(0)).toBeFalsy();
    })
    

});
