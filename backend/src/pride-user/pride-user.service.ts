import { Injectable } from '@nestjs/common';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { EnvironmentsService } from 'src/config/enviroments.service';
import { PrideContent } from 'src/types/prideContent';
import { RequestPrideContentDto, RequestUserIDDto } from './dto/request.dto';

@Injectable()
export class PrideUserService {
  constructor(private readonly env: EnvironmentsService) {}
  prideDB = this.env.firestoreDB.collection('prides');
  userConverter: FirestoreDataConverter<PrideContent> = {
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>) {
      const timestamp = snapshot.get('createdAt') as Timestamp;
      const createdAt = new Date(timestamp.seconds * 1000);

      return {
        uid: snapshot.id,
        title: snapshot.get('title') || '',
        memo: snapshot.get('memo') || '',
        thumbsupCount: snapshot.get('thumbsupCount'),
        thumbsupUsers: snapshot.get('thumbsupUsers') || [],
        createdAt: createdAt,
        userID: snapshot.get('userID') || '',
        userName: snapshot.get('userName') || '',
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
    const prideRef = await this.prideDB.doc(uid).withConverter(this.userConverter).get();
    return prideRef.exists;
  }
  async getMyPride(uid: string) {
    const prideRef = await this.prideDB.doc(uid).withConverter(this.userConverter).get();
    const pride = prideRef.data();
    return pride;
  }
  async getMyPrideWithinOnePride(request: RequestUserIDDto) {
    const today = new Date();
    const oneMonthAgo =
      today.getMonth() - 1 >= 0
        ? new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        : new Date(today.getFullYear() - 1, 11, today.getDate());
    // TODO:ここが年をまたぐ場合エラー回避
    const prideCollection = await this.prideDB
      .withConverter(this.userConverter)
      .where('userID', '==', request.userID)
      .where('createdAt', '>=', oneMonthAgo)
      .orderBy('createdAt', 'desc')
      .get();
    const prides = prideCollection.docs.map((doc) => doc.data());
    //過去一か月のPrideを取得
    return prides;
  }
  async createPride(request: RequestPrideContentDto): Promise<void> {
    this.prideDB.withConverter(this.userConverter).add({
      uid: '',
      title: request.title,
      memo: request.memo,
      thumbsupUsers: [],
      thumbsupCount: 0,
      userID: request.userID,
      userName: request.userName,
      userPhotoURL: request.userPhoto,
    });
  }
  async updatePride(uid: string, request: RequestPrideContentDto): Promise<void> {
    this.prideDB.doc(uid).withConverter(this.userConverter).update({
      title: request.title,
      memo: request.memo,
    });
  }
  async deletePride(uid: string): Promise<void> {
    this.prideDB.doc(uid).delete();
  }
}
