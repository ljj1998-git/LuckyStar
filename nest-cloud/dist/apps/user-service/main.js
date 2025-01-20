/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/client/src/modules/auth/auth.controller.ts":
/*!*********************************************************!*\
  !*** ./apps/client/src/modules/auth/auth.controller.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/client/src/modules/auth/auth.service.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('client/auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./apps/client/src/modules/auth/auth.module.ts":
/*!*****************************************************!*\
  !*** ./apps/client/src/modules/auth/auth.module.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/client/src/modules/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/client/src/modules/auth/auth.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const redis_cache_module_1 = __webpack_require__(/*! @libs/shared/modules/redis-cache/redis-cache.module */ "./libs/shared/src/modules/redis-cache/redis-cache.module.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const secret = configService.get('JWT_SECRET_KEY');
                    const expiration = configService.get('JWT_EXPIRATION_TIME') + 's';
                    return {
                        secret: secret,
                        signOptions: { expiresIn: expiration },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            redis_cache_module_1.RedisCacheModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),

/***/ "./apps/client/src/modules/auth/auth.service.ts":
/*!******************************************************!*\
  !*** ./apps/client/src/modules/auth/auth.service.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const redis_cache_service_1 = __webpack_require__(/*! @libs/shared/modules/redis-cache/redis-cache.service */ "./libs/shared/src/modules/redis-cache/redis-cache.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
let AuthService = class AuthService extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(jwt, configService, redisCacheService) {
        const secret = configService.get('JWT_SECRET_KEY');
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
            passReqToCallback: true,
        });
        this.jwt = jwt;
        this.configService = configService;
        this.redisCacheService = redisCacheService;
    }
    getToken(payload) {
        return this.jwt.sign(payload);
    }
    async validate(req, payload) {
        const { id } = payload;
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const cacheToken = await this.redisCacheService.get(id);
        if (!cacheToken) {
            throw new common_1.UnauthorizedException('token已过期');
        }
        if (token != cacheToken) {
            throw new common_1.UnauthorizedException('该账号已在其他地方登录');
        }
        this.redisCacheService.set(id, token, this.configService.get('JWT_EXPIRATION_TIME'));
        return { id: payload.id, username: payload.username };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof redis_cache_service_1.RedisCacheService !== "undefined" && redis_cache_service_1.RedisCacheService) === "function" ? _c : Object])
], AuthService);


/***/ }),

/***/ "./apps/user-service/src/app.module.ts":
/*!*********************************************!*\
  !*** ./apps/user-service/src/app.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_module_1 = __webpack_require__(/*! ./modules/user/user.module */ "./apps/user-service/src/modules/user/user.module.ts");
const shared_1 = __webpack_require__(/*! @libs/shared */ "./libs/shared/src/index.ts");
const bootstraps_1 = __webpack_require__(/*! ./bootstraps */ "./apps/user-service/src/bootstraps/index.ts");
const department_module_1 = __webpack_require__(/*! ./modules/department/department.module */ "./apps/user-service/src/modules/department/department.module.ts");
const menu_module_1 = __webpack_require__(/*! ./modules/menu/menu.module */ "./apps/user-service/src/modules/menu/menu.module.ts");
const role_module_1 = __webpack_require__(/*! ./modules/role/role.module */ "./apps/user-service/src/modules/role/role.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ...bootstraps_1.default,
            user_module_1.UserModule,
            shared_1.SharedModule,
            department_module_1.DepartmentModule,
            menu_module_1.MenuModule,
            role_module_1.RoleModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),

/***/ "./apps/user-service/src/bootstraps/index.ts":
/*!***************************************************!*\
  !*** ./apps/user-service/src/bootstraps/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = [
    config_1.ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.development',
    }),
];


/***/ }),

/***/ "./apps/user-service/src/modules/department/dao/department.dao.ts":
/*!************************************************************************!*\
  !*** ./apps/user-service/src/modules/department/dao/department.dao.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDepartmentTreeMysql = void 0;
const getDepartmentTreeMysql = () => {
    return `
WITH RECURSIVE sys_department_path AS (
  SELECT
    id,
    name,
    parentId,
    created_at,
    created_by,
    status,
    sort,
    description,
    code,
    is_deleted,
    0 AS level,
    CONCAT( '', id ) AS path 
  FROM
    sys_department 
  WHERE
    parentId IS NULL
  
  UNION ALL 

  SELECT
    dep.id,
    dep.name,
    dep.parentId,
    dep.created_at,
    dep.created_by,
    dep.status,
    dep.sort,
    dep.description,
    dep.code,
    dep.is_deleted,
    sp.level + 1 AS level,
    CONCAT( sp.path, ',', dep.id ) 
  FROM
    sys_department dep
    JOIN sys_department_path sp ON sp.id = dep.parentId 
) SELECT
* 
FROM
  sys_department_path
WHERE
  is_deleted = 0 AND ( name LIKE ? AND code LIKE ? AND status LIKE ? )
`;
};
exports.getDepartmentTreeMysql = getDepartmentTreeMysql;


/***/ }),

/***/ "./apps/user-service/src/modules/department/department.controller.ts":
/*!***************************************************************************!*\
  !*** ./apps/user-service/src/modules/department/department.controller.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const department_service_1 = __webpack_require__(/*! ./department.service */ "./apps/user-service/src/modules/department/department.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const department_dto_1 = __webpack_require__(/*! @libs/shared/dtos/department.dto */ "./libs/shared/src/dtos/department.dto.ts");
