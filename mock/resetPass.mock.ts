// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST sys/v1/users/:id/pass': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
