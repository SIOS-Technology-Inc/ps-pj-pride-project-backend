import { Injectable } from '@nestjs/common';
import { StorePrideService } from 'src/store/store-pride/store-pride.service';
import { RequestPrideContentDto, RequestUserIDDto } from './dto/request.dto';

@Injectable()
export class PrideUserService {
  constructor(private readonly prideStore: StorePrideService) {}

  async getMyPrideWithinOnePride(request: RequestUserIDDto) {
    const prides = await this.prideStore.getUsersPrideWithInOneMonth(request.userID);
    return prides;
  }
  async createPride(request: RequestPrideContentDto): Promise<void> {
    await this.prideStore.createPride(request.userID, request.userName, request.userPhoto, request.title, request.memo);
  }
  async updatePride(prideID: string, request: RequestPrideContentDto): Promise<void> {
    await this.prideStore.updatePride(prideID, request.title, request.memo);
  }
  async deletePride(prideID: string): Promise<void> {
    await this.prideStore.deletePride(prideID);
  }
  async isExistPride(prideID: string): Promise<boolean> {
    return await this.prideStore.isExistPride(prideID);
  }
}
