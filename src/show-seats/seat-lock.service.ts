import { InjectRedis } from "@nestjs-modules/ioredis";
import Redis from 'ioredis'

export class SeatLockService {
    constructor(
        @InjectRedis() private readonly redis: Redis
    ) {}

    private key(showId: string, seatId: string) {
        return `show:${showId}:seat:${seatId}`;
    }

   async lockSeat(
    showId: string,
    seatId: string,
    userId: string,
    ttl = 300,
    ): Promise<boolean> {
        const key = this.key(showId, seatId);

        // SETNX → set only if key does NOT exist
        const isLocked = await this.redis.setnx(key, userId);

        if (!isLocked) {
            return false; // already locked
        }

        // Set expiry (auto unlock)
        await this.redis.expire(key, ttl);

        return true;
    }



  async unlockSeat(showId: string, seatId: string, userId: string) {
    const key = this.key(showId, seatId);
    const lockedBy = await this.redis.get(key);

    if (lockedBy === userId) {
      await this.redis.del(key);
    }
  }

  async isLocked(showId: string, seatId: string): Promise<boolean> {
    return !!(await this.redis.get(this.key(showId, seatId)));
  }

}