const common_dto_1 = __webpack_require__(/*! @libs/shared/dtos/common.dto */ "./libs/shared/src/dtos/common.dto.ts");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    createDepartment(params) {
        const { createDepartmentDto, user } = params;
        return this.departmentService.createDepartment(createDepartmentDto, user);
    }
    deleteDepartment(params) {
        const { idDto, user } = params;
        return this.departmentService.deleteDepartment(idDto, user);
    }
    updateDepartment(params) {
        const { updateDepartmentDto, user } = params;
        return this.departmentService.updateDepartment(updateDepartmentDto, user);
    }
    getDepartmentList(queryDepartmentDto) {
        return this.departmentService.getDepartmentList(queryDepartmentDto);
    }
    getDepartmentTree(params) {
        return this.departmentService.getDepartmentTree(params);
    }
    getDepartmentInfo(idDto) {
        return this.departmentService.getDepartmentInfo(idDto);
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, microservices_1.MessagePattern)('department/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "createDepartment", null);
__decorate([
    (0, microservices_1.MessagePattern)('department/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "deleteDepartment", null);
__decorate([
    (0, microservices_1.MessagePattern)('department/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "updateDepartment", null);
__decorate([
    (0, microservices_1.MessagePattern)('department/query'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof department_dto_1.QueryDepartmentDto !== "undefined" && department_dto_1.QueryDepartmentDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartmentList", null);
__decorate([
    (0, microservices_1.MessagePattern)('department/queryTree'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof department_dto_1.QueryDepartmentTreeDto !== "undefined" && department_dto_1.QueryDepartmentTreeDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartmentTree", null);
__decorate([
    (0, microservices_1.MessagePattern)('department/info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartmentInfo", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, common_1.Controller)('department'),
    __metadata("design:paramtypes", [typeof (_a = typeof department_service_1.DepartmentService !== "undefined" && department_service_1.DepartmentService) === "function" ? _a : Object])
], DepartmentController);


/***/ }),

/***/ "./apps/user-service/src/modules/department/department.module.ts":
/*!***********************************************************************!*\
  !*** ./apps/user-service/src/modules/department/department.module.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const department_controller_1 = __webpack_require__(/*! ./department.controller */ "./apps/user-service/src/modules/department/department.controller.ts");
const department_service_1 = __webpack_require__(/*! ./department.service */ "./apps/user-service/src/modules/department/department.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const department_entity_1 = __webpack_require__(/*! @libs/shared/entities/department.entity */ "./libs/shared/src/entities/department.entity.ts");
let DepartmentModule = class DepartmentModule {
};
exports.DepartmentModule = DepartmentModule;
exports.DepartmentModule = DepartmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([department_entity_1.DepartmentEntity])],
        controllers: [department_controller_1.DepartmentController],
        providers: [department_service_1.DepartmentService],
        exports: [department_service_1.DepartmentService],
    })
], DepartmentModule);


/***/ }),

/***/ "./apps/user-service/src/modules/department/department.service.ts":
/*!************************************************************************!*\
  !*** ./apps/user-service/src/modules/department/department.service.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const ajaxResponse_service_1 = __webpack_require__(/*! @libs/shared/modules/ajax-responese/ajaxResponse.service */ "./libs/shared/src/modules/ajax-responese/ajaxResponse.service.ts");
const department_entity_1 = __webpack_require__(/*! @libs/shared/entities/department.entity */ "./libs/shared/src/entities/department.entity.ts");
const department_dao_1 = __webpack_require__(/*! ./dao/department.dao */ "./apps/user-service/src/modules/department/dao/department.dao.ts");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const buildTree_1 = __webpack_require__(/*! @libs/shared/utils/buildTree */ "./libs/shared/src/utils/buildTree.ts");
const department_resp_1 = __webpack_require__(/*! @libs/shared/resp/department.resp */ "./libs/shared/src/resp/department.resp.ts");
let DepartmentService = class DepartmentService {
    constructor(r, departmentEntity) {
        this.r = r;
        this.departmentEntity = departmentEntity;
    }
    async createDepartment(createDepartmentDto, user) {
        const { username } = user;
        const department = this.departmentEntity.create({
            ...createDepartmentDto,
            createdBy: username,
        });
        try {
            await this.departmentEntity.save(department);
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteDepartment(idDto, user) {
        const { username } = user;
        const { id } = idDto;
        try {
            await this.departmentEntity.update(id, {
                isDeleted: 1,
                updatedBy: username,
                updatedAt: new Date(),
            });
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateDepartment(updateDepartmentDto, user) {
        const { username } = user;
        const { id, ...otherParams } = updateDepartmentDto;
        try {
            this.departmentEntity
                .createQueryBuilder()
                .update(department_entity_1.DepartmentEntity)
                .set({ ...otherParams, updatedBy: username, updatedAt: new Date() })
                .where('id = :id', { id })
                .execute();
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDepartmentList(queryDepartmentDto) {
        const { pageNum, pageSize, name, code } = queryDepartmentDto;
        try {
            const [result, total] = await this.departmentEntity.findAndCount({
                skip: (pageNum - 1) * pageSize,
                take: pageSize,
                where: { name, code },
            });
            return this.r.success({
                total,
                list: result,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDepartmentTree(queryDepartmentTreeDto) {
        try {
            const { name = '', code = '', status = '' } = queryDepartmentTreeDto;
            let res = await this.departmentEntity.query((0, department_dao_1.getDepartmentTreeMysql)(), [
                `%${name}%`,
                `%${code}%`,
                `%${status}%`,
            ]);
            res = (0, class_transformer_1.plainToClass)(department_resp_1.DepartmentTreeResp, res);
            if (name || code || status) {
                return this.r.success(res);
            }
            const tree = (0, buildTree_1.buildTreeByPath)(res);
            return this.r.success(tree);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDepartmentInfo(idDto) {
        const { id } = idDto;
        try {
            const result = await this.departmentEntity.findOneBy({ id });
            if (!result) {
                return this.r.error('部门不存在');
            }
            return this.r.success(result);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(department_entity_1.DepartmentEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof ajaxResponse_service_1.AjaxResultService !== "undefined" && ajaxResponse_service_1.AjaxResultService) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object])
], DepartmentService);


/***/ }),

/***/ "./apps/user-service/src/modules/menu/dao/menu.dao.ts":
/*!************************************************************!*\
  !*** ./apps/user-service/src/modules/menu/dao/menu.dao.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMenuTreeMysql = void 0;
const getMenuTreeMysql = () => {
    return `
  WITH RECURSIVE sys_menus_path AS (
    SELECT
      id,
      name,
      parentId,
      created_at,
      created_by,
      status,
      permission,
      componentName,
      componentPath,
      sort,
      route,
      is_deleted,
      type,
      icon,
      0 AS level,
      CONCAT( '', id ) AS path 
    FROM
      sys_menus 
    WHERE
      parentId IS NULL
    
    UNION ALL 
  
    SELECT
      dep.id,
      dep.name,
      dep.parentId,
      dep.created_at,
      dep.created_by,
      dep.status,
      dep.permission,
      dep.componentName,
      dep.componentPath,
      dep.sort,
      dep.route,
      dep.is_deleted,
      dep.type,
      dep.icon,
      sp.level + 1 AS level,
      CONCAT( sp.path, ',', dep.id ) 
    FROM
      sys_menus dep
      JOIN sys_menus_path sp ON sp.id = dep.parentId 
  ) SELECT
  * 
  FROM
    sys_menus_path
  WHERE
    is_deleted = 0
  `;
};
exports.getMenuTreeMysql = getMenuTreeMysql;


/***/ }),

/***/ "./apps/user-service/src/modules/menu/menu.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/user-service/src/modules/menu/menu.controller.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const menu_service_1 = __webpack_require__(/*! ./menu.service */ "./apps/user-service/src/modules/menu/menu.service.ts");
const common_dto_1 = __webpack_require__(/*! @libs/shared/dtos/common.dto */ "./libs/shared/src/dtos/common.dto.ts");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    createMenu(params) {
        const { createMenuDto, req } = params;
        return this.menuService.createMenu(createMenuDto, req);
    }
    deleteMenu(params) {
        const { idDto, req } = params;
        return this.menuService.deleteMenu(idDto, req);
    }
    updateMenu(params) {
        const { updateMenuDto, req } = params;
        return this.menuService.updateMenu(updateMenuDto, req);
    }
    getMenuList() {
        return this.menuService.getMenuTree();
    }
    getMenuInfo(idDto) {
        return this.menuService.getMenuInfo(idDto);
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, microservices_1.MessagePattern)('menu/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "createMenu", null);
__decorate([
    (0, microservices_1.MessagePattern)('menu/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "deleteMenu", null);
__decorate([
    (0, microservices_1.MessagePattern)('menu/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "updateMenu", null);
__decorate([
    (0, microservices_1.MessagePattern)('menu/queryTree'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuList", null);
__decorate([
    (0, microservices_1.MessagePattern)('menu/info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuInfo", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [typeof (_a = typeof menu_service_1.MenuService !== "undefined" && menu_service_1.MenuService) === "function" ? _a : Object])
], MenuController);


/***/ }),

/***/ "./apps/user-service/src/modules/menu/menu.module.ts":
/*!***********************************************************!*\
  !*** ./apps/user-service/src/modules/menu/menu.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuModule = void 0;
const menu_entity_1 = __webpack_require__(/*! @libs/shared/entities/menu.entity */ "./libs/shared/src/entities/menu.entity.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const menu_controller_1 = __webpack_require__(/*! ./menu.controller */ "./apps/user-service/src/modules/menu/menu.controller.ts");
const menu_service_1 = __webpack_require__(/*! ./menu.service */ "./apps/user-service/src/modules/menu/menu.service.ts");
let MenuModule = class MenuModule {
};
exports.MenuModule = MenuModule;
exports.MenuModule = MenuModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([menu_entity_1.MenuEntity])],
        controllers: [menu_controller_1.MenuController],
        providers: [menu_service_1.MenuService],
        exports: [menu_service_1.MenuService],
    })
], MenuModule);


/***/ }),

/***/ "./apps/user-service/src/modules/menu/menu.service.ts":
/*!************************************************************!*\
  !*** ./apps/user-service/src/modules/menu/menu.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuService = void 0;
const menu_entity_1 = __webpack_require__(/*! @libs/shared/entities/menu.entity */ "./libs/shared/src/entities/menu.entity.ts");
const ajaxResponse_service_1 = __webpack_require__(/*! @libs/shared/modules/ajax-responese/ajaxResponse.service */ "./libs/shared/src/modules/ajax-responese/ajaxResponse.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const menu_dao_1 = __webpack_require__(/*! ./dao/menu.dao */ "./apps/user-service/src/modules/menu/dao/menu.dao.ts");
const buildTree_1 = __webpack_require__(/*! @libs/shared/utils/buildTree */ "./libs/shared/src/utils/buildTree.ts");
let MenuService = class MenuService {
    constructor(r, menuEntity) {
        this.r = r;
        this.menuEntity = menuEntity;
    }
    async createMenu(createMenuReq, req) {
        const { username } = req.user;
        try {
            this.menuEntity
                .createQueryBuilder()
                .insert()
                .into(menu_entity_1.MenuEntity)
                .values({
                ...createMenuReq,
                createdBy: username,
            })
                .execute();
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMenuTree() {
        try {
            const res = await this.menuEntity.query((0, menu_dao_1.getMenuTreeMysql)());
            const tree = (0, buildTree_1.buildTreeByPath)(res);
            return this.r.success(tree);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateMenu(updateMenuReq, req) {
        const { id } = updateMenuReq;
        const { username } = req.user;
        try {
            await this.menuEntity
                .createQueryBuilder()
                .update(menu_entity_1.MenuEntity)
                .set({
                ...updateMenuReq,
                updatedBy: username,
                updatedAt: new Date(),
            })
                .where('id = :id', { id })
                .execute();
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteMenu(params, req) {
        const { id } = params;
        const { username } = req.user;
        try {
            const res = await this.menuEntity.query((0, menu_dao_1.getMenuTreeMysql)());
            const ids = res
                .filter((item) => item.path.includes(id))
                .map((item) => item.id);
            await this.menuEntity
                .createQueryBuilder()
                .update(menu_entity_1.MenuEntity)
                .set({
                isDeleted: 1,
                updatedBy: username,
                updatedAt: new Date(),
            })
                .where('id IN (:...ids)', { ids })
                .execute();
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMenuInfo(params) {
        console.log('params', params);
        const { id } = params;
        try {
            const res = await this.menuEntity.findOneBy({ id });
            if (!res) {
                return this.r.error('菜单不存在');
            }
            return this.r.success(res);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(menu_entity_1.MenuEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof ajaxResponse_service_1.AjaxResultService !== "undefined" && ajaxResponse_service_1.AjaxResultService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], MenuService);


/***/ }),

/***/ "./apps/user-service/src/modules/role/role.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/user-service/src/modules/role/role.controller.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleController = void 0;
const role_dto_1 = __webpack_require__(/*! @libs/shared/dtos/role.dto */ "./libs/shared/src/dtos/role.dto.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const role_service_1 = __webpack_require__(/*! ./role.service */ "./apps/user-service/src/modules/role/role.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_dto_1 = __webpack_require__(/*! @libs/shared/dtos/common.dto */ "./libs/shared/src/dtos/common.dto.ts");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    createRole(params) {
        const { createRoleReq, req } = params;
        return this.roleService.createRole(createRoleReq, req);
    }
    getRoleList(createRoleReq) {
        return this.roleService.getRoleList(createRoleReq);
    }
    deleteRole(roleId) {
        return this.roleService.deleteRole(roleId);
    }
    updateRole(params) {
        const { createMenuDto, req } = params;
        return this.roleService.updateRole(createMenuDto, req);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, microservices_1.MessagePattern)('role/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, microservices_1.MessagePattern)('role/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof role_dto_1.QueryRoleDto !== "undefined" && role_dto_1.QueryRoleDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getRoleList", null);
__decorate([
    (0, microservices_1.MessagePattern)('role/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "deleteRole", null);
__decorate([
    (0, microservices_1.MessagePattern)('role/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "updateRole", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [typeof (_a = typeof role_service_1.RoleService !== "undefined" && role_service_1.RoleService) === "function" ? _a : Object])
], RoleController);


/***/ }),

/***/ "./apps/user-service/src/modules/role/role.module.ts":
/*!***********************************************************!*\
  !*** ./apps/user-service/src/modules/role/role.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const role_controller_1 = __webpack_require__(/*! ./role.controller */ "./apps/user-service/src/modules/role/role.controller.ts");
const role_service_1 = __webpack_require__(/*! ./role.service */ "./apps/user-service/src/modules/role/role.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const role_entity_1 = __webpack_require__(/*! @libs/shared/entities/role.entity */ "./libs/shared/src/entities/role.entity.ts");
let RoleModule = class RoleModule {
};
exports.RoleModule = RoleModule;
exports.RoleModule = RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([role_entity_1.RoleEntity])],
        controllers: [role_controller_1.RoleController],
        providers: [role_service_1.RoleService],
        exports: [role_service_1.RoleService],
    })
], RoleModule);


/***/ }),

/***/ "./apps/user-service/src/modules/role/role.service.ts":
/*!************************************************************!*\
  !*** ./apps/user-service/src/modules/role/role.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const role_entity_1 = __webpack_require__(/*! @libs/shared/entities/role.entity */ "./libs/shared/src/entities/role.entity.ts");
const ajaxResponse_service_1 = __webpack_require__(/*! @libs/shared/modules/ajax-responese/ajaxResponse.service */ "./libs/shared/src/modules/ajax-responese/ajaxResponse.service.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let RoleService = class RoleService {
    constructor(r, roleEntity) {
        this.r = r;
        this.roleEntity = roleEntity;
    }
    async createRole(createRoleReq, req) {
        const { code } = createRoleReq;
        const { username } = req.user;
        try {
            const res = this.roleEntity.findOneBy({ code });
            if (res) {
                return this.r.error('角色编码已存在');
            }
            this.roleEntity
                .createQueryBuilder()
                .insert()
                .into(role_entity_1.RoleEntity)
                .values({
                ...createRoleReq,
                createdBy: username,
            })
                .execute();
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRoleList(params) {
        const { pageNum, pageSize, name = '' } = params;
        try {
            const [result, total] = await this.roleEntity.findAndCount({
                skip: (pageNum - 1) * pageSize,
                take: pageSize,
                where: {
                    name: (0, typeorm_2.ILike)('%' + name + '%'),
                },
            });
            return this.r.success({
                total,
                list: result,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteRole(id) { }
    async updateRole(createMenuDto, req) { }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof ajaxResponse_service_1.AjaxResultService !== "undefined" && ajaxResponse_service_1.AjaxResultService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], RoleService);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.controller.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const user_dto_1 = __webpack_require__(/*! @libs/shared/dtos/user.dto */ "./libs/shared/src/dtos/user.dto.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/modules/user/user.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_dto_1 = __webpack_require__(/*! @libs/shared/dtos/common.dto */ "./libs/shared/src/dtos/common.dto.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    register(params) {
        const { registerDto, req } = params;
        return this.userService.register(registerDto, req);
    }
    getCaptcha() {
        return this.userService.getCaptcha();
    }
    login(loginDto) {
        return this.userService.login(loginDto);
    }
    getUserList(params) {
        return this.userService.getUserList(params);
    }
    getUserInfo(idDto) {
        const { id } = idDto;
        return this.userService.getUserInfo(id);
    }
    updateUser(params) {
        const { updateUserDto, user } = params;
        return this.userService.updateUser(updateUserDto, user);
    }
    deleteUser(params) {
        const { idsDto, user } = params;
        return this.userService.deleteUser(idsDto, user);
    }
    bindRole(bindRoleDto) {
        return this.userService.bindRole(bindRoleDto);
    }
    getBindRole(idDto) {
        const { id } = idDto;
        return this.userService.getBindRole(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)('user/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, microservices_1.MessagePattern)('user/getCaptcha'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getCaptcha", null);
__decorate([
    (0, microservices_1.MessagePattern)('user/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.LoginDto !== "undefined" && user_dto_1.LoginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)('user/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof user_dto_1.QueryUserListReq !== "undefined" && user_dto_1.QueryUserListReq) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, microservices_1.MessagePattern)('user/info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, microservices_1.MessagePattern)('user/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('user/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('user/bindRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_dto_1.BindRoleDto !== "undefined" && user_dto_1.BindRoleDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "bindRole", null);
__decorate([
    (0, microservices_1.MessagePattern)('user/getBindRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getBindRole", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.module.ts":
/*!***********************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/user-service/src/modules/user/user.controller.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/modules/user/user.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const crypto_util_1 = __webpack_require__(/*! @libs/shared/utils/crypto.util */ "./libs/shared/src/utils/crypto.util.ts");
const auth_module_1 = __webpack_require__(/*! apps/client/src/modules/auth/auth.module */ "./apps/client/src/modules/auth/auth.module.ts");
const redis_cache_module_1 = __webpack_require__(/*! @libs/shared/modules/redis-cache/redis-cache.module */ "./libs/shared/src/modules/redis-cache/redis-cache.module.ts");
const entities_1 = __webpack_require__(/*! @libs/shared/entities */ "./libs/shared/src/entities/index.ts");
const [UserEntity, RoleEntity, DepartmentEntity] = entities_1.default;
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([UserEntity, RoleEntity, DepartmentEntity]),
            auth_module_1.AuthModule,
            redis_cache_module_1.RedisCacheModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, crypto_util_1.CryptoService],
        exports: [],
    })
], UserModule);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.service.ts":
/*!************************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const user_entity_1 = __webpack_require__(/*! @libs/shared/entities/user.entity */ "./libs/shared/src/entities/user.entity.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ajaxResponse_service_1 = __webpack_require__(/*! @libs/shared/modules/ajax-responese/ajaxResponse.service */ "./libs/shared/src/modules/ajax-responese/ajaxResponse.service.ts");
const svgCaptcha = __webpack_require__(/*! svg-captcha */ "svg-captcha");
const crypto_util_1 = __webpack_require__(/*! @libs/shared/utils/crypto.util */ "./libs/shared/src/utils/crypto.util.ts");
const department_entity_1 = __webpack_require__(/*! @libs/shared/entities/department.entity */ "./libs/shared/src/entities/department.entity.ts");
const redis_cache_service_1 = __webpack_require__(/*! @libs/shared/modules/redis-cache/redis-cache.service */ "./libs/shared/src/modules/redis-cache/redis-cache.service.ts");
const auth_service_1 = __webpack_require__(/*! @client/modules/auth/auth.service */ "./apps/client/src/modules/auth/auth.service.ts");
const role_entity_1 = __webpack_require__(/*! @libs/shared/entities/role.entity */ "./libs/shared/src/entities/role.entity.ts");
let UserService = class UserService {
    constructor(cryptoService, redisCacheService, r, authService, userEntity, roleEntity, departmentEntity, configService) {
        this.cryptoService = cryptoService;
        this.redisCacheService = redisCacheService;
        this.r = r;
        this.authService = authService;
        this.userEntity = userEntity;
        this.roleEntity = roleEntity;
        this.departmentEntity = departmentEntity;
        this.configService = configService;
    }
    async getCaptcha() {
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 110,
            height: 38,
            background: '#fff',
        });
        return this.r.success(captcha.data);
    }
    async register(registerDto, req) {
        const { username } = req;
        const { password, ...otherParams } = registerDto;
        const r1 = await this.userEntity.findOneBy({ mobile: otherParams.mobile });
        if (r1) {
            return this.r.error('当前手机号已注册');
        }
        try {
            const department = await this.departmentEntity.findOneBy({
                id: otherParams.departmentId,
            });
            await this.userEntity
                .createQueryBuilder()
                .insert()
                .into(user_entity_1.UserEntity)
                .values({
                ...otherParams,
                password: await this.cryptoService.careatePassword(await this.cryptoService.decryptPassword(password)),
                department: department,
                createdBy: username,
            })
                .execute();
            return this.r.success(null, '用户注册成功');
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginDto) {
        const { mobile, password, username, captcha } = loginDto;
        const r1 = await this.userEntity.findOne({
            where: { username },
            select: ['password', 'id', 'mobile'],
        });
        if (!r1) {
            return this.r.error('用户不存在');
        }
        const passwordSame = await this.cryptoService.checkPassword(password, r1.password);
        if (!passwordSame) {
            return this.r.error('密码错误');
        }
        const { id } = r1;
        const token = this.authService.getToken({ id, username, mobile });
        this.redisCacheService.set(String(id), token, this.configService.get('JWT_EXPIRATION_TIME'));
        return this.r.success({ token }, '登录成功');
    }
    async updateUser(params, req) {
        const { roleIds, departmentId } = params;
        const { username } = req;
        try {
            const roles = await this.roleEntity.findBy({ id: (0, typeorm_2.In)(roleIds) });
            const department = await this.departmentEntity.findOneBy({
                id: departmentId,
            });
            await this.userEntity.save({
                ...params,
                roles,
                department,
                updatedBy: username,
            });
            return this.r.success(null, '用户更新成功');
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserList(params) {
        const { pageNum, pageSize, username = '', status, departmentId } = params;
        try {
            const [result, total] = await this.userEntity.findAndCount({
                skip: (pageNum - 1) * pageSize,
                take: pageSize,
                where: {
                    username: (0, typeorm_2.ILike)('%' + username + '%'),
                    status,
                    isDeleted: 0,
                    department: {
                        id: departmentId,
                    },
                },
                relations: ['roles', 'department'],
            });
            return this.r.success({
                total,
                list: result,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserInfo(id) {
        try {
            const user = await this.userEntity
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.department', 'department')
                .leftJoinAndSelect('user.roles', 'roles')
                .where('user.id = :id', { id })
                .getOne();
            const { department, roles, ...otherRes } = user;
            console.log(user);
            const _user = {
                ...otherRes,
                departmentId: department?.id,
                roleIds: roles.map((item) => item.id),
            };
            return this.r.success(_user);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(params, req) {
        const { ids } = params;
        const { username } = req;
        try {
            await this.userEntity
                .createQueryBuilder()
                .update(user_entity_1.UserEntity)
                .set({
                isDeleted: 1,
                updatedBy: username,
                updatedAt: new Date(),
            })
                .where('id IN (:...ids)', { ids })
                .execute();
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async bindRole(params) {
        const { userId, roleIds } = params;
        try {
            const user = await this.userEntity.findOne({
                where: { id: userId },
                relations: ['roles'],
            });
            const roles = await this.roleEntity.findBy({
                id: (0, typeorm_2.In)(roleIds),
            });
            user.roles = roles;
            await this.userEntity.save(user);
            return this.r.success();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBindRole(id) {
        try {
            const user = await this.userEntity.findOne({
                where: { id },
                relations: ['roles'],
            });
            const roleIds = user.roles.map((item) => item.id);
            return this.r.success(roleIds);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(department_entity_1.DepartmentEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof crypto_util_1.CryptoService !== "undefined" && crypto_util_1.CryptoService) === "function" ? _a : Object, typeof (_b = typeof redis_cache_service_1.RedisCacheService !== "undefined" && redis_cache_service_1.RedisCacheService) === "function" ? _b : Object, typeof (_c = typeof ajaxResponse_service_1.AjaxResultService !== "undefined" && ajaxResponse_service_1.AjaxResultService) === "function" ? _c : Object, typeof (_d = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _g : Object, typeof (_h = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _h : Object])
], UserService);


/***/ }),

/***/ "./libs/shared/src/bootstraps/index.ts":
/*!*********************************************!*\
  !*** ./libs/shared/src/bootstraps/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! ../entities */ "./libs/shared/src/entities/index.ts");
const initDBConfig = () => {
    return typeorm_1.TypeOrmModule.forRootAsync({
        imports: [config_1.ConfigModule],
        useFactory: async (configService) => {
            const host = configService.get('MYSQL_HOST');
            const port = configService.get('MYSQL_PORT');
            const username = configService.get('MYSQL_USER');
            const password = configService.get('MYSQL_PASSWORD');
            const database = configService.get('MYSQL_DATABASE');
            return {
                type: 'mysql',
                host: host,
                port: port,
                username: username,
                password: password,
                database: database,
                entities: entities_1.default,
                synchronize: true,
                dateStrings: true,
                logging: true,
            };
        },
        inject: [config_1.ConfigService],
    });
};
exports["default"] = [
    config_1.ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.development',
    }),
    initDBConfig(),
];


/***/ }),

/***/ "./libs/shared/src/constants/httpMessage.ts":
/*!**************************************************!*\
  !*** ./libs/shared/src/constants/httpMessage.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpMessageEnum = void 0;
var HttpMessageEnum;
(function (HttpMessageEnum) {
    HttpMessageEnum["SUCCESS"] = "\u8BF7\u6C42\u6210\u529F";
    HttpMessageEnum["BAD_REQUEST"] = "\u53C2\u6570\u9519\u8BEF";
    HttpMessageEnum["UNAUTHORIZED"] = "token\u5931\u6548";
    HttpMessageEnum["FORBIDDEN"] = "\u65E0\u6743\u9650\u8BBF\u95EE";
    HttpMessageEnum["NOT_FOUND"] = "\u8D44\u6E90\u672A\u627E\u5230";
    HttpMessageEnum["INTERNAL_SERVER_ERROR"] = "\u670D\u52A1\u5668\u9519\u8BEF";
})(HttpMessageEnum || (exports.HttpMessageEnum = HttpMessageEnum = {}));


/***/ }),

/***/ "./libs/shared/src/dtos/common.dto.ts":
/*!********************************************!*\
  !*** ./libs/shared/src/dtos/common.dto.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdDto = exports.IdsDto = exports.PaginationDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class PaginationDto {
    constructor() {
        this.pageNum = 1;
        this.pageSize = 10;
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageNum", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageSize", void 0);
class IdsDto {
}
exports.IdsDto = IdsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '删除id数组' }),
    __metadata("design:type", Object)
], IdsDto.prototype, "ids", void 0);
class IdDto {
}
exports.IdDto = IdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'id不能为空' }),
    __metadata("design:type", Number)
], IdDto.prototype, "id", void 0);


/***/ }),

/***/ "./libs/shared/src/dtos/department.dto.ts":
/*!************************************************!*\
  !*** ./libs/shared/src/dtos/department.dto.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryDepartmentTreeDto = exports.QueryDepartmentDto = exports.UpdateDepartmentDto = exports.CreateDepartmentDto = void 0;
const common_dto_1 = __webpack_require__(/*! ./common.dto */ "./libs/shared/src/dtos/common.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateDepartmentDto {
}
exports.CreateDepartmentDto = CreateDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门名称' }),
    (0, class_validator_1.IsNotEmpty)({ message: '部门名称不能为空' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门编号' }),
    (0, class_validator_1.IsNotEmpty)({ message: '部门编号不能为空' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门描述' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '父级部门ID' }),
    __metadata("design:type", Number)
], CreateDepartmentDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '排序' }),
    (0, class_validator_1.IsNotEmpty)({ message: '排序不能为空' }),
    __metadata("design:type", Number)
], CreateDepartmentDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态 1:启用 0:禁用' }),
    __metadata("design:type", Number)
], CreateDepartmentDto.prototype, "status", void 0);
class UpdateDepartmentDto extends CreateDepartmentDto {
}
exports.UpdateDepartmentDto = UpdateDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门ID' }),
    (0, class_validator_1.IsNotEmpty)({ message: '部门ID不能为空' }),
    __metadata("design:type", Number)
], UpdateDepartmentDto.prototype, "id", void 0);
class QueryDepartmentDto extends common_dto_1.PaginationDto {
}
exports.QueryDepartmentDto = QueryDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门名称' }),
    __metadata("design:type", String)
], QueryDepartmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门编号' }),
    __metadata("design:type", String)
], QueryDepartmentDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态 1:启用 0:禁用' }),
    __metadata("design:type", Number)
], QueryDepartmentDto.prototype, "status", void 0);
class QueryDepartmentTreeDto {
}
exports.QueryDepartmentTreeDto = QueryDepartmentTreeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门名称' }),
    __metadata("design:type", String)
], QueryDepartmentTreeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门编号' }),
    __metadata("design:type", String)
], QueryDepartmentTreeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态 1:启用 0:禁用' }),
    __metadata("design:type", Number)
], QueryDepartmentTreeDto.prototype, "status", void 0);


/***/ }),

/***/ "./libs/shared/src/dtos/role.dto.ts":
/*!******************************************!*\
  !*** ./libs/shared/src/dtos/role.dto.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryRoleDto = exports.CreateRoleDto = void 0;
const common_dto_1 = __webpack_require__(/*! ./common.dto */ "./libs/shared/src/dtos/common.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateRoleDto extends common_dto_1.PaginationDto {
}
exports.CreateRoleDto = CreateRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色名' }),
    (0, class_validator_1.IsString)({ message: '角色名不能为空' }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色编码' }),
    (0, class_validator_1.IsString)({ message: '角色编码不能为空' }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '排序' }),
    __metadata("design:type", Number)
], CreateRoleDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色描述' }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "description", void 0);
class QueryRoleDto extends common_dto_1.PaginationDto {
}
exports.QueryRoleDto = QueryRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色名' }),
    __metadata("design:type", String)
], QueryRoleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色编码' }),
    __metadata("design:type", String)
], QueryRoleDto.prototype, "code", void 0);


/***/ }),

/***/ "./libs/shared/src/dtos/user.dto.ts":
/*!******************************************!*\
  !*** ./libs/shared/src/dtos/user.dto.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BindRoleDto = exports.UpdateUserDto = exports.QueryUserListReq = exports.LoginDto = exports.RegisterDto = void 0;
const common_dto_1 = __webpack_require__(/*! ./common.dto */ "./libs/shared/src/dtos/common.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    (0, class_validator_1.IsNotEmpty)({ message: '用户名不能为空' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门id' }),
    __metadata("design:type", Number)
], RegisterDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色id（多个）' }),
    __metadata("design:type", Array)
], RegisterDto.prototype, "roleIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "mobile", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsString)({ message: '用户名不能为空' }),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "captcha", void 0);
class QueryUserListReq extends common_dto_1.PaginationDto {
}
exports.QueryUserListReq = QueryUserListReq;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    __metadata("design:type", String)
], QueryUserListReq.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态 1:启用 0:禁用' }),
    __metadata("design:type", Number)
], QueryUserListReq.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门ID' }),
    __metadata("design:type", Number)
], QueryUserListReq.prototype, "departmentId", void 0);
class UpdateUserDto extends RegisterDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户ID' }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "id", void 0);
class BindRoleDto {
}
exports.BindRoleDto = BindRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '多个角色ID' }),
    __metadata("design:type", Array)
], BindRoleDto.prototype, "roleIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户ID' }),
    __metadata("design:type", Number)
], BindRoleDto.prototype, "userId", void 0);


