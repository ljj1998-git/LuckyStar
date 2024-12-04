import { ConstantsProvider } from '@/constants/constants.provider';
import { AuthDao } from '@/dao/auth.dao';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Enforcer, newEnforcer } from 'casbin';
import { ExtractJwt, Strategy } from 'passport-jwt';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFParser = require('pdf2json');

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private readonly constants: ConstantsProvider,
    public authDao: AuthDao,
    private jwt: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //校验逻辑token 已封装
      ignoreExpiration: false,
      secretOrKey: '55',
    });
  }

  private enforcerIns: Enforcer;

  async getPermission(
    p1: string = '刘俊杰',
    p2: string = '数据1',
    p3: string = '管理员',
  ): Promise<any> {
    // 初始化 casbin规则
    await this.initCasbin();

    // const pdfParser = new PDFParser();

    // pdfParser.on('pdfParser_dataReady', (pdfData) => {
    //   const textContent = pdfData.Pages.map((page) =>
    //     page.Texts.map((t) => decodeURIComponent(t.R[0].T)).join(' '),
    //   ).join('\n');
    //   console.log(textContent);
    // });
    // pdfParser.loadPDF('src/service/demo1.pdf').then((res) => {
    //   console.log(res);
    // });

    const res = await this.enforcerIns.enforce(p1, p2, p3);
    if (res) {
      return 'ok';
    } else {
      return 'error';
    }
  }

  private async initCasbin() {
    try {
      this.enforcerIns = await newEnforcer(this.constants.Casbin.CONFIG_PATH);
      const res = await this.authDao.getCasbinRule();
      console.log(res[0]);
      const policy = res.map((item) => {
        return [item.p1, item.p2, item.p3];
      });
      await this.enforcerIns.addPolicies(policy); //批量添加
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  /**
   * 生成token
   */
  getToken(payload: any): string {
    return this.jwt.sign(payload);
  }

  /**
   * 验证token
   * @param payload
   */
  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}
