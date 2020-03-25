import {StockRepository} from "./stock.repository";
import {Product} from "../models/products";

export class StockService {
  constructor(private stockRepo: StockRepository) {
  }
  stockProductCreate(product: Product): Promise<any>{
    return this.stockRepo.stockProductCreate(product);
  }

  decreaseStockCount(difference: number, productID: any):Promise<any> {
    return this.stockRepo.decreaseStockCount(difference,productID);
  }
}
