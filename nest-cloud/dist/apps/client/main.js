/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/client/src/bootstraps/index.ts":
/*!*********************************************!*\
  !*** ./apps/client/src/bootstraps/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
exports["default"] = [
    config_1.ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.development',
    }),
    microservices_1.ClientsModule.register([
        {
            name: 'USER_SERVICE',
            transport: microservices_1.Transport.TCP,
            options: {
                host: 'localhost',
                port: 3001,
            },
        },
    ]),
];


/***/ }),

/***/ "./apps/client/src/client.module.ts":
/*!******************************************!*\
  !*** ./apps/client/src/client.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_controller_1 = __webpack_require__(/*! ./controllers/user.controller */ "./apps/client/src/controllers/user.controller.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ "./apps/client/src/modules/auth/auth.module.ts");
const shared_1 = __webpack_require__(/*! @libs/shared */ "./libs/shared/src/index.ts");
const bootstraps_1 = __webpack_require__(/*! ./bootstraps */ "./apps/client/src/bootstraps/index.ts");
const department_controller_1 = __webpack_require__(/*! ./controllers/department.controller */ "./apps/client/src/controllers/department.controller.ts");
const menu_controller_1 = __webpack_require__(/*! ./controllers/menu.controller */ "./apps/client/src/controllers/menu.controller.ts");
const role_controller_1 = __webpack_require__(/*! ./controllers/role.controller */ "./apps/client/src/controllers/role.controller.ts");
const httpException_filter_1 = __webpack_require__(/*! ./filters/httpException.filter */ "./apps/client/src/filters/httpException.filter.ts");
let ClientModule = class ClientModule {
};
exports.ClientModule = ClientModule;
exports.ClientModule = ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [...bootstraps_1.default, shared_1.SharedModule, auth_module_1.AuthModule],
        controllers: [
            user_controller_1.UserController,
            department_controller_1.DepartmentController,
            menu_controller_1.MenuController,
            role_controller_1.RoleController,
        ],
        providers: [
            {
                provide: 'APP_FILTER',
                useClass: httpException_filter_1.AllExceptionsFilter,
            },
        ],
    })
], ClientModule);


/***/ }),