/***/ }),

/***/ "./libs/shared/src/entities/common.entity.ts":
/*!***************************************************!*\
  !*** ./libs/shared/src/entities/common.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
class BaseEntity {
}
exports.BaseEntity = BaseEntity;
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        comment: '创建时间',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_by',
        nullable: true,
        comment: '创建人',
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'updated_at',
        comment: '更新时间',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_by',
        nullable: true,
        comment: '更新人',
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_deleted',
        default: 0,
        comment: '软删除 1删除 0未删除',
        select: false,
    }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "isDeleted", void 0);


/***/ }),

/***/ "./libs/shared/src/entities/department.entity.ts":
/*!*******************************************************!*\
  !*** ./libs/shared/src/entities/department.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const common_entity_1 = __webpack_require__(/*! ./common.entity */ "./libs/shared/src/entities/common.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/shared/src/entities/user.entity.ts");
let DepartmentEntity = class DepartmentEntity extends common_entity_1.BaseEntity {
};
exports.DepartmentEntity = DepartmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: '部门id',
    }),
    __metadata("design:type", Number)
], DepartmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '部门名称',
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], DepartmentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '部门编号',
    }),
    __metadata("design:type", String)
], DepartmentEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '部门描述',
        type: 'varchar',
        length: 200,
    }),
    __metadata("design:type", String)
], DepartmentEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '父级部门id',
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], DepartmentEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '排序',
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], DepartmentEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '是否启用 1是 0否',
        type: 'int',
        default: 1,
    }),
    __metadata("design:type", Number)
], DepartmentEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", DepartmentEntity)
], DepartmentEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], DepartmentEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (user) => user.department),
    __metadata("design:type", Array)
], DepartmentEntity.prototype, "users", void 0);
exports.DepartmentEntity = DepartmentEntity = __decorate([
    (0, typeorm_1.Entity)('sys_department')
], DepartmentEntity);


