// import request from "@/utils/request"

//用户登录-参数类型
type LoginInfo = {
    account:string,
    password:string
}

//用户登录-返回数据类型
type LoginResult = {
    success:boolean
    state:number
    message:string
    content:string
}

//用户请求登录
export const login = (loginInfo:LoginInfo) =>{
    return request<LoginResult>({
        method:'POST',
        url:'/front/user/login',
        data:`account=${loginInfo.account}&password=${loginInfo.password}`
    })
}

