import { SetMetadata } from '@nestjs/common';
import { ALLOW_GUEST } from 'src/constants/app';

export const Guest = () => SetMetadata(ALLOW_GUEST, true);
