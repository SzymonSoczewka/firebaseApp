
import * as admin from 'firebase-admin';
import {ProductRepository} from './product.repository';

export class ProductRepositoryFirebase implements ProductRepository {
  topProductsPath = 'top-products';


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  doSth(x: string): any {
    return null;
  }


}
