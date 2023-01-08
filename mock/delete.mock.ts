// @ts-ignore
import { Request, Response } from 'express';

export default {
  'DELETE sys/v1/roles/:id': (req: Request, res: Response) => {
    res.status(200).send({ result: '格参法分究于具际积高政育世太矿此。' });
  },
  'DELETE sys/v1/teams/:id': (req: Request, res: Response) => {
    res.status(200).send({ result: '带济群无六点传算约因酸车周严始感派。' });
  },
  'DELETE sys/v1/users/:id': (req: Request, res: Response) => {
    res.status(200).send({ result: '单些品她问包建约格其太我很认结文。' });
  },
};
