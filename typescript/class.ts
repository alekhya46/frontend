  export class Animal {
    fName = 'dinosaur';
    constructor(theName :string){
        this.fName = theName;
    }
   walk(distance:number){
        console.log(`the ${this.fName} will walk ${distance} meters`);
    }
};
let obj = new Animal('lion');
obj.walk(200);

class Human extends Animal{
 constructor(theName :string){
     super(theName);
 }
};
let obj1= new Human('cat');
obj1.walk(20);