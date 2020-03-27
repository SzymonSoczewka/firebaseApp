import * as admin from 'firebase-admin';
import {OrderRepository} from './order.repository';
import {Product} from "../models/products";
import {Order_line} from "../models/order_line";
import {Order} from "../models/order";

export class OrderRepositoryFirebase implements OrderRepository {
  topProductsPath = 'top-products';

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  createOrder(product: Product, timesPurchased: number): Promise<any> {
    const order_lines: Order_line[] = [];
    const order_line: Order_line = {count: timesPurchased, productBought: product};
    order_lines.push(order_line);

    return this.db().collection('orders').add({
      order_lines: order_lines
    });
  }

  updateProductInOrder(product: Product): Promise<any> {
    const ordersCollection = this.db().collection("orders");

    return ordersCollection.get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          const order = doc.data() as Order;
          if(order.order_lines[0].productBought.id === product.id) {
            order.order_lines[0].productBought = product;
            console.log("orderID: "+ doc.id);
            return ordersCollection.doc(`${doc.id}`).set(order)
              .catch(() => console.log("\"decreaseStockCount: \"Stock updated"))
              .then(() => console.log("\"decreaseStockCount: \"Stock update failed"));
          } else {
            return Promise.resolve();
          }
        });
      })
      .catch(function(error) {
        console.log("\"decreaseStockCount: \" Error getting documents: ", error);
      });
  }
}