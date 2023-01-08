// @ts-ignore
import { Request, Response } from 'express';

export default {
  'PUT sys/v1/roles/:id': (req: Request, res: Response) => {
    res.status(200).send({ result: '广话那然消市装因层林三共达相改素治。' });
  },
  'PUT sys/v1/teams/:id': (req: Request, res: Response) => {
    res.status(200).send({ result: '办没自由器会资打主他第毛间器每段组报。' });
  },
  'PUT sys/v1/users/:id': (req: Request, res: Response) => {
    res.status(200).send({ result: '何白写酸值院采情感过龙条地领点断。' });
  },
};
