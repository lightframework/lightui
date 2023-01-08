// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET sys/v1/roles/:id/users': (req: Request, res: Response) => {
    res.status(200).send({
      total: 61,
      list: [
        {
          username: 'Jones',
          nickname: '周芳',
          mobile: '式程或感今它中叫他志细内是果。',
          email: 't.wbombd@oumd.pf',
          avatar: 'https://avatars1.githubusercontent.com/u/8186664?s=40&v=4',
          info: '圆西精车月设矿平场气产用。',
          teams: [],
          roles: [{ id: 95, name: '高洋' }],
        },
        {
          username: 'Thompson',
          nickname: '秦勇',
          mobile: '使什且和型至以见引么系形二心我想。',
          email: 'y.nbxyh@rriym.sj',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
          info: '律边信联况斯调计取车江发。',
          teams: [],
          roles: [{ id: 96, name: '钱磊' }],
        },
        {
          username: 'Lopez',
          nickname: '孔芳',
          mobile: '表类手实头本革才方众几八式认到下。',
          email: 'm.ahsqokrq@ipeaey.int',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
          info: '长门历料至林更级算养间林严资。',
          teams: [],
          roles: [{ id: 79, name: '毛平' }],
        },
        {
          username: 'Thomas',
          nickname: '吕杰',
          mobile: '斗气往东干适为路么多报存老就看马应。',
          email: 'x.kbhiifuu@dqnxvgt.cy',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
          info: '受际儿认同知等使群角难命目进。',
          teams: [],
          roles: [{ id: 77, name: '傅霞' }],
        },
        {
          username: 'Lewis',
          nickname: '蒋伟',
          mobile: '增步别国议员系养习群接战正引美满。',
          email: 'c.fvnpyphgx@kptx.vg',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
          info: '书比都发克持采五性研车争而头受关。',
          teams: [],
          roles: [{ id: 65, name: '叶桂英' }],
        },
        {
          username: 'White',
          nickname: '高洋',
          mobile: '影信维水知难式实器术按五。',
          email: 'f.iftk@qwpe.mc',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          info: '子给红技构入地构知八段了但了拉细接科。',
          teams: [],
          roles: [{ id: 75, name: '董霞' }],
        },
        {
          username: 'Robinson',
          nickname: '唐军',
          mobile: '变已节指命到长任式十组全部相算速。',
          email: 'j.ecpn@tdwcdywvt.coop',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          info: '象业次车出新记从住实革料很厂与关界清。',
          teams: [],
          roles: [{ id: 95, name: '卢桂英' }],
        },
        {
          username: 'Clark',
          nickname: '尹明',
          mobile: '影教方引包至际被当信线强化面所证。',
          email: 'b.hmhmpc@mnc.fi',
          avatar: 'https://avatars1.githubusercontent.com/u/8186664?s=40&v=4',
          info: '达回不铁热果角体养于点到我价至物压。',
          teams: [],
          roles: [{ id: 73, name: '王艳' }],
        },
        {
          username: 'Thompson',
          nickname: '任丽',
          mobile: '少太者记手共备千值研石山思期口。',
          email: 'h.sqvhochit@kucxd.name',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          info: '技会级产治被用本力之石权委养厂包天。',
          teams: [],
          roles: [{ id: 75, name: '史静' }],
        },
      ],
    });
  },
  'GET sys/v1/teams/:id/users': (req: Request, res: Response) => {
    res.status(200).send({
      total: 80,
      list: [
        {
          username: 'Wilson',
          nickname: '赖秀兰',
          mobile: '争接群因世器油始且已角动族所构红。',
          email: 'h.obptef@unwjcm.ne',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          info: '确除总算花力间别太适只科精产式。',
          teams: [
            { id: 97, name: '袁平' },
            { id: 91, name: '雷霞' },
            { id: 86, name: '郭娟' },
            { id: 99, name: '王艳' },
            { id: 61, name: '梁秀兰' },
            { id: 88, name: '崔娟' },
            { id: 97, name: '丁明' },
            { id: 76, name: '李磊' },
            { id: 94, name: '谢超' },
            { id: 83, name: '刘军' },
            { id: 90, name: '贺芳' },
            { id: 93, name: '黎娜' },
            { id: 90, name: '黄平' },
            { id: 73, name: '白磊' },
            { id: 75, name: '张勇' },
            { id: 91, name: '贾丽' },
          ],
          roles: [
            { id: 73, name: '秦磊' },
            { id: 72, name: '锺静' },
            { id: 75, name: '薛秀英' },
            { id: 83, name: '邱平' },
            { id: 84, name: '潘娟' },
            { id: 60, name: '林秀英' },
            { id: 91, name: '黄杰' },
            { id: 94, name: '周强' },
            { id: 71, name: '贺刚' },
            { id: 72, name: '赖娜' },
            { id: 74, name: '杜静' },
            { id: 60, name: '戴静' },
            { id: 75, name: '石洋' },
            { id: 68, name: '蒋娜' },
            { id: 85, name: '邓静' },
            { id: 88, name: '朱桂英' },
            { id: 88, name: '汪刚' },
            { id: 88, name: '于丽' },
          ],
        },
        {
          username: 'Perez',
          nickname: '赖明',
          mobile: '门节三历级容部无克单主务多作。',
          email: 'p.rch@diyne.so',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
          info: '县西效包千部据完界离作解并美明。',
          teams: [
            { id: 72, name: '熊强' },
            { id: 81, name: '龙刚' },
            { id: 65, name: '吕刚' },
            { id: 67, name: '贺敏' },
            { id: 78, name: '郑磊' },
            { id: 89, name: '段涛' },
            { id: 82, name: '陈敏' },
            { id: 98, name: '方娟' },
            { id: 99, name: '万敏' },
            { id: 65, name: '郑军' },
            { id: 75, name: '万涛' },
            { id: 85, name: '崔明' },
            { id: 91, name: '周平' },
            { id: 61, name: '韩勇' },
            { id: 70, name: '罗超' },
            { id: 98, name: '钱霞' },
          ],
          roles: [
            { id: 85, name: '杜娟' },
            { id: 86, name: '黎敏' },
            { id: 90, name: '高娟' },
            { id: 92, name: '潘秀英' },
            { id: 62, name: '程超' },
            { id: 86, name: '沈静' },
            { id: 99, name: '高军' },
            { id: 77, name: '胡丽' },
            { id: 78, name: '刘平' },
            { id: 61, name: '彭涛' },
            { id: 91, name: '万静' },
            { id: 62, name: '谭娜' },
            { id: 87, name: '赵艳' },
            { id: 73, name: '邓伟' },
            { id: 94, name: '曾勇' },
            { id: 69, name: '白艳' },
            { id: 76, name: '宋娜' },
            { id: 68, name: '雷勇' },
          ],
        },
        {
          username: 'Jackson',
          nickname: '锺芳',
          mobile: '展命当现集设信联增了相程至术组白方。',
          email: 'c.odhyee@oxnppuap.nz',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          info: '活今究际决济满制什火联场住二求。',
          teams: [
            { id: 61, name: '宋娜' },
            { id: 86, name: '谭军' },
            { id: 83, name: '林洋' },
            { id: 61, name: '蔡娜' },
            { id: 95, name: '袁霞' },
            { id: 82, name: '赖明' },
            { id: 68, name: '王超' },
            { id: 85, name: '董丽' },
            { id: 82, name: '黎芳' },
            { id: 76, name: '史强' },
            { id: 73, name: '陆超' },
            { id: 69, name: '高超' },
            { id: 68, name: '石明' },
            { id: 84, name: '许娟' },
            { id: 61, name: '蒋军' },
            { id: 74, name: '邓刚' },
          ],
          roles: [
            { id: 93, name: '朱霞' },
            { id: 60, name: '孟刚' },
            { id: 91, name: '汤明' },
            { id: 90, name: '袁娜' },
            { id: 80, name: '邹杰' },
            { id: 75, name: '郭伟' },
            { id: 97, name: '程超' },
            { id: 77, name: '蔡明' },
            { id: 64, name: '高敏' },
            { id: 67, name: '赖娟' },
            { id: 83, name: '程桂英' },
            { id: 97, name: '夏静' },
            { id: 98, name: '侯丽' },
            { id: 70, name: '冯明' },
            { id: 85, name: '顾霞' },
            { id: 73, name: '于杰' },
            { id: 72, name: '沈涛' },
            { id: 74, name: '戴霞' },
          ],
        },
      ],
    });
  },
};
