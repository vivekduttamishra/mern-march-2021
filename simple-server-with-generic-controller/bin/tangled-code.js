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
var tangledcode;
(function (tangledcode) {
    const delay = (time) => new Promise(resolve => setTimeout(resolve, time));
    const getBookById = (id) => __awaiter(this, void 0, void 0, function* () {
        //performance measure code part 1
        const start = new Date().getTime(); //BUG FIX 1:  new Date().getUTCMilliseconds();
        //actual business logic part 1
        yield delay(Math.floor(Math.random() * 2000));
        const result = { id, title: 'The Accursed God' };
        //performance measure code part 2
        const end = new Date().getTime(); //BUG FIX 2:new Date().getMilliseconds();
        console.log(`getBookById(${id}) took ${end - start} ms`);
        //actual business logic part 2
        return result;
    });
    const getAllBooks = () => __awaiter(this, void 0, void 0, function* () {
        //performance logic part 1
        const start = new Date().getTime(); //BUG FIX 3: new Date().getUTCMilliseconds();
        yield delay(Math.floor(Math.random() * 2000));
        //business logic part 1
        const result = [
            { id: "1", title: 'The Accursed God' },
            { id: "2", title: 'Rashmirathi' },
        ];
        //performance logic part 2
        const end = new Date().getTime(); //BUG FIX 4:new Date().getMilliseconds();
        console.log(`getAllBook() took ${end - start} ms`);
        //business logic part 2
        return result;
    });
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield getBookById("5");
            console.log('book', book);
            const books = yield getAllBooks();
            console.log('books', books);
        });
    }
    main();
})(tangledcode || (tangledcode = {}));
