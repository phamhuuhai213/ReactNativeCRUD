import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Product } from '../constants/Types';

export type ProductWithId = Product & { _docId: string };

export function subscribeProducts(
  callback: (products: ProductWithId[]) => void,
) {
  return onSnapshot(collection(db, 'products'), (snapshot) => {
    const list = snapshot.docs.map(
      (d) =>
        ({
          ...d.data(),
          _docId: d.id,
        }) as ProductWithId,
    );
    callback(list);
  });
}

export function deleteProduct(docId: string) {
  return deleteDoc(doc(db, 'products', docId));
}

export function addProduct(data: Omit<Product, 'gia'> & { gia: number }) {
  return addDoc(collection(db, 'products'), data);
}

export function updateProduct(
  docId: string,
  data: Omit<Product, 'gia'> & { gia: number },
) {
  return updateDoc(doc(db, 'products', docId), data);
}
