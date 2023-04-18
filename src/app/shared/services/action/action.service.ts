import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { IActionRequest } from '../../interfaces/action/action.interface';
import { CollectionReference, Firestore, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { DocumentData, addDoc, collection } from '@firebase/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService implements Resolve<DocumentData> {

  private actionCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.actionCollection = collection(this.afs, 'actions');
  }

  getAll() {
    return collectionData(this.actionCollection, { idField: 'id' }).pipe(
      map(actions => {
        return actions.map(action => {
          return {
            ...action,
            date: action['date'].toDate()
          };
        });
      })
    );
  }

  createAction(action: IActionRequest) {
    return addDoc(this.actionCollection, action);
  }

  updateAction(action: IActionRequest, id: string) {
    const actionDocumentReference = doc(this.afs, `actions/${id}`);
    return updateDoc(actionDocumentReference, { ...action });
  }

  deleteAction(id: string) {
    const actionDocumentReference = doc(this.afs, `actions/${id}`);
    return deleteDoc(actionDocumentReference);
  }

  resolve(route: ActivatedRouteSnapshot) {
    const actionDocumentReference = doc(this.afs, `actions/${route.paramMap.get('id')}`);
    return docData(actionDocumentReference, { idField: 'id' });
  }
}
