import { Injectable } from '@nestjs/common';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { EnvironmentsService } from 'src/config/enviroments.service';
import { PrideContent } from 'src/types/prideContent';

@Injectable()
export class StorePrideService {
  constructor(private readonly env: EnvironmentsService) {}
  prideDB = this.env.firestoreDB.collection('prides');

  prideConverter: FirestoreDataConverter<PrideContent> = {
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>) {
      const timestamp = snapshot.get('createdAt') as Timestamp;
      const createdAt = new Date(timestamp.seconds * 1000);

      const thumbsupUsers = (snapshot.get('thumbsupUsers') || []) as string[];

      return {
        uid: snapshot.id,
        title: snapshot.get('title') || '',
        memo: snapshot.get('memo') || '',
        thumbsupUsers: thumbsupUsers,
        thumbsupCount: snapshot.get('thumbsupCount'),
        createdAt: createdAt,
        userName: snapshot.get('userName') || '',
        userID: snapshot.get('userID') || '',
        userPhotoURL: snapshot.get('userPhotoURL') || '',
      };
    },
    toFirestore(data: PrideContent): DocumentData {
      return {
        title: data.title,
        memo: data.memo,
        thumbsupCount: data.thumbsupCount,
        thumbsupUsers: data.thumbsupUsers,
        createdAt: data.createdAt ? data.createdAt : new Date(),
        userID: data.userID,
        userName: data.userName,
        userPhotoURL: data.userPhotoURL,
      };
    },
  };

  async isExistPride(uid: string) {
    const pride = await this.prideDB.doc(uid).get();
    return pride.exists;
  }

  async getUsersPrideWithInOneMonth(uid: string) {
    const today = new Date();
    const oneMonthAgo =
      today.getMonth() - 1 >= 0
        ? new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        : new Date(today.getFullYear() - 1, 11, today.getDate());
    // TODO:ここが年をまたぐ場合エラー回避
    const prideCollection = await this.prideDB
      .withConverter(this.prideConverter)
      .where('userID', '==', uid)
      .where('createdAt', '>=', oneMonthAgo)
      .orderBy('createdAt', 'desc')
      .get();
    const prides = prideCollection.docs.map((doc) => doc.data());
    //過去一か月のPrideを取得
    return prides;
  }

  async getPridesWithinOneMonth() {
    const today = new Date();
    const oneMonthAgo =
      today.getMonth() - 1 >= 0
        ? new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        : new Date(today.getFullYear() - 1, 11, today.getDate());

    // TODO:年をまたぐ場合にエラー回避
    const prideCollection = await this.prideDB
      .where('createdAt', '>=', oneMonthAgo)
      .orderBy('createdAt', 'desc')
      .withConverter(this.prideConverter)
      .get();
    const prides = prideCollection.docs.map((doc) => doc.data());
    return prides;
  }

  async getPrideWithinOneMonthRanking() {
    const today = new Date();

    const oneMonthAgo =
      today.getMonth() - 1 >= 0
        ? new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        : new Date(today.getFullYear() - 1, 11, today.getDate());
    // TODO:年をまたぐ場合にエラー回避
    const prideCollection = await this.prideDB
      .withConverter(this.prideConverter)
      .where('createdAt', '>', oneMonthAgo)
      .orderBy('createdAt', 'asc')
      .orderBy('thumbsupCount', 'desc')
      .limit(3)
      .get();

    const prides = prideCollection.docs.map((doc) => doc.data());

    return prides;
  }

  async getPridePast() {
    const today = new Date();
    const oneMonthAgo =
      today.getMonth() - 1 >= 0
        ? new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        : new Date(today.getFullYear() - 1, 11, today.getDate());
    const halfYearAgo =
      today.getMonth() - 6 > 0
        ? new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        : new Date(today.getFullYear() - 1, 11 + today.getMonth() - 6, today.getDate());
    // TODO:年をまたぐ場合にエラー回避
    const prideCollection = await this.prideDB
      .where('createdAt', '>=', halfYearAgo)
      .where('createdAt', '<', oneMonthAgo)
      .orderBy('createdAt', 'asc')
      .withConverter(this.prideConverter)
      .get();
    const prides = prideCollection.docs.map((doc) => doc.data());
    return prides;
  }

  async createPride(userID: string, userName: string, userPhotoURL: string, title: string, memo: string) {
    this.prideDB.withConverter(this.prideConverter).add({
      uid: '',
      title: title,
      memo: memo,
      thumbsupUsers: [],
      thumbsupCount: 0,
      userID: userID,
      userName: userName,
      userPhotoURL: userPhotoURL,
    });
  }

  async updatePride(prideID: string, title: string, memo: string) {
    this.prideDB.doc(prideID).withConverter(this.prideConverter).update({
      title: title,
      memo: memo,
    });
  }

  async deletePride(prideID: string) {
    this.prideDB.doc(prideID).delete();
  }

  async ThumbUpPride(prideID: string, userPhoto: string) {
    // 受け取った情報をもとに、いいねを更新する
    const pride = await this.prideDB.doc(prideID).withConverter(this.prideConverter).get();
    const data = pride.data();

    const thumbsupUsers = data.thumbsupUsers;
    const updateThumbsupUsers = thumbsupUsers.includes(userPhoto)
      ? thumbsupUsers.filter((user) => user !== userPhoto)
      : [...thumbsupUsers, userPhoto];
    this.prideDB.doc(prideID).update({
      thumbsupUsers: updateThumbsupUsers,
      thumbsupCount: updateThumbsupUsers.length,
    });
  }
}