/***/ }),

/***/ "./libs/shared/src/entities/index.ts":
/*!*******************************************!*\
  !*** ./libs/shared/src/entities/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/shared/src/entities/user.entity.ts");
const department_entity_1 = __webpack_require__(/*! ./department.entity */ "./libs/shared/src/entities/department.entity.ts");
const menu_entity_1 = __webpack_require__(/*! ./menu.entity */ "./libs/shared/src/entities/menu.entity.ts");
const role_entity_1 = __webpack_require__(/*! ./role.entity */ "./libs/shared/src/entities/role.entity.ts");
const subject_entity_1 = __webpack_require__(/*! ./subject.entity */ "./libs/shared/src/entities/subject.entity.ts");
exports["default"] = [
    user_entity_1.UserEntity,
    department_entity_1.DepartmentEntity,
    role_entity_1.RoleEntity,
    menu_entity_1.MenuEntity,
    subject_entity_1.SubjectEntity,
];


/***/ }),

/***/ "./libs/shared/src/entities/menu.entity.ts":
/*!*************************************************!*\
  !*** ./libs/shared/src/entities/menu.entity.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const common_entity_1 = __webpack_require__(/*! ./common.entity */ "./libs/shared/src/entities/common.entity.ts");
let MenuEntity = class MenuEntity extends common_entity_1.BaseEntity {
};
exports.MenuEntity = MenuEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: '菜单id',
    }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '菜单类型 1:目录 2:菜单 3:按钮',
    }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '上级菜单id',
        nullable: true,
    }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '菜单名称',
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '组件名称',
        nullable: true,
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "componentName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '组件路径',
        nullable: true,
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "componentPath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '重定向',
        nullable: true,
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "redirect", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '菜单图标',
        nullable: true,
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '菜单路径',
        nullable: true,
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '排序',
        nullable: true,
    }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '权限标识',
        nullable: true,
    }),
    __metadata("design:type", String)
], MenuEntity.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '状态 1:启用 0:禁用',
    }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "status", void 0);
