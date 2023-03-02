type Token = {
    token:string;
    refreshToken:string;
}

type RoleInfo = {
    _id:string;
    name:string;
} | any;

// 用户信息
type UserInfo = {
    _id:any;
    name:string;
    account:string;
    role:RoleInfo;
}