import { Product } from './product';


export class Category {



    constructor(
        public id : any = null,
        public name: string = '',
        
        public products : Product[]
        ){}
}
