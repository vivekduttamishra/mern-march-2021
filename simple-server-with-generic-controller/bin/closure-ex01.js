"use strict";
/*
    HOW IS CLOUSURE CREATED
      a. you have a outer function that may take some parameter (generally takes some)
      b. it defines an inner function that may takes it's own parameters
      c. it returns the inner function
      
    WHY DO WE USE CLOSURE
    
    A Closure can ---

    a. help us pass additional parameters.
    b. help us perform additional actionss around any given function.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var untangledcode;
(function (untangledcode) {
    const delay = (time) => new Promise(resolve => setTimeout(resolve, time));
    const measurePeformance = (fn) => {
        let inner = (...params) => __awaiter(this, void 0, void 0, function* () {
            //performance measure code part 1
            const start = new Date().getTime(); //BUG FIX 1: new Date().getUTCMilliseconds();
            //actual business logic part 1
            const result = yield fn(...params);
            //performance measure code part 2
            const end = new Date().getTime(); //BUG FIX 2: new Date().getMilliseconds();
            console.log(`total time taken ${end - start} ms`);
            //actual business logic part 2
            return result;
        });
        return inner;
    };
    let getBookById = (id) => __awaiter(this, void 0, void 0, function* () {
        yield delay(Math.floor(Math.random() * 2000));
        return { id, title: 'The Accursed God' };
    });
    let getAllBooks = () => __awaiter(this, void 0, void 0, function* () {
        yield delay(Math.floor(Math.random() * 2000));
        return [
            { id: "1", title: 'The Accursed God' },
            { id: "2", title: 'Rashmirathi' },
        ];
    });
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getAllBooks', getAllBooks);
            getAllBooks = measurePeformance(getAllBooks);
            console.log('getAllBooks', getAllBooks);
            const books = yield getAllBooks();
            console.log('books', books);
            getBookById = measurePeformance(getBookById);
            const book = yield getBookById("24");
            console.log('book', book);
        });
    }
    main();
})(untangledcode || (untangledcode = {}));
