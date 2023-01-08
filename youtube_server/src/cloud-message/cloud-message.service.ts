import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'

@Injectable()
export class CloudMessageService {
    tempRegistrationTokens = {}

    addNewRetrieveToken(email: string, reToken: string) {
        this.tempRegistrationTokens = {
            ...this.tempRegistrationTokens,
            [email]: reToken
        }
        return this.tempRegistrationTokens
    }

}