exports.MenuEntity = MenuEntity = __decorate([
    (0, typeorm_1.Entity)('sys_menus')
], MenuEntity);


/***/ }),

/***/ "./libs/shared/src/entities/role.entity.ts":
/*!*************************************************!*\
  !*** ./libs/shared/src/entities/role.entity.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const common_entity_1 = __webpack_require__(/*! ./common.entity */ "./libs/shared/src/entities/common.entity.ts");
let RoleEntity = class RoleEntity extends common_entity_1.BaseEntity {
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: '角色id',
    }),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '角色名称',
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '角色编码',
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '排序',
        nullable: true,
    }),
    __metadata("design:type", Number)
], RoleEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '描述',
        nullable: true,
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "description", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)('sys_roles')
], RoleEntity);


/***/ }),

/***/ "./libs/shared/src/entities/subject.entity.ts":
/*!****************************************************!*\
  !*** ./libs/shared/src/entities/subject.entity.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubjectEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const common_entity_1 = __webpack_require__(/*! ./common.entity */ "./libs/shared/src/entities/common.entity.ts");
let SubjectEntity = class SubjectEntity extends common_entity_1.BaseEntity {
};
exports.SubjectEntity = SubjectEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: '科目id',
    }),
    __metadata("design:type", Number)
], SubjectEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '科目类型 1:科目 2:题型',
    }),
    __metadata("design:type", Number)
], SubjectEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '上级科目id',
        nullable: true,
    }),
    __metadata("design:type", Number)
], SubjectEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '名称',
    }),
    __metadata("design:type", String)
], SubjectEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '菜单图标',
        nullable: true,
    }),
    __metadata("design:type", String)
], SubjectEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '排序',
        nullable: true,
    }),
    __metadata("design:type", Number)
], SubjectEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '状态 1:启用 0:禁用',
    }),
    __metadata("design:type", Number)
], SubjectEntity.prototype, "status", void 0);
exports.SubjectEntity = SubjectEntity = __decorate([
    (0, typeorm_1.Entity)('portal_subjects')
], SubjectEntity);


