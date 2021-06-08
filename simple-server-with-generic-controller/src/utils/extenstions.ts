
declare global {
    interface Array<T> {
        intersect(other: Array<T>): Array<T>;
        anyMatch(other:Array<T>):boolean;
        allMatch(other:Array<T>):boolean;
    }
}

Array.prototype.intersect= function<T>(other:T[]):T[]{
    return this.filter((item:any)=> other.indexOf(item)!=-1);
}

Array.prototype.anyMatch=function<T>(other:T[] ){

    return this.intersect(other).length>0;
}

Array.prototype.allMatch=function<T>(other:T[]){
    return this.intersect(other).length===other.length;
}


export {}