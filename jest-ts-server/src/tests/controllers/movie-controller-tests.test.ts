import MovieController from '../../controllers/movie-controller';
import {FakeExpress} from '../fake-express';

const movieModel={ 
    find:jest.fn(),
    findById:jest.fn(),
    create:jest.fn()

}


describe('movie controller tests',()=>{

    let movieController:MovieController;
    beforeEach(()=>{

        movieModel.findById.mockClear();

        movieController=new MovieController(movieModel);
    });

    it('should get a valid movie by id',async ()=>{

        let request={ params:{id:1}};
        let express=new FakeExpress(request);

        movieModel.findById.mockResolvedValue({
            id:1,
            name:'Sholey'
        });

        await express.handleRequest(movieController.getMovieById);
        
        expect(express.response.statusCode).toBe(200);
        console.log('express.responseData',express.responseData);
        expect(express.responseData.name).toStrictEqual('Sholey');

    });

    it('should get 404 response for invalid id',async ()=>{

        let request={ params:{id:1}};
        let express=new FakeExpress(request);

        
        movieModel.findById.mockResolvedValue(undefined);

        await express.handleRequest(movieController.getMovieById);
        
        expect(express.response.statusCode).toBe(404);        
        expect(express.responseData.id).toStrictEqual(1);

    });


});