/***/ }),

/***/ "./libs/shared/src/entities/user.entity.ts":
/*!*************************************************!*\
  !*** ./libs/shared/src/entities/user.entity.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const common_entity_1 = __webpack_require__(/*! ./common.entity */ "./libs/shared/src/entities/common.entity.ts");
const department_entity_1 = __webpack_require__(/*! ./department.entity */ "./libs/shared/src/entities/department.entity.ts");
const role_entity_1 = __webpack_require__(/*! ./role.entity */ "./libs/shared/src/entities/role.entity.ts");
let UserEntity = class UserEntity extends common_entity_1.BaseEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: '用户id',
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '用户名',
        length: 30,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '密码',
        select: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '手机号',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '昵称',
        length: 30,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '邮箱',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '性别 1-男 2-女',
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '描述',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '状态 0-禁用 1-启用',
        default: 1,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.DepartmentEntity, (department) => department.users),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    __metadata("design:type", typeof (_a = typeof typeorm_1.Relation !== "undefined" && typeorm_1.Relation) === "function" ? _a : Object)
], UserEntity.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity, (role) => role.id),
    (0, typeorm_1.JoinTable)({
        name: 'sys_user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", typeof (_b = typeof typeorm_1.Relation !== "undefined" && typeorm_1.Relation) === "function" ? _b : Object)
], UserEntity.prototype, "roles", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('sys_users')
], UserEntity);


