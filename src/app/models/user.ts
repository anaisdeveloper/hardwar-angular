export class User {


    constructor(
        public id : any = null,
        public username: string = '',
        
        public password: string = '',
        public roles : string[]
        ){}
}
