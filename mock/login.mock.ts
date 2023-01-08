// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST sys/v1/user/login': (req: Request, res: Response) => {
    res
      .status(200)
      .send({ accessToken: '间张体局年听元治飞方意种。', accessExpire: 84, refreshAfter: 75 });
  },
};
