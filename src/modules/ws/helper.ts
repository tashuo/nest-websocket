import { HEART_BEAT_ALLOWABLE_DROPED_TIMES, HEART_BEAT_INTERVAL } from './types';

export const isClientAliveNow = (lastActiveTime: number): boolean => {
    return (
        Date.now() - lastActiveTime < HEART_BEAT_INTERVAL * (HEART_BEAT_ALLOWABLE_DROPED_TIMES + 1)
    );
};
