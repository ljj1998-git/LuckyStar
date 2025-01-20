import { JwtAuthGuard } from '@client/guards/JwtAuth.guard';
import { IdDto } from '@libs/shared/dtos/common.dto';
import {
  CreateDepartmentDto,
  QueryDepartmentDto,
  QueryDepartmentTreeDto,
  UpdateDepartmentDto,
} from '@libs/shared/dtos/department.dto';
import { CustomRequest } from '@libs/shared/types/customRequest';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('department')
@ApiTags('部门管理')
@UseGuards(JwtAuthGuard)
export class DepartmentController {
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy) {}

  @Post('/create')
  @ApiOperation({ summary: '新增部门' })
  createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Req() req: CustomRequest,
  ) {
    return this.userService.send('department/create', {
      createDepartmentDto,
      user: req.user,
    });
  }

  @Delete('/delete')
  @ApiOperation({ summary: '删除部门' })
  deleteDepartment(@Query() idDto: IdDto, @Req() req: CustomRequest) {
    return this.userService.send('department/delete', {
      idDto,
      user: req.user,
    });
  }

  @Put('/update')
  @ApiOperation({ summary: '修改部门' })
  updateDepartment(
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Req() req: CustomRequest,
  ) {
    return this.userService.send('department/update', {
      updateDepartmentDto,
      user: req.user,
    });
  }

  @Post('/query')
  @ApiOperation({ summary: '查询部门列表' })
  getDepartmentList(@Body() queryDepartmentDto: QueryDepartmentDto) {
    return this.userService.send('department/query', queryDepartmentDto);
  }

  /** 查询部门树 */
  @Post('/queryTree')
  @ApiOperation({ summary: '查询部门树' })
  getDepartmentTree(@Body() queryDepartmentTreeDto: QueryDepartmentTreeDto) {
    return this.userService.send(
      'department/queryTree',
      queryDepartmentTreeDto,
    );
  }

  /** 查询部门详情 */
  @Get('/info')
  @ApiOperation({ summary: '查询部门详情' })
  getDepartmentInfo(@Query() idDto: IdDto) {
    return this.userService.send('department/info', idDto);
  }
}
