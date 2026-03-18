import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';

@Module({
  providers: [PaymentsService, PaymentsResolver],
})
export class PaymentsModule {}