/***/ }),

/***/ "./libs/shared/src/index.ts":
/*!**********************************!*\
  !*** ./libs/shared/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./shared.module */ "./libs/shared/src/shared.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./shared.service */ "./libs/shared/src/shared.service.ts"), exports);


/***/ }),

/***/ "./libs/shared/src/modules/ajax-responese/ajaxRespones.module.ts":
/*!***********************************************************************!*\
  !*** ./libs/shared/src/modules/ajax-responese/ajaxRespones.module.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AjaxResultjaxResponesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ajaxResponse_service_1 = __webpack_require__(/*! ./ajaxResponse.service */ "./libs/shared/src/modules/ajax-responese/ajaxResponse.service.ts");
let AjaxResultjaxResponesModule = class AjaxResultjaxResponesModule {
};
exports.AjaxResultjaxResponesModule = AjaxResultjaxResponesModule;
exports.AjaxResultjaxResponesModule = AjaxResultjaxResponesModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [ajaxResponse_service_1.AjaxResultService],
        exports: [ajaxResponse_service_1.AjaxResultService],
    })
], AjaxResultjaxResponesModule);


/***/ }),

/***/ "./libs/shared/src/modules/ajax-responese/ajaxResponse.service.ts":
/*!************************************************************************!*\
  !*** ./libs/shared/src/modules/ajax-responese/ajaxResponse.service.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AjaxResultService = void 0;
const httpMessage_1 = __webpack_require__(/*! ../../constants/httpMessage */ "./libs/shared/src/constants/httpMessage.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AjaxResultService = class AjaxResultService {
    success(data, message, status) {
        return AjaxResult.success(data, (message = message || httpMessage_1.HttpMessageEnum.SUCCESS), (status = status || common_1.HttpStatus.OK));
    }
    error(message, status) {
        return AjaxResult.error((message = message || httpMessage_1.HttpMessageEnum.INTERNAL_SERVER_ERROR), (status = status || common_1.HttpStatus.INTERNAL_SERVER_ERROR));
    }
};
exports.AjaxResultService = AjaxResultService;
exports.AjaxResultService = AjaxResultService = __decorate([
    (0, common_1.Injectable)()
], AjaxResultService);
class AjaxResult {
    constructor(data, status, message, success) {
        this.data = data;
        this.status = status;
        this.message = message;
        this.success = success;
    }
    static success(data, msg, code) {
        return new AjaxResult(data, code, msg, true);
    }
    static error(msg, status) {
        return new AjaxResult(null, status, msg, false);
    }
}


/***/ }),

/***/ "./libs/shared/src/modules/redis-cache/redis-cache.module.ts":
/*!*******************************************************************!*\
  !*** ./libs/shared/src/modules/redis-cache/redis-cache.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisCacheModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const ioredis_1 = __webpack_require__(/*! ioredis */ "ioredis");
