import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { credential } from 'firebase-admin';
import { App, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class EnvironmentsService {
  constructor(private configService: ConfigService) {}

  get FirebasePrivateKey(): string {
    const privateKey: string = this.configService.get('FIREBASE_PRIVATE_KEY');
    return privateKey.replace(/\\n/gm, '\n');
  }
  get FirebaseClientEmail(): string {
    return this.configService.get('FIREBASE_CLIENT_EMAIL');
  }
  get FirebaseProjectID(): string {
    return this.configService.get('FIREBASE_PROJECT_ID');
  }

  private firebaseApp: App;
  get firebaseAppInstance() {
    if (this.firebaseApp) return this.firebaseApp;

    this.firebaseApp = initializeApp({
      credential: credential.cert({
        projectId: this.FirebaseProjectID,
        privateKey: this.FirebasePrivateKey,
        clientEmail: this.FirebaseClientEmail,
      }),
    });
    return this.firebaseApp;
  }

  get firestoreDB() {
    const DB = getFirestore(this.firebaseAppInstance);
    return DB;
  }
}
