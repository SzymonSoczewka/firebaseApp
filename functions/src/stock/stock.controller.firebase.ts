import {StockController} from "./stock.controller";
import {StockService} from "./stock.service";
import {Product} from "../models/products";
import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';

export class StockControllerFirebase implements StockController{
  constructor(private stockService: StockService) {
  }
  stockProductCreate(product: Product): Promise<any> {
   return this.stockService.stockProductCreate(product);
  }

  decreaseStockCount(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const productBefore = change.before.data() as Product;
    const productAfter = change.after.data() as Product;
    const difference = productAfter.timesPurchased - productBefore.timesPurchased;
    return this.stockService.decreaseStockCount(difference,context.params.id);
  }

}
