import axios from 'axios';

describe('testing api using supertest',()=>{
    const baseurl='http://localhost:9000';

    it('should return files related to valid url',async()=>{
        const response=await axios.get(`${baseurl}/test.txt`);

        expect(response.status).toBe(200);
        expect(response.data).toBe('This is a test file')
    });
   
    it('should return 404 for invalid url',async()=>{
        
        await expect(axios.get(`${baseurl}/no-file.txt`)).rejects.toThrow();
        
    })
    it('should return data for valid api call',async()=>{
        const response=await axios.get(`${baseurl}/api/movies/60a766cd3f6ce0b9dcb68700`);

        expect(response.status).toBe(200); 
        expect(response.data.name).toStrictEqual("Chupke Chupke");
    })

    it('should return 404 for invalid api request',async()=>{

        try{
        const response=await axios.get(`${baseurl}/}/api/movies/60a766cd3f6ce0b9dcb60000`);
        } catch(err){
            console.log(err);
            expect(err.response.status).toBe(404);
        }      

        
    })
})