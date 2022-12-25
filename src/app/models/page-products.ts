import { Product } from './product';

export interface PageProducts {

    products : Product[];
    page : number;
    size : number;
    totalPages: number;
}
