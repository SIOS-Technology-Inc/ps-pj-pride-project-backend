import { Injectable } from '@nestjs/common';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { EnvironmentsService } from 'src/config/enviroments.service';
import { PrideContent } from 'src/types/prideContent';
import { RequestThumbsUpPrideDto } from './dto/request.dto';

@Injectable()
export class PrideService {
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
    toFirestore() {
      return {};
    },
  };
  async getPridesWithinOneMonth() {
    const today = new Date();
    const oneMonthAgo =
      today.getMonth() - 1 >= 0
        ? new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        : new Date(today.getFullYear() - 1, 11, today.getDate());

    // TODO:年をまたぐ場合にエラー回避
    const prideCollection = await this.prideDB
      .where('createdAt', '>=', oneMonthAgo)
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
  async isExistPride(uid: string) {
    const pride = await this.prideDB.doc(uid).get();
    return pride.exists;
  }

  async patchThumbsupPride(uid: string, request: RequestThumbsUpPrideDto) {
    const pride = await this.prideDB.doc(uid).withConverter(this.prideConverter).get();
    const data = pride.data();

    const thumbsupUsers = data.thumbsupUsers;
    const updateThumbsupUsers = thumbsupUsers.includes(request.userPhoto)
      ? thumbsupUsers.filter((user) => user !== request.userPhoto)
      : [...thumbsupUsers, request.userPhoto];
    this.prideDB.doc(uid).update({
      thumbsupUsers: updateThumbsupUsers,
      thumbsupCount: updateThumbsupUsers.length,
    });
  }
}