/***/ "./apps/client/src/controllers/department.controller.ts":
/*!**************************************************************!*\
  !*** ./apps/client/src/controllers/department.controller.ts ***!
  \**************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentController = void 0;
const JwtAuth_guard_1 = __webpack_require__(/*! @client/guards/JwtAuth.guard */ "./apps/client/src/guards/JwtAuth.guard.ts");
const common_dto_1 = __webpack_require__(/*! @libs/shared/dtos/common.dto */ "./libs/shared/src/dtos/common.dto.ts");
const department_dto_1 = __webpack_require__(/*! @libs/shared/dtos/department.dto */ "./libs/shared/src/dtos/department.dto.ts");
const customRequest_1 = __webpack_require__(/*! @libs/shared/types/customRequest */ "./libs/shared/src/types/customRequest.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let DepartmentController = class DepartmentController {
    constructor(userService) {
        this.userService = userService;
    }
    createDepartment(createDepartmentDto, req) {
        return this.userService.send('department/create', {
            createDepartmentDto,
            user: req.user,
        });
    }
    deleteDepartment(idDto, req) {
        return this.userService.send('department/delete', {
            idDto,
            user: req.user,
        });
    }
    updateDepartment(updateDepartmentDto, req) {
        return this.userService.send('department/update', {
            updateDepartmentDto,
            user: req.user,
        });
    }
    getDepartmentList(queryDepartmentDto) {
        return this.userService.send('department/query', queryDepartmentDto);
    }
    getDepartmentTree(queryDepartmentTreeDto) {
        return this.userService.send('department/queryTree', queryDepartmentTreeDto);
    }
    getDepartmentInfo(idDto) {
        return this.userService.send('department/info', idDto);
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiOperation)({ summary: '新增部门' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof department_dto_1.CreateDepartmentDto !== "undefined" && department_dto_1.CreateDepartmentDto) === "function" ? _b : Object, typeof (_c = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    (0, swagger_1.ApiOperation)({ summary: '删除部门' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _d : Object, typeof (_e = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "deleteDepartment", null);
__decorate([
    (0, common_1.Put)('/update'),
    (0, swagger_1.ApiOperation)({ summary: '修改部门' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof department_dto_1.UpdateDepartmentDto !== "undefined" && department_dto_1.UpdateDepartmentDto) === "function" ? _f : Object, typeof (_g = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Post)('/query'),
    (0, swagger_1.ApiOperation)({ summary: '查询部门列表' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof department_dto_1.QueryDepartmentDto !== "undefined" && department_dto_1.QueryDepartmentDto) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartmentList", null);
__decorate([
    (0, common_1.Post)('/queryTree'),
    (0, swagger_1.ApiOperation)({ summary: '查询部门树' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof department_dto_1.QueryDepartmentTreeDto !== "undefined" && department_dto_1.QueryDepartmentTreeDto) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartmentTree", null);
__decorate([
    (0, common_1.Get)('/info'),
    (0, swagger_1.ApiOperation)({ summary: '查询部门详情' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _k : Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "getDepartmentInfo", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, common_1.Controller)('department'),
    (0, swagger_1.ApiTags)('部门管理'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], DepartmentController);


/***/ }),

/***/ "./apps/client/src/controllers/menu.controller.ts":
/*!********************************************************!*\
  !*** ./apps/client/src/controllers/menu.controller.ts ***!
  \********************************************************/
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
exports.MenuController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const menu_dto_1 = __webpack_require__(/*! @libs/shared/dtos/menu.dto */ "./libs/shared/src/dtos/menu.dto.ts");
const common_dto_1 = __webpack_require__(/*! @libs/shared/dtos/common.dto */ "./libs/shared/src/dtos/common.dto.ts");
const JwtAuth_guard_1 = __webpack_require__(/*! @client/guards/JwtAuth.guard */ "./apps/client/src/guards/JwtAuth.guard.ts");
const customRequest_1 = __webpack_require__(/*! @libs/shared/types/customRequest */ "./libs/shared/src/types/customRequest.ts");
let MenuController = class MenuController {
    constructor(userService) {
        this.userService = userService;
    }
    createMenu(createMenuDto, req) {
        return this.userService.send('menu/create', {
            createMenuDto,
            user: req.user,
        });
    }
    deleteMenu(idDto, req) {
        return this.userService.send('menu/delete', {
            idDto,
            user: req.user,
        });
    }
    updateMenu(updateMenuDto, req) {
        return this.userService.send('menu/update', {
            updateMenuDto,
            user: req.user,
        });
    }
    getMenuList() {
        return this.userService.send('menu/queryTree', {});
    }
    getMenuInfo(idDto) {
        return this.userService.send('menu/info', idDto);
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiOperation)({ summary: '新增菜单' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof menu_dto_1.CreateMenuDto !== "undefined" && menu_dto_1.CreateMenuDto) === "function" ? _b : Object, typeof (_c = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    (0, swagger_1.ApiOperation)({ summary: '删除菜单' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _d : Object, typeof (_e = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "deleteMenu", null);
__decorate([
    (0, common_1.Put)('/update'),
    (0, swagger_1.ApiOperation)({ summary: '更新菜单' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof menu_dto_1.UpdateMenuDto !== "undefined" && menu_dto_1.UpdateMenuDto) === "function" ? _f : Object, typeof (_g = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "updateMenu", null);
__decorate([
    (0, common_1.Get)('/queryTree'),
    (0, swagger_1.ApiOperation)({ summary: '获取菜单列表' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuList", null);
__decorate([
    (0, common_1.Get)('/info'),
    (0, swagger_1.ApiOperation)({ summary: '获取菜单详情' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuInfo", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    (0, swagger_1.ApiTags)('系统菜单管理'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], MenuController);


/***/ }),

/***/ "./apps/client/src/controllers/role.controller.ts":
/*!********************************************************!*\
  !*** ./apps/client/src/controllers/role.controller.ts ***!
  \********************************************************/
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleController = void 0;
const JwtAuth_guard_1 = __webpack_require__(/*! @client/guards/JwtAuth.guard */ "./apps/client/src/guards/JwtAuth.guard.ts");
const common_dto_1 = __webpack_require__(/*! @libs/shared/dtos/common.dto */ "./libs/shared/src/dtos/common.dto.ts");
const menu_dto_1 = __webpack_require__(/*! @libs/shared/dtos/menu.dto */ "./libs/shared/src/dtos/menu.dto.ts");
const role_dto_1 = __webpack_require__(/*! @libs/shared/dtos/role.dto */ "./libs/shared/src/dtos/role.dto.ts");
const customRequest_1 = __webpack_require__(/*! @libs/shared/types/customRequest */ "./libs/shared/src/types/customRequest.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let RoleController = class RoleController {
    constructor(userService) {
        this.userService = userService;
    }
    createRole(createRoleReq, req) {
        return this.userService.send('role/create', {
            createRoleReq,
            user: req.user,
        });
    }
    getRoleList(createRoleReq) {
        return this.userService.send('role/list', createRoleReq);
    }
    deleteRole(roleId) {
        return this.userService.send('role/delete', roleId);
    }
    updateRole(createMenuDto, req) {
        return this.userService.send('role/update', {
            createMenuDto,
            user: req.user,
        });
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '新增角色' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof role_dto_1.CreateRoleDto !== "undefined" && role_dto_1.CreateRoleDto) === "function" ? _b : Object, typeof (_c = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取角色列表' }),
    (0, common_1.Post)('/list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof role_dto_1.QueryRoleDto !== "undefined" && role_dto_1.QueryRoleDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getRoleList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除角色' }),
    (0, common_1.Post)('/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "deleteRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新角色' }),
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof menu_dto_1.CreateMenuDto !== "undefined" && menu_dto_1.CreateMenuDto) === "function" ? _f : Object, typeof (_g = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "updateRole", null);
exports.RoleController = RoleController = __decorate([
    (0, swagger_1.ApiTags)('系统角色管理'),
    (0, common_1.Controller)('role'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], RoleController);


/***/ }),

/***/ "./apps/client/src/controllers/user.controller.ts":
/*!********************************************************!*\
  !*** ./apps/client/src/controllers/user.controller.ts ***!
  \********************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_dto_1 = __webpack_require__(/*! @libs/shared/dtos/common.dto */ "./libs/shared/src/dtos/common.dto.ts");
const user_dto_1 = __webpack_require__(/*! @libs/shared/dtos/user.dto */ "./libs/shared/src/dtos/user.dto.ts");
const customRequest_1 = __webpack_require__(/*! @libs/shared/types/customRequest */ "./libs/shared/src/types/customRequest.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const JwtAuth_guard_1 = __webpack_require__(/*! ../guards/JwtAuth.guard */ "./apps/client/src/guards/JwtAuth.guard.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    register(registerDto, req) {
        return this.userService.send('user/register', { registerDto, req });
    }
    getCaptcha() {
        return this.userService.send('user/getCaptcha', {});
    }
    login(loginDto) {
        return this.userService.send('user/login', loginDto);
    }
    getUserList(params) {
        return this.userService.send('user/list', params);
    }
    getUserInfo(req) {
        return this.userService.send('user/info', req);
    }
    updateUser(updateUserDto, req) {
        return this.userService.send('user/update', {
            updateUserDto,
            user: req.user,
        });
    }
    deleteUser(idsDto, req) {
        return this.userService.send('user/delete', { idsDto, user: req.user });
    }
    bindRole(bindRoleDto) {
        return this.userService.send('user/bindRole', bindRoleDto);
    }
    getBindRole(idDto) {
        return this.userService.send('user/getBindRole', idDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiOperation)({ summary: '注册' }),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.RegisterDto !== "undefined" && user_dto_1.RegisterDto) === "function" ? _b : Object, typeof (_c = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('getCaptcha'),
    (0, swagger_1.ApiOperation)({ summary: '获取验证码' }),
    (0, microservices_1.MessagePattern)('user/getCaptcha'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getCaptcha", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({ summary: '登录' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.LoginDto !== "undefined" && user_dto_1.LoginDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取用户列表' }),
    (0, common_1.Post)('list'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    (0, microservices_1.MessagePattern)('user/list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_dto_1.QueryUserListReq !== "undefined" && user_dto_1.QueryUserListReq) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取用户信息' }),
    (0, common_1.Get)('info'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新用户' }),
    (0, common_1.Put)('update'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _g : Object, typeof (_h = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除用户' }),
    (0, common_1.Delete)('delete'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof common_dto_1.IdsDto !== "undefined" && common_dto_1.IdsDto) === "function" ? _j : Object, typeof (_k = typeof customRequest_1.CustomRequest !== "undefined" && customRequest_1.CustomRequest) === "function" ? _k : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '绑定角色' }),
    (0, common_1.Post)('bindRole'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    (0, microservices_1.MessagePattern)('user/bindRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof user_dto_1.BindRoleDto !== "undefined" && user_dto_1.BindRoleDto) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "bindRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取用户已绑定角色' }),
    (0, common_1.Get)('getBindRole'),
    (0, common_1.UseGuards)(JwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof common_dto_1.IdDto !== "undefined" && common_dto_1.IdDto) === "function" ? _m : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getBindRole", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('用户管理'),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./apps/client/src/filters/httpException.filter.ts":
/*!*********************************************************!*\
  !*** ./apps/client/src/filters/httpException.filter.ts ***!
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
exports.AllExceptionsFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const dayjs = __webpack_require__(/*! dayjs */ "dayjs");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const statusCode = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const resContents = {
            status: statusCode,
            cause: exception?.cause,
            errName: exception?.name,
            message: exception?.message,
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            path: httpAdapter.getRequestUrl(request),
        };
        httpAdapter.reply(response, resContents, statusCode);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.HttpAdapterHost !== "undefined" && core_1.HttpAdapterHost) === "function" ? _a : Object])
], AllExceptionsFilter);


/***/ }),

/***/ "./apps/client/src/guards/JwtAuth.guard.ts":
/*!*************************************************!*\
  !*** ./apps/client/src/guards/JwtAuth.guard.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),

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

/***/ "./libs/shared/src/dtos/menu.dto.ts":
/*!******************************************!*\
  !*** ./libs/shared/src/dtos/menu.dto.ts ***!
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
exports.QueryMenuInfoDto = exports.UpdateMenuDto = exports.CreateMenuDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateMenuDto {
}
exports.CreateMenuDto = CreateMenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单类型 1:目录 2:菜单 3:按钮' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: '菜单类型不能为空' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '父级id' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单名称' }),
    (0, class_validator_1.IsNotEmpty)({ message: '菜单名称不能为空' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单路径' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "route", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '组件路径' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "componentPath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '排序' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态 0:禁用 1:启用' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '图标' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "icon", void 0);
class UpdateMenuDto extends CreateMenuDto {
}
exports.UpdateMenuDto = UpdateMenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单id' }),
    __metadata("design:type", Number)
], UpdateMenuDto.prototype, "id", void 0);
class QueryMenuInfoDto {
}
exports.QueryMenuInfoDto = QueryMenuInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单id' }),
    __metadata("design:type", Number)
], QueryMenuInfoDto.prototype, "id", void 0);


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

/***/ "./libs/shared/src/types/customRequest.ts":
/*!************************************************!*\
  !*** ./libs/shared/src/types/customRequest.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");

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

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

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
/*!*********************************!*\
  !*** ./apps/client/src/main.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const client_module_1 = __webpack_require__(/*! ./client.module */ "./apps/client/src/client.module.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(client_module_1.ClientModule);
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle('nest api文档')
        .setDescription('这是一个描述')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L25lc3QtY2xvdWQvLi9hcHBzL2NsaWVudC9zcmMvYm9vdHN0cmFwcy9pbmRleC50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkLy4vYXBwcy9jbGllbnQvc3JjL2NsaWVudC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2FwcHMvY2xpZW50L3NyYy9jb250cm9sbGVycy9kZXBhcnRtZW50LmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2FwcHMvY2xpZW50L3NyYy9jb250cm9sbGVycy9tZW51LmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2FwcHMvY2xpZW50L3NyYy9jb250cm9sbGVycy9yb2xlLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2FwcHMvY2xpZW50L3NyYy9jb250cm9sbGVycy91c2VyLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2FwcHMvY2xpZW50L3NyYy9maWx0ZXJzL2h0dHBFeGNlcHRpb24uZmlsdGVyLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9hcHBzL2NsaWVudC9zcmMvZ3VhcmRzL0p3dEF1dGguZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2FwcHMvY2xpZW50L3NyYy9tb2R1bGVzL2F1dGgvYXV0aC5jb250cm9sbGVyLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9hcHBzL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2F1dGgubW9kdWxlLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9hcHBzL2NsaWVudC9zcmMvbW9kdWxlcy9hdXRoL2F1dGguc2VydmljZS50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkLy4vbGlicy9zaGFyZWQvc3JjL2Jvb3RzdHJhcHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2xpYnMvc2hhcmVkL3NyYy9jb25zdGFudHMvaHR0cE1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2xpYnMvc2hhcmVkL3NyYy9kdG9zL2NvbW1vbi5kdG8udHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2xpYnMvc2hhcmVkL3NyYy9kdG9zL2RlcGFydG1lbnQuZHRvLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvZHRvcy9tZW51LmR0by50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkLy4vbGlicy9zaGFyZWQvc3JjL2R0b3Mvcm9sZS5kdG8udHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2xpYnMvc2hhcmVkL3NyYy9kdG9zL3VzZXIuZHRvLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvZW50aXRpZXMvY29tbW9uLmVudGl0eS50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkLy4vbGlicy9zaGFyZWQvc3JjL2VudGl0aWVzL2RlcGFydG1lbnQuZW50aXR5LnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvZW50aXRpZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2xpYnMvc2hhcmVkL3NyYy9lbnRpdGllcy9tZW51LmVudGl0eS50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkLy4vbGlicy9zaGFyZWQvc3JjL2VudGl0aWVzL3JvbGUuZW50aXR5LnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvZW50aXRpZXMvc3ViamVjdC5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC8uL2xpYnMvc2hhcmVkL3NyYy9lbnRpdGllcy91c2VyLmVudGl0eS50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkLy4vbGlicy9zaGFyZWQvc3JjL2luZGV4LnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvbW9kdWxlcy9hamF4LXJlc3BvbmVzZS9hamF4UmVzcG9uZXMubW9kdWxlLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvbW9kdWxlcy9hamF4LXJlc3BvbmVzZS9hamF4UmVzcG9uc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkLy4vbGlicy9zaGFyZWQvc3JjL21vZHVsZXMvcmVkaXMtY2FjaGUvcmVkaXMtY2FjaGUubW9kdWxlLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvbW9kdWxlcy9yZWRpcy1jYWNoZS9yZWRpcy1jYWNoZS5zZXJ2aWNlLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvc2hhcmVkLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkLy4vbGlicy9zaGFyZWQvc3JjL3NoYXJlZC5zZXJ2aWNlLnRzIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9saWJzL3NoYXJlZC9zcmMvdHlwZXMvY3VzdG9tUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy9jb21tb25cIiIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy9jb25maWdcIiIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy9jb3JlXCIiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvand0XCIiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvbWljcm9zZXJ2aWNlc1wiIiwid2VicGFjazovL25lc3QtY2xvdWQvZXh0ZXJuYWwgY29tbW9uanMgXCJAbmVzdGpzL3Bhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvc3dhZ2dlclwiIiwid2VicGFjazovL25lc3QtY2xvdWQvZXh0ZXJuYWwgY29tbW9uanMgXCJAbmVzdGpzL3R5cGVvcm1cIiIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkL2V4dGVybmFsIGNvbW1vbmpzIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC9leHRlcm5hbCBjb21tb25qcyBcImRheWpzXCIiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC9leHRlcm5hbCBjb21tb25qcyBcImlvcmVkaXNcIiIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkL2V4dGVybmFsIGNvbW1vbmpzIFwicGFzc3BvcnQtand0XCIiLCJ3ZWJwYWNrOi8vbmVzdC1jbG91ZC9leHRlcm5hbCBjb21tb25qcyBcInR5cGVvcm1cIiIsIndlYnBhY2s6Ly9uZXN0LWNsb3VkL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25lc3QtY2xvdWQvLi9hcHBzL2NsaWVudC9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWdNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XHJcbmltcG9ydCB7IENsaWVudHNNb2R1bGUsIFRyYW5zcG9ydCB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgaXNHbG9iYWw6IHRydWUsXHJcbiAgICBlbnZGaWxlUGF0aDogJy5lbnYuZGV2ZWxvcG1lbnQnLFxyXG4gIH0pLFxyXG4gIENsaWVudHNNb2R1bGUucmVnaXN0ZXIoW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnVVNFUl9TRVJWSUNFJyxcclxuICAgICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuVENQLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgICAgICAgcG9ydDogMzAwMSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSksXHJcbl07XHJcbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgVXNlckNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL3VzZXIuY29udHJvbGxlcic7XHJcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvYXV0aC9hdXRoLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJ0BsaWJzL3NoYXJlZCc7XHJcbmltcG9ydCBib290c3RyYXBzIGZyb20gJy4vYm9vdHN0cmFwcyc7XHJcbmltcG9ydCB7IERlcGFydG1lbnRDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy9kZXBhcnRtZW50LmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBNZW51Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcnMvbWVudS5jb250cm9sbGVyJztcclxuaW1wb3J0IHsgUm9sZUNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL3JvbGUuY29udHJvbGxlcic7XHJcbmltcG9ydCB7IEFsbEV4Y2VwdGlvbnNGaWx0ZXIgfSBmcm9tICcuL2ZpbHRlcnMvaHR0cEV4Y2VwdGlvbi5maWx0ZXInO1xyXG5cclxuQE1vZHVsZSh7XHJcbiAgaW1wb3J0czogWy4uLmJvb3RzdHJhcHMsIFNoYXJlZE1vZHVsZSwgQXV0aE1vZHVsZV0sXHJcbiAgY29udHJvbGxlcnM6IFtcclxuICAgIFVzZXJDb250cm9sbGVyLFxyXG4gICAgRGVwYXJ0bWVudENvbnRyb2xsZXIsXHJcbiAgICBNZW51Q29udHJvbGxlcixcclxuICAgIFJvbGVDb250cm9sbGVyLFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6ICdBUFBfRklMVEVSJyxcclxuICAgICAgdXNlQ2xhc3M6IEFsbEV4Y2VwdGlvbnNGaWx0ZXIsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnQGNsaWVudC9ndWFyZHMvSnd0QXV0aC5ndWFyZCc7XHJcbmltcG9ydCB7IElkRHRvIH0gZnJvbSAnQGxpYnMvc2hhcmVkL2R0b3MvY29tbW9uLmR0byc7XHJcbmltcG9ydCB7XHJcbiAgQ3JlYXRlRGVwYXJ0bWVudER0byxcclxuICBRdWVyeURlcGFydG1lbnREdG8sXHJcbiAgUXVlcnlEZXBhcnRtZW50VHJlZUR0byxcclxuICBVcGRhdGVEZXBhcnRtZW50RHRvLFxyXG59IGZyb20gJ0BsaWJzL3NoYXJlZC9kdG9zL2RlcGFydG1lbnQuZHRvJztcclxuaW1wb3J0IHsgQ3VzdG9tUmVxdWVzdCB9IGZyb20gJ0BsaWJzL3NoYXJlZC90eXBlcy9jdXN0b21SZXF1ZXN0JztcclxuaW1wb3J0IHtcclxuICBCb2R5LFxyXG4gIENvbnRyb2xsZXIsXHJcbiAgRGVsZXRlLFxyXG4gIEdldCxcclxuICBJbmplY3QsXHJcbiAgUG9zdCxcclxuICBQdXQsXHJcbiAgUXVlcnksXHJcbiAgUmVxLFxyXG4gIFVzZUd1YXJkcyxcclxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IENsaWVudFByb3h5IH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcclxuaW1wb3J0IHsgQXBpT3BlcmF0aW9uLCBBcGlUYWdzIH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcclxuXHJcbkBDb250cm9sbGVyKCdkZXBhcnRtZW50JylcclxuQEFwaVRhZ3MoJ+mDqOmXqOeuoeeQhicpXHJcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxyXG5leHBvcnQgY2xhc3MgRGVwYXJ0bWVudENvbnRyb2xsZXIge1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ1VTRVJfU0VSVklDRScpIHByaXZhdGUgdXNlclNlcnZpY2U6IENsaWVudFByb3h5KSB7fVxyXG5cclxuICBAUG9zdCgnL2NyZWF0ZScpXHJcbiAgQEFwaU9wZXJhdGlvbih7IHN1bW1hcnk6ICfmlrDlop7pg6jpl6gnIH0pXHJcbiAgY3JlYXRlRGVwYXJ0bWVudChcclxuICAgIEBCb2R5KCkgY3JlYXRlRGVwYXJ0bWVudER0bzogQ3JlYXRlRGVwYXJ0bWVudER0byxcclxuICAgIEBSZXEoKSByZXE6IEN1c3RvbVJlcXVlc3QsXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5zZW5kKCdkZXBhcnRtZW50L2NyZWF0ZScsIHtcclxuICAgICAgY3JlYXRlRGVwYXJ0bWVudER0byxcclxuICAgICAgdXNlcjogcmVxLnVzZXIsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBEZWxldGUoJy9kZWxldGUnKVxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn5Yig6Zmk6YOo6ZeoJyB9KVxyXG4gIGRlbGV0ZURlcGFydG1lbnQoQFF1ZXJ5KCkgaWREdG86IElkRHRvLCBAUmVxKCkgcmVxOiBDdXN0b21SZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5zZW5kKCdkZXBhcnRtZW50L2RlbGV0ZScsIHtcclxuICAgICAgaWREdG8sXHJcbiAgICAgIHVzZXI6IHJlcS51c2VyLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBAUHV0KCcvdXBkYXRlJylcclxuICBAQXBpT3BlcmF0aW9uKHsgc3VtbWFyeTogJ+S/ruaUuemDqOmXqCcgfSlcclxuICB1cGRhdGVEZXBhcnRtZW50KFxyXG4gICAgQEJvZHkoKSB1cGRhdGVEZXBhcnRtZW50RHRvOiBVcGRhdGVEZXBhcnRtZW50RHRvLFxyXG4gICAgQFJlcSgpIHJlcTogQ3VzdG9tUmVxdWVzdCxcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ2RlcGFydG1lbnQvdXBkYXRlJywge1xyXG4gICAgICB1cGRhdGVEZXBhcnRtZW50RHRvLFxyXG4gICAgICB1c2VyOiByZXEudXNlcixcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQFBvc3QoJy9xdWVyeScpXHJcbiAgQEFwaU9wZXJhdGlvbih7IHN1bW1hcnk6ICfmn6Xor6Lpg6jpl6jliJfooagnIH0pXHJcbiAgZ2V0RGVwYXJ0bWVudExpc3QoQEJvZHkoKSBxdWVyeURlcGFydG1lbnREdG86IFF1ZXJ5RGVwYXJ0bWVudER0bykge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2Uuc2VuZCgnZGVwYXJ0bWVudC9xdWVyeScsIHF1ZXJ5RGVwYXJ0bWVudER0byk7XHJcbiAgfVxyXG5cclxuICAvKiog5p+l6K+i6YOo6Zeo5qCRICovXHJcbiAgQFBvc3QoJy9xdWVyeVRyZWUnKVxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn5p+l6K+i6YOo6Zeo5qCRJyB9KVxyXG4gIGdldERlcGFydG1lbnRUcmVlKEBCb2R5KCkgcXVlcnlEZXBhcnRtZW50VHJlZUR0bzogUXVlcnlEZXBhcnRtZW50VHJlZUR0bykge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2Uuc2VuZChcclxuICAgICAgJ2RlcGFydG1lbnQvcXVlcnlUcmVlJyxcclxuICAgICAgcXVlcnlEZXBhcnRtZW50VHJlZUR0byxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKiog5p+l6K+i6YOo6Zeo6K+m5oOFICovXHJcbiAgQEdldCgnL2luZm8nKVxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn5p+l6K+i6YOo6Zeo6K+m5oOFJyB9KVxyXG4gIGdldERlcGFydG1lbnRJbmZvKEBRdWVyeSgpIGlkRHRvOiBJZER0bykge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2Uuc2VuZCgnZGVwYXJ0bWVudC9pbmZvJywgaWREdG8pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEJvZHksXHJcbiAgQ29udHJvbGxlcixcclxuICBEZWxldGUsXHJcbiAgR2V0LFxyXG4gIEluamVjdCxcclxuICBQb3N0LFxyXG4gIFB1dCxcclxuICBRdWVyeSxcclxuICBSZXEsXHJcbiAgVXNlR3VhcmRzLFxyXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgQXBpT3BlcmF0aW9uLCBBcGlUYWdzIH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcclxuaW1wb3J0IHsgQ2xpZW50UHJveHkgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xyXG5pbXBvcnQgeyBDcmVhdGVNZW51RHRvLCBVcGRhdGVNZW51RHRvIH0gZnJvbSAnQGxpYnMvc2hhcmVkL2R0b3MvbWVudS5kdG8nO1xyXG5pbXBvcnQgeyBJZER0byB9IGZyb20gJ0BsaWJzL3NoYXJlZC9kdG9zL2NvbW1vbi5kdG8nO1xyXG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICdAY2xpZW50L2d1YXJkcy9Kd3RBdXRoLmd1YXJkJztcclxuaW1wb3J0IHsgQ3VzdG9tUmVxdWVzdCB9IGZyb20gJ0BsaWJzL3NoYXJlZC90eXBlcy9jdXN0b21SZXF1ZXN0JztcclxuXHJcbkBDb250cm9sbGVyKCdtZW51JylcclxuQEFwaVRhZ3MoJ+ezu+e7n+iPnOWNleeuoeeQhicpXHJcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxyXG5leHBvcnQgY2xhc3MgTWVudUNvbnRyb2xsZXIge1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ1VTRVJfU0VSVklDRScpIHByaXZhdGUgdXNlclNlcnZpY2U6IENsaWVudFByb3h5KSB7fVxyXG5cclxuICBAUG9zdCgnL2NyZWF0ZScpXHJcbiAgQEFwaU9wZXJhdGlvbih7IHN1bW1hcnk6ICfmlrDlop7oj5zljZUnIH0pXHJcbiAgY3JlYXRlTWVudShAQm9keSgpIGNyZWF0ZU1lbnVEdG86IENyZWF0ZU1lbnVEdG8sIEBSZXEoKSByZXE6IEN1c3RvbVJlcXVlc3QpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ21lbnUvY3JlYXRlJywge1xyXG4gICAgICBjcmVhdGVNZW51RHRvLFxyXG4gICAgICB1c2VyOiByZXEudXNlcixcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQERlbGV0ZSgnL2RlbGV0ZScpXHJcbiAgQEFwaU9wZXJhdGlvbih7IHN1bW1hcnk6ICfliKDpmaToj5zljZUnIH0pXHJcbiAgZGVsZXRlTWVudShAUXVlcnkoKSBpZER0bzogSWREdG8sIEBSZXEoKSByZXE6IEN1c3RvbVJlcXVlc3QpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ21lbnUvZGVsZXRlJywge1xyXG4gICAgICBpZER0byxcclxuICAgICAgdXNlcjogcmVxLnVzZXIsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBQdXQoJy91cGRhdGUnKVxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn5pu05paw6I+c5Y2VJyB9KVxyXG4gIHVwZGF0ZU1lbnUoQEJvZHkoKSB1cGRhdGVNZW51RHRvOiBVcGRhdGVNZW51RHRvLCBAUmVxKCkgcmVxOiBDdXN0b21SZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5zZW5kKCdtZW51L3VwZGF0ZScsIHtcclxuICAgICAgdXBkYXRlTWVudUR0byxcclxuICAgICAgdXNlcjogcmVxLnVzZXIsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBHZXQoJy9xdWVyeVRyZWUnKVxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn6I635Y+W6I+c5Y2V5YiX6KGoJyB9KVxyXG4gIGdldE1lbnVMaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2Uuc2VuZCgnbWVudS9xdWVyeVRyZWUnLCB7fSk7XHJcbiAgfVxyXG5cclxuICAvKiog6I635Y+W6I+c5Y2V6K+m5oOFICovXHJcbiAgQEdldCgnL2luZm8nKVxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn6I635Y+W6I+c5Y2V6K+m5oOFJyB9KVxyXG4gIGdldE1lbnVJbmZvKEBRdWVyeSgpIGlkRHRvOiBJZER0bykge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2Uuc2VuZCgnbWVudS9pbmZvJywgaWREdG8pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICdAY2xpZW50L2d1YXJkcy9Kd3RBdXRoLmd1YXJkJztcclxuaW1wb3J0IHsgSWREdG8gfSBmcm9tICdAbGlicy9zaGFyZWQvZHRvcy9jb21tb24uZHRvJztcclxuaW1wb3J0IHsgQ3JlYXRlTWVudUR0byB9IGZyb20gJ0BsaWJzL3NoYXJlZC9kdG9zL21lbnUuZHRvJztcclxuaW1wb3J0IHsgQ3JlYXRlUm9sZUR0bywgUXVlcnlSb2xlRHRvIH0gZnJvbSAnQGxpYnMvc2hhcmVkL2R0b3Mvcm9sZS5kdG8nO1xyXG5pbXBvcnQgeyBDdXN0b21SZXF1ZXN0IH0gZnJvbSAnQGxpYnMvc2hhcmVkL3R5cGVzL2N1c3RvbVJlcXVlc3QnO1xyXG5pbXBvcnQgeyBCb2R5LCBDb250cm9sbGVyLCBJbmplY3QsIFBvc3QsIFJlcSwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBDbGllbnRQcm94eSB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IEFwaU9wZXJhdGlvbiwgQXBpVGFncyB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XHJcblxyXG5AQXBpVGFncygn57O757uf6KeS6Imy566h55CGJylcclxuQENvbnRyb2xsZXIoJ3JvbGUnKVxyXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcclxuZXhwb3J0IGNsYXNzIFJvbGVDb250cm9sbGVyIHtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdVU0VSX1NFUlZJQ0UnKSBwcml2YXRlIHVzZXJTZXJ2aWNlOiBDbGllbnRQcm94eSkge31cclxuXHJcbiAgQEFwaU9wZXJhdGlvbih7IHN1bW1hcnk6ICfmlrDlop7op5LoibInIH0pXHJcbiAgQFBvc3QoJy9jcmVhdGUnKVxyXG4gIGNyZWF0ZVJvbGUoQEJvZHkoKSBjcmVhdGVSb2xlUmVxOiBDcmVhdGVSb2xlRHRvLCBAUmVxKCkgcmVxOiBDdXN0b21SZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5zZW5kKCdyb2xlL2NyZWF0ZScsIHtcclxuICAgICAgY3JlYXRlUm9sZVJlcSxcclxuICAgICAgdXNlcjogcmVxLnVzZXIsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn6I635Y+W6KeS6Imy5YiX6KGoJyB9KVxyXG4gIEBQb3N0KCcvbGlzdCcpXHJcbiAgZ2V0Um9sZUxpc3QoQEJvZHkoKSBjcmVhdGVSb2xlUmVxOiBRdWVyeVJvbGVEdG8pIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ3JvbGUvbGlzdCcsIGNyZWF0ZVJvbGVSZXEpO1xyXG4gIH1cclxuXHJcbiAgQEFwaU9wZXJhdGlvbih7IHN1bW1hcnk6ICfliKDpmaTop5LoibInIH0pXHJcbiAgQFBvc3QoJy9kZWxldGUnKVxyXG4gIGRlbGV0ZVJvbGUoQEJvZHkoKSByb2xlSWQ6IElkRHRvKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5zZW5kKCdyb2xlL2RlbGV0ZScsIHJvbGVJZCk7XHJcbiAgfVxyXG5cclxuICBAQXBpT3BlcmF0aW9uKHsgc3VtbWFyeTogJ+abtOaWsOinkuiJsicgfSlcclxuICBAUG9zdCgnL3VwZGF0ZScpXHJcbiAgdXBkYXRlUm9sZShAQm9keSgpIGNyZWF0ZU1lbnVEdG86IENyZWF0ZU1lbnVEdG8sIEBSZXEoKSByZXE6IEN1c3RvbVJlcXVlc3QpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ3JvbGUvdXBkYXRlJywge1xyXG4gICAgICBjcmVhdGVNZW51RHRvLFxyXG4gICAgICB1c2VyOiByZXEudXNlcixcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJZHNEdG8sIElkRHRvIH0gZnJvbSAnQGxpYnMvc2hhcmVkL2R0b3MvY29tbW9uLmR0byc7XHJcbmltcG9ydCB7XHJcbiAgQmluZFJvbGVEdG8sXHJcbiAgTG9naW5EdG8sXHJcbiAgUXVlcnlVc2VyTGlzdFJlcSxcclxuICBSZWdpc3RlckR0byxcclxuICBVcGRhdGVVc2VyRHRvLFxyXG59IGZyb20gJ0BsaWJzL3NoYXJlZC9kdG9zL3VzZXIuZHRvJztcclxuaW1wb3J0IHsgQ3VzdG9tUmVxdWVzdCB9IGZyb20gJ0BsaWJzL3NoYXJlZC90eXBlcy9jdXN0b21SZXF1ZXN0JztcclxuaW1wb3J0IHtcclxuICBCb2R5LFxyXG4gIENvbnRyb2xsZXIsXHJcbiAgRGVsZXRlLFxyXG4gIEdldCxcclxuICBJbmplY3QsXHJcbiAgUG9zdCxcclxuICBQdXQsXHJcbiAgUXVlcnksXHJcbiAgUmVxLFxyXG4gIFVzZUd1YXJkcyxcclxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IENsaWVudFByb3h5LCBNZXNzYWdlUGF0dGVybiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IEFwaU9wZXJhdGlvbiwgQXBpVGFncyB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XHJcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9Kd3RBdXRoLmd1YXJkJztcclxuXHJcbkBDb250cm9sbGVyKCd1c2VyJylcclxuQEFwaVRhZ3MoJ+eUqOaIt+euoeeQhicpXHJcbi8vIEBVc2VHdWFyZHMoUm9sZXNHdWFyZClcclxuZXhwb3J0IGNsYXNzIFVzZXJDb250cm9sbGVyIHtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdVU0VSX1NFUlZJQ0UnKSBwcml2YXRlIHVzZXJTZXJ2aWNlOiBDbGllbnRQcm94eSkge31cclxuXHJcbiAgQFBvc3QoJy9yZWdpc3RlcicpXHJcbiAgQEFwaU9wZXJhdGlvbih7IHN1bW1hcnk6ICfms6jlhownIH0pXHJcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXHJcbiAgcmVnaXN0ZXIoQEJvZHkoKSByZWdpc3RlckR0bzogUmVnaXN0ZXJEdG8sIEBSZXEoKSByZXE6IEN1c3RvbVJlcXVlc3QpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ3VzZXIvcmVnaXN0ZXInLCB7IHJlZ2lzdGVyRHRvLCByZXEgfSk7XHJcbiAgfVxyXG5cclxuICBAR2V0KCdnZXRDYXB0Y2hhJylcclxuICBAQXBpT3BlcmF0aW9uKHsgc3VtbWFyeTogJ+iOt+WPlumqjOivgeeggScgfSlcclxuICBATWVzc2FnZVBhdHRlcm4oJ3VzZXIvZ2V0Q2FwdGNoYScpXHJcbiAgZ2V0Q2FwdGNoYSgpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ3VzZXIvZ2V0Q2FwdGNoYScsIHt9KTtcclxuICB9XHJcblxyXG4gIEBQb3N0KCcvbG9naW4nKVxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn55m75b2VJyB9KVxyXG4gIGxvZ2luKEBCb2R5KCkgbG9naW5EdG86IExvZ2luRHRvKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5zZW5kKCd1c2VyL2xvZ2luJywgbG9naW5EdG8pO1xyXG4gIH1cclxuXHJcbiAgQEFwaU9wZXJhdGlvbih7IHN1bW1hcnk6ICfojrflj5bnlKjmiLfliJfooagnIH0pXHJcbiAgQFBvc3QoJ2xpc3QnKVxyXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxyXG4gIEBNZXNzYWdlUGF0dGVybigndXNlci9saXN0JylcclxuICBnZXRVc2VyTGlzdChAQm9keSgpIHBhcmFtczogUXVlcnlVc2VyTGlzdFJlcSkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2Uuc2VuZCgndXNlci9saXN0JywgcGFyYW1zKTtcclxuICB9XHJcblxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn6I635Y+W55So5oi35L+h5oGvJyB9KVxyXG4gIEBHZXQoJ2luZm8nKVxyXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxyXG4gIGdldFVzZXJJbmZvKEBRdWVyeSgpIHJlcTogSWREdG8pIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ3VzZXIvaW5mbycsIHJlcSk7XHJcbiAgfVxyXG5cclxuICBAQXBpT3BlcmF0aW9uKHsgc3VtbWFyeTogJ+abtOaWsOeUqOaItycgfSlcclxuICBAUHV0KCd1cGRhdGUnKVxyXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxyXG4gIHVwZGF0ZVVzZXIoQEJvZHkoKSB1cGRhdGVVc2VyRHRvOiBVcGRhdGVVc2VyRHRvLCBAUmVxKCkgcmVxOiBDdXN0b21SZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5zZW5kKCd1c2VyL3VwZGF0ZScsIHtcclxuICAgICAgdXBkYXRlVXNlckR0byxcclxuICAgICAgdXNlcjogcmVxLnVzZXIsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn5Yig6Zmk55So5oi3JyB9KVxyXG4gIEBEZWxldGUoJ2RlbGV0ZScpXHJcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXHJcbiAgZGVsZXRlVXNlcihAQm9keSgpIGlkc0R0bzogSWRzRHRvLCBAUmVxKCkgcmVxOiBDdXN0b21SZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5zZW5kKCd1c2VyL2RlbGV0ZScsIHsgaWRzRHRvLCB1c2VyOiByZXEudXNlciB9KTtcclxuICB9XHJcblxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn57uR5a6a6KeS6ImyJyB9KVxyXG4gIEBQb3N0KCdiaW5kUm9sZScpXHJcbiAgQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXHJcbiAgQE1lc3NhZ2VQYXR0ZXJuKCd1c2VyL2JpbmRSb2xlJylcclxuICBiaW5kUm9sZShAQm9keSgpIGJpbmRSb2xlRHRvOiBCaW5kUm9sZUR0bykge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2Uuc2VuZCgndXNlci9iaW5kUm9sZScsIGJpbmRSb2xlRHRvKTtcclxuICB9XHJcblxyXG4gIEBBcGlPcGVyYXRpb24oeyBzdW1tYXJ5OiAn6I635Y+W55So5oi35bey57uR5a6a6KeS6ImyJyB9KVxyXG4gIEBHZXQoJ2dldEJpbmRSb2xlJylcclxuICBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcclxuICBnZXRCaW5kUm9sZShAUXVlcnkoKSBpZER0bzogSWREdG8pIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnNlbmQoJ3VzZXIvZ2V0QmluZFJvbGUnLCBpZER0byk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XG4gIEV4Y2VwdGlvbkZpbHRlcixcbiAgQ2F0Y2gsXG4gIEFyZ3VtZW50c0hvc3QsXG4gIEh0dHBFeGNlcHRpb24sXG4gIEh0dHBTdGF0dXMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEh0dHBBZGFwdGVySG9zdCB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgZGF5anMgZnJvbSAnZGF5anMnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDlhajlsYBIdHRw5byC5bi46L+H5ruk5ZmoXG4gKi9cbkBDYXRjaCgpXG5leHBvcnQgY2xhc3MgQWxsRXhjZXB0aW9uc0ZpbHRlciBpbXBsZW1lbnRzIEV4Y2VwdGlvbkZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaHR0cEFkYXB0ZXJIb3N0OiBIdHRwQWRhcHRlckhvc3QpIHt9XG5cbiAgY2F0Y2goZXhjZXB0aW9uOiBhbnksIGhvc3Q6IEFyZ3VtZW50c0hvc3QpIHtcbiAgICBjb25zdCB7IGh0dHBBZGFwdGVyIH0gPSB0aGlzLmh0dHBBZGFwdGVySG9zdDtcbiAgICBjb25zdCBjdHggPSBob3N0LnN3aXRjaFRvSHR0cCgpO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjdHguZ2V0UmVxdWVzdDxSZXF1ZXN0PigpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gY3R4LmdldFJlc3BvbnNlPFJlc3BvbnNlPigpO1xuICAgIGNvbnN0IHN0YXR1c0NvZGUgPVxuICAgICAgZXhjZXB0aW9uIGluc3RhbmNlb2YgSHR0cEV4Y2VwdGlvblxuICAgICAgICA/IGV4Y2VwdGlvbi5nZXRTdGF0dXMoKVxuICAgICAgICA6IEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICAgIGNvbnN0IHJlc0NvbnRlbnRzID0ge1xuICAgICAgc3RhdHVzOiBzdGF0dXNDb2RlLFxuICAgICAgY2F1c2U6IGV4Y2VwdGlvbj8uY2F1c2UsXG4gICAgICBlcnJOYW1lOiBleGNlcHRpb24/Lm5hbWUsXG4gICAgICBtZXNzYWdlOiBleGNlcHRpb24/Lm1lc3NhZ2UsXG4gICAgICB0aW1lOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxuICAgICAgcGF0aDogaHR0cEFkYXB0ZXIuZ2V0UmVxdWVzdFVybChyZXF1ZXN0KSxcbiAgICB9O1xuXG4gICAgLy8g5L2/55So5LiN54m55a6a5LqO5bmz5Y+w77yIZXhwcmVzcyDmiJYgZmFzdGlmee+8ieeahOaWueW8j++8iGh0dHBBZGFwdGVy77yJ6L+U5Zue5ZON5bqU5YaF5a65XG4gICAgaHR0cEFkYXB0ZXIucmVwbHkocmVzcG9uc2UsIHJlc0NvbnRlbnRzLCBzdGF0dXNDb2RlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0QXV0aEd1YXJkIGV4dGVuZHMgQXV0aEd1YXJkKCdqd3QnKSB7fVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcignY2xpZW50L2F1dGgnKVxuZXhwb3J0IGNsYXNzIEF1dGhDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHt9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBdXRoQ29udHJvbGxlciB9IGZyb20gJy4vYXV0aC5jb250cm9sbGVyJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnd0TW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgUmVkaXNDYWNoZU1vZHVsZSB9IGZyb20gJ0BsaWJzL3NoYXJlZC9tb2R1bGVzL3JlZGlzLWNhY2hlL3JlZGlzLWNhY2hlLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSnd0TW9kdWxlLnJlZ2lzdGVyQXN5bmMoe1xuICAgICAgaW1wb3J0czogW0NvbmZpZ01vZHVsZV0sXG4gICAgICB1c2VGYWN0b3J5OiBhc3luYyAoY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkgPT4ge1xuICAgICAgICBjb25zdCBzZWNyZXQgPSBjb25maWdTZXJ2aWNlLmdldCgnSldUX1NFQ1JFVF9LRVknKTtcbiAgICAgICAgY29uc3QgZXhwaXJhdGlvbiA9IGNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfRVhQSVJBVElPTl9USU1FJykgKyAncyc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2VjcmV0OiBzZWNyZXQsIC8vand05a+G6ZKlXG4gICAgICAgICAgc2lnbk9wdGlvbnM6IHsgZXhwaXJlc0luOiBleHBpcmF0aW9uIH0sXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaW5qZWN0OiBbQ29uZmlnU2VydmljZV0sXG4gICAgfSksXG4gICAgUmVkaXNDYWNoZU1vZHVsZSxcbiAgXSxcbiAgY29udHJvbGxlcnM6IFtBdXRoQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW0F1dGhTZXJ2aWNlXSxcbiAgZXhwb3J0czogW0F1dGhTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7fVxuIiwiLy8gaW1wb3J0IHsgRXJyb3JFbnVtIH0gZnJvbSAnQC9jb25zdGFudHMvaHR0cE1lc3NhZ2UnO1xuXG5pbXBvcnQgeyBSZWRpc0NhY2hlU2VydmljZSB9IGZyb20gJ0BsaWJzL3NoYXJlZC9tb2R1bGVzL3JlZGlzLWNhY2hlL3JlZGlzLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgVW5hdXRob3JpemVkRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IEp3dFNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBQYXNzcG9ydFN0cmF0ZWd5IH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBFeHRyYWN0Snd0LCBTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWp3dCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSBleHRlbmRzIFBhc3Nwb3J0U3RyYXRlZ3koU3RyYXRlZ3kpIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqd3Q6IEp3dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVkaXNDYWNoZVNlcnZpY2U6IFJlZGlzQ2FjaGVTZXJ2aWNlLFxuICApIHtcbiAgICBjb25zdCBzZWNyZXQgPSBjb25maWdTZXJ2aWNlLmdldDxzdHJpbmc+KCdKV1RfU0VDUkVUX0tFWScpO1xuICAgIHN1cGVyKHtcbiAgICAgIGp3dEZyb21SZXF1ZXN0OiBFeHRyYWN0Snd0LmZyb21BdXRoSGVhZGVyQXNCZWFyZXJUb2tlbigpLCAvL+agoemqjOmAu+i+kXRva2VuIOW3suWwgeijhVxuICAgICAgaWdub3JlRXhwaXJhdGlvbjogZmFsc2UsXG4gICAgICBzZWNyZXRPcktleTogc2VjcmV0LFxuICAgICAgLy8gdmFsaWRhdGXlh73mlbDnrKzkuIDkuKrlj4LmlbDov5Tlm55yZXHor7fmsYLlr7nosaFcbiAgICAgIHBhc3NSZXFUb0NhbGxiYWNrOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOeUn+aIkHRva2VuXG4gICAqL1xuICBnZXRUb2tlbihwYXlsb2FkOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmp3dC5zaWduKHBheWxvYWQpO1xuICB9XG5cbiAgLyoqIEBkZXMg6aqM6K+BdG9rZW4gKi9cbiAgYXN5bmMgdmFsaWRhdGUocmVxLCBwYXlsb2FkKSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcGF5bG9hZDtcbiAgICAvLyDkvKDlhaXnmoR0b2tlblxuICAgIGNvbnN0IHRva2VuID0gRXh0cmFjdEp3dC5mcm9tQXV0aEhlYWRlckFzQmVhcmVyVG9rZW4oKShyZXEpO1xuICAgIC8v5LuOcmVkaXPkuK3lj5blr7nlupTnmoR0b2tlblxuICAgIGNvbnN0IGNhY2hlVG9rZW4gPSBhd2FpdCB0aGlzLnJlZGlzQ2FjaGVTZXJ2aWNlLmdldChpZCk7IC8v5Y+W5LiN5Ye65p2l77yM6K+05piO5bey6L+H5pyfXG4gICAgLy8xLnJlZGlz5Lit5rKh5pyJdG9rZW5cbiAgICBpZiAoIWNhY2hlVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ3Rva2Vu5bey6L+H5pyfJyk7XG4gICAgfVxuICAgIC8vMi50b2tlbuS4jeWQjOeahOivne+8jOWImeWcqOWFtuS7luWcsOaWueeZu+W9lVxuICAgIGlmICh0b2tlbiAhPSBjYWNoZVRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCfor6XotKblj7flt7LlnKjlhbbku5blnLDmlrnnmbvlvZUnKTtcbiAgICB9XG4gICAgLy8gdG9rZW7nu63kvKAs6YCa6L+H6YeN572ucmVkaXPov4fmnJ/ml7bpl7RcbiAgICB0aGlzLnJlZGlzQ2FjaGVTZXJ2aWNlLnNldChcbiAgICAgIGlkLFxuICAgICAgdG9rZW4sXG4gICAgICB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCdKV1RfRVhQSVJBVElPTl9USU1FJyksXG4gICAgKTtcbiAgICAvLyB0b2tlblxuICAgIHJldHVybiB7IGlkOiBwYXlsb2FkLmlkLCB1c2VybmFtZTogcGF5bG9hZC51c2VybmFtZSB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb25maWdNb2R1bGUsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XHJcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xyXG5pbXBvcnQgZW50aXRpZXMgZnJvbSAnLi4vZW50aXRpZXMnO1xyXG5cclxuLyoqIOaVsOaNruW6k+mFjee9riAqL1xyXG5jb25zdCBpbml0REJDb25maWcgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIFR5cGVPcm1Nb2R1bGUuZm9yUm9vdEFzeW5jKHtcclxuICAgIGltcG9ydHM6IFtDb25maWdNb2R1bGVdLFxyXG4gICAgdXNlRmFjdG9yeTogYXN5bmMgKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpID0+IHtcclxuICAgICAgY29uc3QgaG9zdCA9IGNvbmZpZ1NlcnZpY2UuZ2V0KCdNWVNRTF9IT1NUJyk7XHJcbiAgICAgIGNvbnN0IHBvcnQgPSBjb25maWdTZXJ2aWNlLmdldCgnTVlTUUxfUE9SVCcpO1xyXG4gICAgICBjb25zdCB1c2VybmFtZSA9IGNvbmZpZ1NlcnZpY2UuZ2V0KCdNWVNRTF9VU0VSJyk7XHJcbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gY29uZmlnU2VydmljZS5nZXQoJ01ZU1FMX1BBU1NXT1JEJyk7XHJcbiAgICAgIGNvbnN0IGRhdGFiYXNlID0gY29uZmlnU2VydmljZS5nZXQoJ01ZU1FMX0RBVEFCQVNFJyk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogJ215c3FsJyxcclxuICAgICAgICBob3N0OiBob3N0LFxyXG4gICAgICAgIHBvcnQ6IHBvcnQsXHJcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcclxuICAgICAgICBkYXRhYmFzZTogZGF0YWJhc2UsXHJcbiAgICAgICAgZW50aXRpZXM6IGVudGl0aWVzLFxyXG4gICAgICAgIC8vIOS7heWcqOW8gOWPkeS4reS9v+eUqO+8jOeUn+S6p+eOr+Wig+ivt+iuvue9ruS4uiBmYWxzZVxyXG4gICAgICAgIHN5bmNocm9uaXplOiB0cnVlLFxyXG4gICAgICAgIGRhdGVTdHJpbmdzOiB0cnVlLFxyXG4gICAgICAgIGxvZ2dpbmc6IHRydWUsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaW5qZWN0OiBbQ29uZmlnU2VydmljZV0sXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyDkvb/nlKjlh73mlbDmnaXlr7zlh7rvvIzlm6DkuLogQ29uZmlnTW9kdWxlIOS4reacieS4gOS4qmxvYWTmlrnms5XvvIzpnIDopoHlr7zlhaXkuIDkuKrlh73mlbBcclxuZXhwb3J0IGRlZmF1bHQgW1xyXG4gIENvbmZpZ01vZHVsZS5mb3JSb290KHtcclxuICAgIGlzR2xvYmFsOiB0cnVlLFxyXG4gICAgZW52RmlsZVBhdGg6ICcuZW52LmRldmVsb3BtZW50JyxcclxuICB9KSxcclxuICBpbml0REJDb25maWcoKSxcclxuXTtcclxuIiwiZXhwb3J0IGVudW0gSHR0cE1lc3NhZ2VFbnVtIHtcbiAgU1VDQ0VTUyA9ICfor7fmsYLmiJDlip8nLFxuICBCQURfUkVRVUVTVCA9ICflj4LmlbDplJnor68nLFxuICBVTkFVVEhPUklaRUQgPSAndG9rZW7lpLHmlYgnLFxuICBGT1JCSURERU4gPSAn5peg5p2D6ZmQ6K6/6ZeuJyxcbiAgTk9UX0ZPVU5EID0gJ+i1hOa6kOacquaJvuWIsCcsXG4gIElOVEVSTkFMX1NFUlZFUl9FUlJPUiA9ICfmnI3liqHlmajplJnor68nLFxufVxuIiwiaW1wb3J0IHsgQXBpUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xyXG5pbXBvcnQgeyBJc0ludCwgSXNOb3RFbXB0eSwgSXNPcHRpb25hbCwgSXNQb3NpdGl2ZSB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkR0byB7XHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc0ludCgpXHJcbiAgQElzUG9zaXRpdmUoKVxyXG4gIHBhZ2VOdW0/OiBudW1iZXIgPSAxOyAvLyDpu5jorqTnrKzkuIDpobVcclxuXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc0ludCgpXHJcbiAgQElzUG9zaXRpdmUoKVxyXG4gIHBhZ2VTaXplPzogbnVtYmVyID0gMTA7IC8vIOm7mOiupOavj+mhtTEw5p2h6K6w5b2VXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJZHNEdG8ge1xyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn5Yig6ZmkaWTmlbDnu4QnIH0pXHJcbiAgaWRzOiBzdHJpbmcgfCBudW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElkRHRvIHtcclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ0lEJyB9KVxyXG4gIEBJc05vdEVtcHR5KHsgbWVzc2FnZTogJ2lk5LiN6IO95Li656m6JyB9KVxyXG4gIGlkOiBudW1iZXI7XHJcbn1cclxuIiwiaW1wb3J0IHsgUGFnaW5hdGlvbkR0byB9IGZyb20gJy4vY29tbW9uLmR0byc7XHJcbmltcG9ydCB7IEFwaVByb3BlcnR5IH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcclxuaW1wb3J0IHsgSXNOb3RFbXB0eSB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XHJcblxyXG4vKiog5paw5aKe6YOo6ZeoRFRPICovXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVEZXBhcnRtZW50RHRvIHtcclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+mDqOmXqOWQjeensCcgfSlcclxuICBASXNOb3RFbXB0eSh7IG1lc3NhZ2U6ICfpg6jpl6jlkI3np7DkuI3og73kuLrnqbonIH0pXHJcbiAgbmFtZTogc3RyaW5nO1xyXG5cclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+mDqOmXqOe8luWPtycgfSlcclxuICBASXNOb3RFbXB0eSh7IG1lc3NhZ2U6ICfpg6jpl6jnvJblj7fkuI3og73kuLrnqbonIH0pXHJcbiAgY29kZTogc3RyaW5nO1xyXG5cclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+mDqOmXqOaPj+i/sCcgfSlcclxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcclxuXHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICfniLbnuqfpg6jpl6hJRCcgfSlcclxuICBwYXJlbnRJZD86IG51bWJlcjtcclxuXHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICfmjpLluo8nIH0pXHJcbiAgQElzTm90RW1wdHkoeyBtZXNzYWdlOiAn5o6S5bqP5LiN6IO95Li656m6JyB9KVxyXG4gIHNvcnQ6IG51bWJlcjtcclxuXHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICfnirbmgIEgMTrlkK/nlKggMDrnpoHnlKgnIH0pXHJcbiAgc3RhdHVzOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKiDmlrDlop7pg6jpl6hEVE8gKi9cclxuZXhwb3J0IGNsYXNzIFVwZGF0ZURlcGFydG1lbnREdG8gZXh0ZW5kcyBDcmVhdGVEZXBhcnRtZW50RHRvIHtcclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+mDqOmXqElEJyB9KVxyXG4gIEBJc05vdEVtcHR5KHsgbWVzc2FnZTogJ+mDqOmXqElE5LiN6IO95Li656m6JyB9KVxyXG4gIGlkOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKiDmn6Xor6Lpg6jpl6jliJfooahEVE8gKi9cclxuZXhwb3J0IGNsYXNzIFF1ZXJ5RGVwYXJ0bWVudER0byBleHRlbmRzIFBhZ2luYXRpb25EdG8ge1xyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6YOo6Zeo5ZCN56ewJyB9KVxyXG4gIG5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6YOo6Zeo57yW5Y+3JyB9KVxyXG4gIGNvZGU/OiBzdHJpbmc7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn54q25oCBIDE65ZCv55SoIDA656aB55SoJyB9KVxyXG4gIHN0YXR1cz86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXJ5RGVwYXJ0bWVudFRyZWVEdG8ge1xyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6YOo6Zeo5ZCN56ewJyB9KVxyXG4gIG5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6YOo6Zeo57yW5Y+3JyB9KVxyXG4gIGNvZGU/OiBzdHJpbmc7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn54q25oCBIDE65ZCv55SoIDA656aB55SoJyB9KVxyXG4gIHN0YXR1cz86IG51bWJlcjtcclxufVxyXG4iLCJpbXBvcnQgeyBBcGlQcm9wZXJ0eSB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XHJcbmltcG9ydCB7IElzTm90RW1wdHksIElzTnVtYmVyIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVNZW51RHRvIHtcclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+iPnOWNleexu+WeiyAxOuebruW9lSAyOuiPnOWNlSAzOuaMiemSricgfSlcclxuICBASXNOdW1iZXIoKVxyXG4gIEBJc05vdEVtcHR5KHsgbWVzc2FnZTogJ+iPnOWNleexu+Wei+S4jeiDveS4uuepuicgfSlcclxuICB0eXBlOiBudW1iZXI7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn54i257qnaWQnIH0pXHJcbiAgcGFyZW50SWQ/OiBudW1iZXI7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6I+c5Y2V5ZCN56ewJyB9KVxyXG4gIEBJc05vdEVtcHR5KHsgbWVzc2FnZTogJ+iPnOWNleWQjeensOS4jeiDveS4uuepuicgfSlcclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6I+c5Y2V6Lev5b6EJyB9KVxyXG4gIHJvdXRlPzogc3RyaW5nO1xyXG5cclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+e7hOS7tui3r+W+hCcgfSlcclxuICBjb21wb25lbnRQYXRoPzogc3RyaW5nO1xyXG5cclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+aOkuW6jycgfSlcclxuICBzb3J0PzogbnVtYmVyO1xyXG5cclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+eKtuaAgSAwOuemgeeUqCAxOuWQr+eUqCcgfSlcclxuICBzdGF0dXM/OiBudW1iZXI7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn5Zu+5qCHJyB9KVxyXG4gIGljb24/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVcGRhdGVNZW51RHRvIGV4dGVuZHMgQ3JlYXRlTWVudUR0byB7XHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICfoj5zljZVpZCcgfSlcclxuICBpZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlcnlNZW51SW5mb0R0byB7XHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICfoj5zljZVpZCcgfSlcclxuICBpZDogbnVtYmVyO1xyXG59XHJcbiIsImltcG9ydCB7IFBhZ2luYXRpb25EdG8gfSBmcm9tICcuL2NvbW1vbi5kdG8nO1xyXG5pbXBvcnQgeyBBcGlQcm9wZXJ0eSB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XHJcbmltcG9ydCB7IElzU3RyaW5nIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVSb2xlRHRvIGV4dGVuZHMgUGFnaW5hdGlvbkR0byB7XHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICfop5LoibLlkI0nIH0pXHJcbiAgQElzU3RyaW5nKHsgbWVzc2FnZTogJ+inkuiJsuWQjeS4jeiDveS4uuepuicgfSlcclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6KeS6Imy57yW56CBJyB9KVxyXG4gIEBJc1N0cmluZyh7IG1lc3NhZ2U6ICfop5LoibLnvJbnoIHkuI3og73kuLrnqbonIH0pXHJcbiAgY29kZTogc3RyaW5nO1xyXG5cclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+aOkuW6jycgfSlcclxuICBzb3J0PzogbnVtYmVyO1xyXG5cclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+inkuiJsuaPj+i/sCcgfSlcclxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXJ5Um9sZUR0byBleHRlbmRzIFBhZ2luYXRpb25EdG8ge1xyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6KeS6Imy5ZCNJyB9KVxyXG4gIG5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6KeS6Imy57yW56CBJyB9KVxyXG4gIGNvZGU/OiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgUGFnaW5hdGlvbkR0byB9IGZyb20gJy4vY29tbW9uLmR0byc7XHJcbmltcG9ydCB7IEFwaVByb3BlcnR5IH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcclxuaW1wb3J0IHsgSXNOb3RFbXB0eSwgSXNTdHJpbmcgfSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyRHRvIHtcclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+eUqOaIt+WQjScgfSlcclxuICBASXNOb3RFbXB0eSh7IG1lc3NhZ2U6ICfnlKjmiLflkI3kuI3og73kuLrnqbonIH0pXHJcbiAgdXNlcm5hbWU6IHN0cmluZztcclxuXHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICflr4bnoIEnIH0pXHJcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6YOo6ZeoaWQnIH0pXHJcbiAgZGVwYXJ0bWVudElkOiBudW1iZXI7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6KeS6ImyaWTvvIjlpJrkuKrvvIknIH0pXHJcbiAgcm9sZUlkczogbnVtYmVyW107XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn5omL5py65Y+3JyB9KVxyXG4gIG1vYmlsZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5EdG8ge1xyXG4gIEBJc1N0cmluZyh7IG1lc3NhZ2U6ICfnlKjmiLflkI3kuI3og73kuLrnqbonIH0pXHJcbiAgdXNlcm5hbWU6IHN0cmluZztcclxuXHJcbiAgQElzU3RyaW5nKClcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG5cclxuICBASXNTdHJpbmcoKVxyXG4gIGNhcHRjaGE6IHN0cmluZztcclxuXHJcbiAgLy8gQElzUGhvbmVOdW1iZXIoKVxyXG4gIG1vYmlsZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlcnlVc2VyTGlzdFJlcSBleHRlbmRzIFBhZ2luYXRpb25EdG8ge1xyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn55So5oi35ZCNJyB9KVxyXG4gIHVzZXJuYW1lPzogc3RyaW5nO1xyXG5cclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+eKtuaAgSAxOuWQr+eUqCAwOuemgeeUqCcgfSlcclxuICBzdGF0dXM/OiBudW1iZXI7XHJcblxyXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAn6YOo6ZeoSUQnIH0pXHJcbiAgZGVwYXJ0bWVudElkPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXBkYXRlVXNlckR0byBleHRlbmRzIFJlZ2lzdGVyRHRvIHtcclxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ+eUqOaIt0lEJyB9KVxyXG4gIGlkOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCaW5kUm9sZUR0byB7XHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICflpJrkuKrop5LoibJJRCcgfSlcclxuICByb2xlSWRzOiBudW1iZXJbXTtcclxuXHJcbiAgQEFwaVByb3BlcnR5KHsgZGVzY3JpcHRpb246ICfnlKjmiLdJRCcgfSlcclxuICB1c2VySWQ6IG51bWJlcjtcclxufVxyXG4iLCJpbXBvcnQgeyBDb2x1bW4sIENyZWF0ZURhdGVDb2x1bW4sIFVwZGF0ZURhdGVDb2x1bW4gfSBmcm9tICd0eXBlb3JtJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRW50aXR5IHtcclxuICAvLyDoh6rliqjnlJ/miJDliJvlu7rml6XmnJ9cclxuICBAQ3JlYXRlRGF0ZUNvbHVtbih7XHJcbiAgICBuYW1lOiAnY3JlYXRlZF9hdCcsXHJcbiAgICB0eXBlOiAndGltZXN0YW1wJyxcclxuICAgIGNvbW1lbnQ6ICfliJvlu7rml7bpl7QnLFxyXG4gIH0pXHJcbiAgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuICAvLyDliJvlu7rkurpcclxuICBAQ29sdW1uKHtcclxuICAgIG5hbWU6ICdjcmVhdGVkX2J5JyxcclxuICAgIG51bGxhYmxlOiB0cnVlLFxyXG4gICAgY29tbWVudDogJ+WIm+W7uuS6uicsXHJcbiAgfSlcclxuICBjcmVhdGVkQnk/OiBzdHJpbmc7XHJcblxyXG4gIC8vIOiHquWKqOeUn+aIkOabtOaWsOaXtumXtFxyXG4gIEBVcGRhdGVEYXRlQ29sdW1uKHtcclxuICAgIHR5cGU6ICd0aW1lc3RhbXAnLFxyXG4gICAgbmFtZTogJ3VwZGF0ZWRfYXQnLFxyXG4gICAgY29tbWVudDogJ+abtOaWsOaXtumXtCcsXHJcbiAgfSlcclxuICB1cGRhdGVkQXQ6IERhdGU7XHJcblxyXG4gIC8vIOabtOaWsOS6ulxyXG4gIEBDb2x1bW4oe1xyXG4gICAgbmFtZTogJ3VwZGF0ZWRfYnknLFxyXG4gICAgbnVsbGFibGU6IHRydWUsXHJcbiAgICBjb21tZW50OiAn5pu05paw5Lq6JyxcclxuICB9KVxyXG4gIHVwZGF0ZWRCeT86IHN0cmluZztcclxuXHJcbiAgLy8g6L2v5Yig6ZmkXHJcbiAgQENvbHVtbih7XHJcbiAgICBuYW1lOiAnaXNfZGVsZXRlZCcsXHJcbiAgICBkZWZhdWx0OiAwLFxyXG4gICAgY29tbWVudDogJ+i9r+WIoOmZpCAx5Yig6ZmkIDDmnKrliKDpmaQnLFxyXG4gICAgc2VsZWN0OiBmYWxzZSxcclxuICB9KVxyXG4gIGlzRGVsZXRlZDogbnVtYmVyO1xyXG59XHJcbiIsImltcG9ydCB7XG4gIENvbHVtbixcbiAgRW50aXR5LFxuICBPbmVUb01hbnksXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG4gIFRyZWVDaGlsZHJlbixcbiAgVHJlZVBhcmVudCxcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBCYXNlRW50aXR5IH0gZnJvbSAnLi9jb21tb24uZW50aXR5JztcbmltcG9ydCB7IFVzZXJFbnRpdHkgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcblxuQEVudGl0eSgnc3lzX2RlcGFydG1lbnQnKVxuZXhwb3J0IGNsYXNzIERlcGFydG1lbnRFbnRpdHkgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfpg6jpl6hpZCcsXG4gIH0pXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+mDqOmXqOWQjeensCcsXG4gICAgdHlwZTogJ3ZhcmNoYXInLFxuICAgIGxlbmd0aDogNTAsXG4gIH0pXG4gIG5hbWU6IHN0cmluZztcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn6YOo6Zeo57yW5Y+3JyxcbiAgfSlcbiAgY29kZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfpg6jpl6jmj4/ov7AnLFxuICAgIHR5cGU6ICd2YXJjaGFyJyxcbiAgICBsZW5ndGg6IDIwMCxcbiAgfSlcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn54i257qn6YOo6ZeoaWQnLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICB9KVxuICBwYXJlbnRJZD86IG51bWJlcjtcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn5o6S5bqPJyxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBkZWZhdWx0OiAwLFxuICB9KVxuICBzb3J0OiBudW1iZXI7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+aYr+WQpuWQr+eUqCAx5pivIDDlkKYnLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGRlZmF1bHQ6IDEsXG4gIH0pXG4gIHN0YXR1czogbnVtYmVyO1xuXG4gIEBUcmVlUGFyZW50KClcbiAgcGFyZW50OiBEZXBhcnRtZW50RW50aXR5O1xuXG4gIEBUcmVlQ2hpbGRyZW4oKVxuICBjaGlsZHJlbjogRGVwYXJ0bWVudEVudGl0eVtdO1xuXG4gIEBPbmVUb01hbnkoKCkgPT4gVXNlckVudGl0eSwgKHVzZXIpID0+IHVzZXIuZGVwYXJ0bWVudClcbiAgdXNlcnM6IFVzZXJFbnRpdHlbXTtcbn1cbiIsImltcG9ydCB7IFVzZXJFbnRpdHkgfSBmcm9tICcuL3VzZXIuZW50aXR5JztcclxuaW1wb3J0IHsgRGVwYXJ0bWVudEVudGl0eSB9IGZyb20gJy4vZGVwYXJ0bWVudC5lbnRpdHknO1xyXG5pbXBvcnQgeyBNZW51RW50aXR5IH0gZnJvbSAnLi9tZW51LmVudGl0eSc7XHJcbmltcG9ydCB7IFJvbGVFbnRpdHkgfSBmcm9tICcuL3JvbGUuZW50aXR5JztcclxuaW1wb3J0IHsgU3ViamVjdEVudGl0eSB9IGZyb20gJy4vc3ViamVjdC5lbnRpdHknO1xyXG5cclxuLyoqXHJcbiAqIOe7n+S4gOWvvOWHuuaJgOacieWunuS9kyDlnKhUeXBlT1JN5Lit77yM5oiR5Lus6ZyA6KaB5Zyob3JtY29uZmlnLmpzb27kuK3phY3nva5lbnRpdGllc+Wtl+aute+8jOadpeaMh+WumumcgOimgeWKoOi9veeahOWunuS9k+exu+OAglxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgW1xyXG4gIFVzZXJFbnRpdHksXHJcbiAgRGVwYXJ0bWVudEVudGl0eSxcclxuICBSb2xlRW50aXR5LFxyXG4gIE1lbnVFbnRpdHksXHJcbiAgU3ViamVjdEVudGl0eSxcclxuXTtcclxuIiwiaW1wb3J0IHsgQ29sdW1uLCBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IEJhc2VFbnRpdHkgfSBmcm9tICcuL2NvbW1vbi5lbnRpdHknO1xuXG5ARW50aXR5KCdzeXNfbWVudXMnKVxuZXhwb3J0IGNsYXNzIE1lbnVFbnRpdHkgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfoj5zljZVpZCcsXG4gIH0pXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+iPnOWNleexu+WeiyAxOuebruW9lSAyOuiPnOWNlSAzOuaMiemSricsXG4gIH0pXG4gIHR5cGU6IG51bWJlcjtcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn5LiK57qn6I+c5Y2VaWQnLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICB9KVxuICBwYXJlbnRJZD86IG51bWJlcjtcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn6I+c5Y2V5ZCN56ewJyxcbiAgfSlcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfnu4Tku7blkI3np7AnLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICB9KVxuICBjb21wb25lbnROYW1lPzogc3RyaW5nO1xuXG4gIEBDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfnu4Tku7bot6/lvoQnLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICB9KVxuICBjb21wb25lbnRQYXRoPzogc3RyaW5nO1xuXG4gIEBDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfph43lrprlkJEnLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICB9KVxuICByZWRpcmVjdD86IHN0cmluZztcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn6I+c5Y2V5Zu+5qCHJyxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgfSlcbiAgaWNvbj86IHN0cmluZztcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn6I+c5Y2V6Lev5b6EJyxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgfSlcbiAgcm91dGU/OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+aOkuW6jycsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gIH0pXG4gIHNvcnQ/OiBudW1iZXI7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+adg+mZkOagh+ivhicsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gIH0pXG4gIHBlcm1pc3Npb246IHN0cmluZztcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn54q25oCBIDE65ZCv55SoIDA656aB55SoJyxcbiAgfSlcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCJpbXBvcnQgeyBDb2x1bW4sIEVudGl0eSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgQmFzZUVudGl0eSB9IGZyb20gJy4vY29tbW9uLmVudGl0eSc7XG5cbkBFbnRpdHkoJ3N5c19yb2xlcycpXG5leHBvcnQgY2xhc3MgUm9sZUVudGl0eSBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbih7XG4gICAgY29tbWVudDogJ+inkuiJsmlkJyxcbiAgfSlcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn6KeS6Imy5ZCN56ewJyxcbiAgfSlcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfop5LoibLnvJbnoIEnLFxuICB9KVxuICBjb2RlOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+aOkuW6jycsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gIH0pXG4gIHNvcnQ/OiBudW1iZXI7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+aPj+i/sCcsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gIH0pXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29sdW1uLCBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tICd0eXBlb3JtJztcclxuaW1wb3J0IHsgQmFzZUVudGl0eSB9IGZyb20gJy4vY29tbW9uLmVudGl0eSc7XHJcblxyXG5ARW50aXR5KCdwb3J0YWxfc3ViamVjdHMnKVxyXG5leHBvcnQgY2xhc3MgU3ViamVjdEVudGl0eSBleHRlbmRzIEJhc2VFbnRpdHkge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKHtcclxuICAgIGNvbW1lbnQ6ICfnp5Hnm65pZCcsXHJcbiAgfSlcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHtcclxuICAgIGNvbW1lbnQ6ICfnp5Hnm67nsbvlnosgMTrnp5Hnm64gMjrpopjlnosnLFxyXG4gIH0pXHJcbiAgdHlwZTogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHtcclxuICAgIGNvbW1lbnQ6ICfkuIrnuqfnp5Hnm65pZCcsXHJcbiAgICBudWxsYWJsZTogdHJ1ZSxcclxuICB9KVxyXG4gIHBhcmVudElkPzogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHtcclxuICAgIGNvbW1lbnQ6ICflkI3np7AnLFxyXG4gIH0pXHJcbiAgbmFtZTogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHtcclxuICAgIGNvbW1lbnQ6ICfoj5zljZXlm77moIcnLFxyXG4gICAgbnVsbGFibGU6IHRydWUsXHJcbiAgfSlcclxuICBpY29uPzogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHtcclxuICAgIGNvbW1lbnQ6ICfmjpLluo8nLFxyXG4gICAgbnVsbGFibGU6IHRydWUsXHJcbiAgfSlcclxuICBzb3J0PzogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHtcclxuICAgIGNvbW1lbnQ6ICfnirbmgIEgMTrlkK/nlKggMDrnpoHnlKgnLFxyXG4gIH0pXHJcbiAgc3RhdHVzOiBudW1iZXI7XHJcbn1cclxuIiwiaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBFbnRpdHksXG4gIEpvaW5Db2x1bW4sXG4gIEpvaW5UYWJsZSxcbiAgTWFueVRvTWFueSxcbiAgTWFueVRvT25lLFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBSZWxhdGlvbixcbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBCYXNlRW50aXR5IH0gZnJvbSAnLi9jb21tb24uZW50aXR5JztcbmltcG9ydCB7IERlcGFydG1lbnRFbnRpdHkgfSBmcm9tICcuL2RlcGFydG1lbnQuZW50aXR5JztcbmltcG9ydCB7IFJvbGVFbnRpdHkgfSBmcm9tICcuL3JvbGUuZW50aXR5JztcblxuQEVudGl0eSgnc3lzX3VzZXJzJylcbmV4cG9ydCBjbGFzcyBVc2VyRW50aXR5IGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKHtcbiAgICBjb21tZW50OiAn55So5oi3aWQnLFxuICB9KVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfnlKjmiLflkI0nLFxuICAgIGxlbmd0aDogMzAsXG4gIH0pXG4gIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+WvhueggScsXG4gICAgc2VsZWN0OiBmYWxzZSxcbiAgfSlcbiAgcGFzc3dvcmQ6IHN0cmluZztcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn5omL5py65Y+3JyxcbiAgfSlcbiAgbW9iaWxlOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+aYteensCcsXG4gICAgbGVuZ3RoOiAzMCxcbiAgfSlcbiAgbmlja25hbWU6IHN0cmluZztcblxuICAvLyBAQ29sdW1uKHtcbiAgLy8gICBjb21tZW50OiAn6YOo6ZeoaWQnLFxuICAvLyB9KVxuICAvLyBkZXBhcnRtZW50SWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn6YKu566xJyxcbiAgfSlcbiAgZW1haWw/OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7XG4gICAgY29tbWVudDogJ+aAp+WIqyAxLeeUtyAyLeWlsycsXG4gIH0pXG4gIHNleDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oe1xuICAgIGNvbW1lbnQ6ICfmj4/ov7AnLFxuICB9KVxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcblxuICBAQ29sdW1uKHtcbiAgICBjb21tZW50OiAn54q25oCBIDAt56aB55SoIDEt5ZCv55SoJyxcbiAgICBkZWZhdWx0OiAxLFxuICB9KVxuICBzdGF0dXM6IG51bWJlcjtcblxuICBATWFueVRvT25lKCgpID0+IERlcGFydG1lbnRFbnRpdHksIChkZXBhcnRtZW50KSA9PiBkZXBhcnRtZW50LnVzZXJzKVxuICBASm9pbkNvbHVtbih7IG5hbWU6ICdkZXBhcnRtZW50SWQnIH0pXG4gIGRlcGFydG1lbnQ6IFJlbGF0aW9uPERlcGFydG1lbnRFbnRpdHk+O1xuXG4gIEBNYW55VG9NYW55KCgpID0+IFJvbGVFbnRpdHksIChyb2xlKSA9PiByb2xlLmlkKVxuICBASm9pblRhYmxlKHtcbiAgICBuYW1lOiAnc3lzX3VzZXJfcm9sZXMnLFxuICAgIGpvaW5Db2x1bW46IHsgbmFtZTogJ3VzZXJfaWQnLCByZWZlcmVuY2VkQ29sdW1uTmFtZTogJ2lkJyB9LFxuICAgIGludmVyc2VKb2luQ29sdW1uOiB7IG5hbWU6ICdyb2xlX2lkJywgcmVmZXJlbmNlZENvbHVtbk5hbWU6ICdpZCcgfSxcbiAgfSlcbiAgcm9sZXM6IFJlbGF0aW9uPFJvbGVFbnRpdHlbXT47XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL3NoYXJlZC5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuIiwiaW1wb3J0IHsgR2xvYmFsLCBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBamF4UmVzdWx0U2VydmljZSB9IGZyb20gJy4vYWpheFJlc3BvbnNlLnNlcnZpY2UnO1xuXG5AR2xvYmFsKClcbkBNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtBamF4UmVzdWx0U2VydmljZV0sXG4gIGV4cG9ydHM6IFtBamF4UmVzdWx0U2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFqYXhSZXN1bHRqYXhSZXNwb25lc01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSHR0cE1lc3NhZ2VFbnVtIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2h0dHBNZXNzYWdlJztcbmltcG9ydCB7IEh0dHBTdGF0dXMsIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamF4UmVzdWx0U2VydmljZSB7XG4gIHN1Y2Nlc3M8VD4oZGF0YT86IFQsIG1lc3NhZ2U/OiBzdHJpbmcsIHN0YXR1cz86IG51bWJlcik6IEFqYXhSZXN1bHQ8VD4ge1xuICAgIHJldHVybiBBamF4UmVzdWx0LnN1Y2Nlc3MoXG4gICAgICBkYXRhLFxuICAgICAgKG1lc3NhZ2UgPSBtZXNzYWdlIHx8IEh0dHBNZXNzYWdlRW51bS5TVUNDRVNTKSxcbiAgICAgIChzdGF0dXMgPSBzdGF0dXMgfHwgSHR0cFN0YXR1cy5PSyksXG4gICAgKTtcbiAgfVxuXG4gIGVycm9yPFQ+KG1lc3NhZ2U/OiBzdHJpbmcsIHN0YXR1cz86IG51bWJlcik6IEFqYXhSZXN1bHQ8VD4ge1xuICAgIHJldHVybiBBamF4UmVzdWx0LmVycm9yKFxuICAgICAgKG1lc3NhZ2UgPSBtZXNzYWdlIHx8IEh0dHBNZXNzYWdlRW51bS5JTlRFUk5BTF9TRVJWRVJfRVJST1IpLFxuICAgICAgKHN0YXR1cyA9IHN0YXR1cyB8fCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiksXG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBBamF4UmVzdWx0PFQgPSBhbnk+IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGRhdGE/OiBUO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICBzdWNjZXNzPzogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IoZGF0YTogVCwgc3RhdHVzOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZywgc3VjY2VzczogYm9vbGVhbikge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN1Y2Nlc3MgPSBzdWNjZXNzO1xuICB9XG5cbiAgc3RhdGljIHN1Y2Nlc3M8VCA9IGFueT4oXG4gICAgZGF0YT86IFQsXG4gICAgbXNnPzogc3RyaW5nLFxuICAgIGNvZGU/OiBudW1iZXIsXG4gICk6IEFqYXhSZXN1bHQ8VD4ge1xuICAgIHJldHVybiBuZXcgQWpheFJlc3VsdDxUPihkYXRhLCBjb2RlLCBtc2csIHRydWUpO1xuICB9XG5cbiAgc3RhdGljIGVycm9yPFQgPSBudWxsPihtc2c/OiBzdHJpbmcsIHN0YXR1cz86IG51bWJlcik6IEFqYXhSZXN1bHQ8VD4ge1xuICAgIHJldHVybiBuZXcgQWpheFJlc3VsdDxUPihudWxsLCBzdGF0dXMsIG1zZywgZmFsc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc3BvcnQsIENsaWVudHNNb2R1bGUgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuaW1wb3J0IHsgUmVkaXMgfSBmcm9tICdpb3JlZGlzJztcbmltcG9ydCB7IFJlZGlzQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi9yZWRpcy1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgLy8g5Yid5aeL5YyWcmVkaXPvvIxyZWRpc+WPguaVsOW7uuiurumFjee9ruWIsOWklumDqOmFjee9ruaWh+S7tuW8leWFpVxuICAgIENsaWVudHNNb2R1bGUucmVnaXN0ZXJBc3luYyhbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdSRURJU19TRVJWSUNFJyxcbiAgICAgICAgdXNlRmFjdG9yeTogYXN5bmMgKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpID0+ICh7XG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgaG9zdDogY29uZmlnU2VydmljZS5nZXQ8c3RyaW5nPignTVlTUUxfSE9TVCcpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuUkVESVMsXG4gICAgICAgIH0pLFxuICAgICAgICBpbmplY3Q6IFtDb25maWdTZXJ2aWNlXSxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHByb3ZpZGVyczogW1JlZGlzQ2FjaGVTZXJ2aWNlLCBSZWRpc10sXG4gIGV4cG9ydHM6IFtSZWRpc0NhY2hlU2VydmljZSwgUmVkaXNdLFxufSlcbmV4cG9ydCBjbGFzcyBSZWRpc0NhY2hlTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBIdHRwRXhjZXB0aW9uLCBIdHRwU3RhdHVzLCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUmVkaXMsIHR5cGUgUmVkaXNLZXkgfSBmcm9tICdpb3JlZGlzJztcblxuLy8g6Ieq5a6a5LmJUmVkaXPmnI3liqFcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZWRpc0NhY2hlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcmVkaXM6IFJlZGlzKSB7fVxuXG4gIC8vIOiOt+WPlnJlZGlzXG4gIGFzeW5jIGdldChrZXkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5yZWRpcy5nZXQoa2V5KTtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5CQURfUkVRVUVTVCk7XG4gICAgfVxuICB9XG5cbiAgLy8g6K6+572ucmVkaXNcbiAgYXN5bmMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZSwgdHRsID0gMTAwMDApIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVkaXMuc2V0KGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpLCAnRVgnLCB0dGwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDliKDpmaRyZWRpc1xuICAgKi9cbiAgYXN5bmMgZGVsZXRlKGtleTogUmVkaXNLZXlbXSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWRpcy5kZWwoa2V5KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQWpheFJlc3VsdGpheFJlc3BvbmVzTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2FqYXgtcmVzcG9uZXNlL2FqYXhSZXNwb25lcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBSZWRpc0NhY2hlTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL3JlZGlzLWNhY2hlL3JlZGlzLWNhY2hlLm1vZHVsZSc7XHJcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcclxuaW1wb3J0IGJvb3RzdHJhcHMgZnJvbSAnLi9ib290c3RyYXBzJztcclxuXHJcbkBNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFsuLi5ib290c3RyYXBzLCBBamF4UmVzdWx0amF4UmVzcG9uZXNNb2R1bGUsIFJlZGlzQ2FjaGVNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW1NoYXJlZFNlcnZpY2VdLFxyXG4gIGV4cG9ydHM6IFtTaGFyZWRTZXJ2aWNlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7fVxyXG4iLCJpbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5cbi8qKiBAZGVzY3JpcHRpb24gdG9rZW7op6PmnpDlkI7ov5Tlm57nmoTkv6Hmga/nsbvlnosgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tUmVxdWVzdCBleHRlbmRzIFJlcXVlc3Qge1xuICB1c2VyPzogQ3VzdG9tVXNlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21Vc2VyIHtcbiAgaWQ6IG51bWJlcjtcbiAgdXNlcm5hbWU6IHN0cmluZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2p3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL21pY3Jvc2VydmljZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9wYXNzcG9ydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3N3YWdnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy90eXBlb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzLXZhbGlkYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkYXlqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpb3JlZGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWp3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XHJcbmltcG9ydCB7IENsaWVudE1vZHVsZSB9IGZyb20gJy4vY2xpZW50Lm1vZHVsZSc7XHJcbmltcG9ydCB7IERvY3VtZW50QnVpbGRlciwgU3dhZ2dlck1vZHVsZSB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBib290c3RyYXAoKSB7XHJcbiAgY29uc3QgYXBwID0gYXdhaXQgTmVzdEZhY3RvcnkuY3JlYXRlKENsaWVudE1vZHVsZSk7XHJcbiAgLy8gc3dhZ2dlclxyXG4gIGNvbnN0IHN3YWdnZXJPcHRpb25zID0gbmV3IERvY3VtZW50QnVpbGRlcigpXHJcbiAgICAuc2V0VGl0bGUoJ25lc3QgYXBp5paH5qGjJylcclxuICAgIC5zZXREZXNjcmlwdGlvbign6L+Z5piv5LiA5Liq5o+P6L+wJylcclxuICAgIC5zZXRWZXJzaW9uKCcxLjAnKVxyXG4gICAgLmFkZEJlYXJlckF1dGgoKVxyXG4gICAgLmJ1aWxkKCk7XHJcbiAgY29uc3QgZG9jdW1lbnQgPSBTd2FnZ2VyTW9kdWxlLmNyZWF0ZURvY3VtZW50KGFwcCwgc3dhZ2dlck9wdGlvbnMpO1xyXG4gIFN3YWdnZXJNb2R1bGUuc2V0dXAoJ2RvYycsIGFwcCwgZG9jdW1lbnQpO1xyXG5cclxuICBhd2FpdCBhcHAubGlzdGVuKHByb2Nlc3MuZW52LnBvcnQgPz8gMzAwMCk7XHJcbn1cclxuYm9vdHN0cmFwKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==