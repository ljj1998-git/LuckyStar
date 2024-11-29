import { CasbinRule } from '@/entities/casbin_rule.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthDao {
  constructor(
    @InjectRepository(CasbinRule)
    private casbinRule: Repository<CasbinRule>,
  ) {}

  public async getCasbinRule() {
    const res = await this.casbinRule.find();
    return res;
  }
}
