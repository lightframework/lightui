// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET sys/v1/roles/:id': (req: Request, res: Response) => {
    res.status(200).send({ id: 64, name: '周秀兰', info: '把组本半放部书相日口化义那周比或。' });
  },
  'GET sys/v1/teams/:id': (req: Request, res: Response) => {
    res.status(200).send({ id: 78, name: '杨丽', info: '毛更影山目直品治去带目只党。' });
  },
  'GET sys/v1/users/:id': (req: Request, res: Response) => {
    res.status(200).send({
      id: 92,
      username: 'Moore',
      nickname: '贾杰',
      mobile: '员家群情表法海支音划军任日称向通。',
      email: 'f.gffitcbch@wtvgm.lb',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      info: '器程时打化次听通和张或连。',
    });
  },
};
