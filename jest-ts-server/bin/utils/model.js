"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    constructor(model, status = 200) {
        this.model = model;
        this.status = status;
    }
    send(res) {
        if (this.status === 0)
            return; //response is already sent.
        //send the response
        res.status(this.status).send(this.model);
    }
}
exports.Model = Model;
Model.resolved = new Model(null, 0);
