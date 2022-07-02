import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
@Injectable()
export class DBHelper {

    async getData(collection: string, where: Record<string, { opr: FirebaseFirestore.WhereFilterOp, value: string } | any> = {}) {

        let firestore = admin.firestore();
        try {
            let query = await firestore.collection(collection)
            let whereCondition = null;
            for (const key in where) {
                if (where.hasOwnProperty(key)) {
                    const value = where[key];
                    if (Array.isArray(value)) {
                        whereCondition = query.where(key, 'in', value)
                    }
                    else if (typeof value === 'object') {
                        whereCondition = query.where(key, value.opr, value.value)
                    } else {
                        whereCondition = query.where(key, '==', value,)
                    }
                }
            }
            if (whereCondition) {
                let x = await whereCondition.get();
                return x.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
            }
            else {
                let x = await query.get();
                return x.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
            }
        }
        catch (Err) {
            console.log(Err);
            return {
                status: "error",
                message: Err.message
            }
        }
    }

    async getDataById(collection: string, id: string) {
        let firestore = admin.firestore();
        try {
            let x = await firestore.collection(collection).doc(id).get();
            if (!x.exists) {
                return {
                    status: "error",
                    message: "invalid id"
                }
            }
            return x.data();
        }
        catch (err) {
            console.log(err);
            return {
                status: 'error',
                message: err.message
            }
        }
    }

    async addRow(collection: string, data: Record<string, any>) {

        let firestore = admin.firestore();
        try {
            let x = await firestore.collection(collection).add(data);
            return x.id;
        }
        catch (err) {
            console.log(err);
            return {
                status: 'error',
                message: err.message
            }
        }

    }

    // async deleteMany(collection: string, where: Record<string, any>) {
    //     try {
    //         let ref = this.firestore.collection(collection);
    //         for (const key in where) {
    //             if (where.hasOwnProperty(key)) {
    //                 const value = where[key];
    //                 if (Array.isArray(value)) {
    //                     ref.where(key, 'in', where[key])
    //                 } else {
    //                     ref.where(key, '==', where[key])
    //                 }
    //             }
    //         }
    //         let snap = await ref.get();
    //         var batch = this.firestore.batch();
    //         snap.forEach(function (doc) {
    //             // For each doc, add a delete operation to the batch
    //             batch.delete(doc.ref);
    //         });

    //         // Commit the batch
    //         return await batch.commit();
    //     }
    //     catch (err) {
    //         return {
    //             status: 'error',
    //             message: err.message
    //         }
    //     }

    // }

    async deleteById(collection: string, id: string) {
        let firestore = admin.firestore();
        return await firestore.collection(collection).doc(id).delete();
    }

    // async updateMany(collection: string, data: Record<string, any>, where: Record<string, any> = {}) {
    //     try {
    //         let ref = await this.firestore.collection(collection);
    //         for (const key in where) {
    //             if (where.hasOwnProperty(key)) {
    //                 const value = where[key];
    //                 if (Array.isArray(value)) {
    //                     ref.where(key, 'in', where[key])
    //                 } else {
    //                     ref.where(key, '==', where[key])
    //                 }
    //             }
    //         }
    //         let snap = await ref.get();
    //         var batch = this.firestore.batch();
    //         snap.forEach(function (doc) {
    //             // For each doc, add a update operation to the batch
    //             batch.update(doc.ref, data);
    //         });

    //         // Commit the batch
    //         return await batch.commit();

    //     }
    //     catch (err) {
    //         console.log(err);
    //         return {
    //             status: 'error',
    //             message: err.message
    //         }
    //     }
    // }

    async updateById(collection: string, id: string, data: Record<string, any>) {
        let firestore = admin.firestore();
        return await firestore.collection(collection).doc(id).set(data, { merge: true });
    }

    async addById(collection: string, id: string, data: Record<string, any>) {
        let firestore = admin.firestore();
        return await firestore.collection(collection).doc(id).set(data);
    }

}