import { Injectable } from '@nestjs/common';
import { StorePrideService } from 'src/store/store-pride/store-pride.service';
import { RequestThumbsUpPrideDto } from './dto/request.dto';

@Injectable()
export class PrideService {
  constructor(private readonly prideStore: StorePrideService) {}

  async getPridesWithinOneMonth() {
    const prides = await this.prideStore.getPridesWithinOneMonth();
    return prides;
  }
  async getPrideWithinOneMonthRanking() {
    const prides = await this.prideStore.getPrideWithinOneMonthRanking();
    return prides;
  }
  async getPridePast() {
    const prides = await this.prideStore.getPridePast();
    return prides;
  }
  async patchThumbsupPride(prideID: string, request: RequestThumbsUpPrideDto) {
    const pride = await this.prideStore.getPride(prideID);

    const thumbsupUsers = pride.thumbsupUsers;
    const updateThumbsupUsers = thumbsupUsers.includes(request.userPhoto)
      ? thumbsupUsers.filter((user) => user !== request.userPhoto)
      : [...thumbsupUsers, request.userPhoto];

    await this.prideStore.updateThumbUpPride(prideID, updateThumbsupUsers, updateThumbsupUsers.length);
  }
  async isExistPride(prideID: string) {
    return await this.prideStore.isExistPride(prideID);
  }
}
