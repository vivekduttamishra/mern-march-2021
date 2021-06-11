import { Response } from 'express';

export class FakeExpress {

    public response: Partial<Response>;
    public responseData: any = '';
    constructor(private request: any) {
        this.response = {
            statusCode: 200,
            status: jest.fn().mockImplementation((code) => {
                this.response.statusCode = code;
                return this.response;
            }),
            json: jest.fn().mockImplementation((param) => {
                this.responseData = param;
                return this.response;
            }),
            send: jest.fn().mockImplementation((data) => {
                console.log('send got', data);
                this.responseData = data;
                return this.response;
            }),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        }
    }

    async handleRequest(fn: Function) {

        await fn(this.request, this.response);

    }

    async get(fn: Function) {
        this.request.method = "GET";
        await fn(this.request, this.response);
    }

    async post(fn: Function) {
        this.request.method = "POST";
        await fn(this.request, this.response);
    }


}