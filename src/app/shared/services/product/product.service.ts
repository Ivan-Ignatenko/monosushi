import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { IProductRequest, IProductResponce } from '../../interfaces/product/product.interface';
import { CollectionReference, Firestore, collectionData, deleteDoc, doc, docData, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { DocumentData, addDoc, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<DocumentData> {

  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) { 
    this.productCollection = collection(this.afs, 'products');
  }

  getAll() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  async getAllByCategory(name: string) {
    const productCollectionRef = collection(this.afs, 'products');
    const q = query(productCollectionRef, where('category.path','==',name));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc =>({id:doc.id,...doc.data()})) as IProductResponce[];
    return products;
  }

  async getAllRolls(name: string) {
    const productCollectionRef = collection(this.afs, 'products');
    const q = query(productCollectionRef, where('category.path','==',name));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc =>({id:doc.id,...doc.data()})) as IProductResponce[];
    return products;
  }

  createProduct(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateProduct(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  deleteProduct(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }

  resolve(route: ActivatedRouteSnapshot) {
    const productDocumentReference = doc(this.afs, `products/${route.paramMap.get('id')}`);
    return docData(productDocumentReference, { idField: 'id' });
  }
}