const redis_cache_service_1 = __webpack_require__(/*! ./redis-cache.service */ "./libs/shared/src/modules/redis-cache/redis-cache.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let RedisCacheModule = class RedisCacheModule {
};
exports.RedisCacheModule = RedisCacheModule;
exports.RedisCacheModule = RedisCacheModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'REDIS_SERVICE',
                    useFactory: async (configService) => ({
                        options: {
                            host: configService.get('MYSQL_HOST'),
                        },
                        transport: microservices_1.Transport.REDIS,
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        providers: [redis_cache_service_1.RedisCacheService, ioredis_1.Redis],
        exports: [redis_cache_service_1.RedisCacheService, ioredis_1.Redis],
    })
], RedisCacheModule);


/***/ }),

/***/ "./libs/shared/src/modules/redis-cache/redis-cache.service.ts":
/*!********************************************************************!*\
  !*** ./libs/shared/src/modules/redis-cache/redis-cache.service.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisCacheService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ioredis_1 = __webpack_require__(/*! ioredis */ "ioredis");
let RedisCacheService = class RedisCacheService {
    constructor(redis) {
        this.redis = redis;
    }
    async get(key) {
        try {
            const res = await this.redis.get(key);
            return JSON.parse(res);
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async set(key, value, ttl = 10000) {
        try {
            return await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(key) {
        try {
            return await this.redis.del(key);
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.RedisCacheService = RedisCacheService;
exports.RedisCacheService = RedisCacheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof ioredis_1.Redis !== "undefined" && ioredis_1.Redis) === "function" ? _a : Object])
], RedisCacheService);


/***/ }),

/***/ "./libs/shared/src/resp/common.resp.ts":
/*!*********************************************!*\
  !*** ./libs/shared/src/resp/common.resp.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseResp = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class BaseResp {
}
exports.BaseResp = BaseResp;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '创建时间' }),
    (0, class_transformer_1.Expose)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseResp.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '创建人' }),
    (0, class_transformer_1.Expose)({ name: 'created_by' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseResp.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '更新时间' }),
    (0, class_transformer_1.Expose)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BaseResp.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '更新人' }),
    (0, class_transformer_1.Expose)({ name: 'updated_by' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BaseResp.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '软删除 1删除 0未删除' }),
    (0, class_transformer_1.Expose)({ name: 'is_deleted' }),
    __metadata("design:type", Number)
], BaseResp.prototype, "isDeleted", void 0);


/***/ }),

/***/ "./libs/shared/src/resp/department.resp.ts":
/*!*************************************************!*\
  !*** ./libs/shared/src/resp/department.resp.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentTreeResp = void 0;
const common_resp_1 = __webpack_require__(/*! ./common.resp */ "./libs/shared/src/resp/common.resp.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class DepartmentTreeResp extends common_resp_1.BaseResp {
}
exports.DepartmentTreeResp = DepartmentTreeResp;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门id' }),
    __metadata("design:type", Number)
], DepartmentTreeResp.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门名称' }),
    __metadata("design:type", String)
], DepartmentTreeResp.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '父级部门id' }),
    __metadata("design:type", Number)
], DepartmentTreeResp.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门描述' }),
    __metadata("design:type", String)
], DepartmentTreeResp.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '排序' }),
    __metadata("design:type", Number)
], DepartmentTreeResp.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态 1:启用 0:禁用' }),
    __metadata("design:type", Boolean)
], DepartmentTreeResp.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '子部门',
        type: DepartmentTreeResp,
        isArray: true,
    }),
    __metadata("design:type", Array)
], DepartmentTreeResp.prototype, "children", void 0);


/***/ }),

/***/ "./libs/shared/src/shared.module.ts":
/*!******************************************!*\
  !*** ./libs/shared/src/shared.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_service_1 = __webpack_require__(/*! ./shared.service */ "./libs/shared/src/shared.service.ts");
const ajaxRespones_module_1 = __webpack_require__(/*! ./modules/ajax-responese/ajaxRespones.module */ "./libs/shared/src/modules/ajax-responese/ajaxRespones.module.ts");
const redis_cache_module_1 = __webpack_require__(/*! ./modules/redis-cache/redis-cache.module */ "./libs/shared/src/modules/redis-cache/redis-cache.module.ts");
const bootstraps_1 = __webpack_require__(/*! ./bootstraps */ "./libs/shared/src/bootstraps/index.ts");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [...bootstraps_1.default, ajaxRespones_module_1.AjaxResultjaxResponesModule, redis_cache_module_1.RedisCacheModule],
        providers: [shared_service_1.SharedService],
        exports: [shared_service_1.SharedService],
    })
], SharedModule);


/***/ }),

/***/ "./libs/shared/src/shared.service.ts":
/*!*******************************************!*\
  !*** ./libs/shared/src/shared.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let SharedService = class SharedService {
};
exports.SharedService = SharedService;
exports.SharedService = SharedService = __decorate([
    (0, common_1.Injectable)()
], SharedService);


/***/ }),

/***/ "./libs/shared/src/utils/buildTree.ts":
/*!********************************************!*\
  !*** ./libs/shared/src/utils/buildTree.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildTreeByPath = buildTreeByPath;
function buildTreeByPath(res) {
    const map = {};
    res.forEach((department) => {
        map[department.id] = { ...department };
    });
    const tree = [];
    res.forEach((department) => {
        const pathParts = department.path.split(',');
        const parentId = pathParts.length > 1 ? +pathParts[pathParts.length - 2] : null;
        if (parentId === null) {
            tree.push(map[department.id]);
        }
        else {
            if (map[parentId]) {
                map[parentId].children = map[parentId].children || [];
                map[parentId].children.push(map[department.id]);
            }
        }
    });
    return tree;
}


/***/ }),

/***/ "./libs/shared/src/utils/crypto.util.ts":
/*!**********************************************!*\
  !*** ./libs/shared/src/utils/crypto.util.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CryptoService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const crypto = __webpack_require__(/*! crypto */ "crypto");
let CryptoService = class CryptoService {
    constructor(configService) {
        this.configService = configService;
    }
    async careatePassword(password) {
        const hmac = crypto.createHmac(this.configService.get('CRYPTO_ALGORITHM'), this.configService.get('CRYPTO_SECRET'));
        const salt = this.configService.get('CRYPTO_SALT').salt;
        hmac.update(password + salt);
        return hmac.digest('hex');
    }
    async decryptPassword(password) {
        const key = this.configService.get('CRYPTO_HEX_KEY');
        const iv = this.configService.get('CRYPTO_HEX_IV');
        password = Buffer.from(password, 'base64').toString('binary');
        const de = crypto.createDecipheriv('aes-128-cbc', key, iv);
        de.setAutoPadding(true);
        let _password = de.update(password, 'binary', 'utf8');
        _password += de.final('utf8');
        return _password;
    }
    async checkPassword(password, hash_password) {
        const _password = await this.decryptPassword(password);
        password = await this.careatePassword(_password);
        return password === hash_password;
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CryptoService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "ioredis":
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "svg-captcha":
/*!******************************!*\
  !*** external "svg-captcha" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("svg-captcha");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***************************************!*\
  !*** ./apps/user-service/src/main.ts ***!
  \***************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/user-service/src/app.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3001,
        },
    });
    await app.listen();
}
bootstrap();

})();

/******/ })()
;