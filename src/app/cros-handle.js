const cros_handle = async(ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*'); //访问控制允许来源：*为所有
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild'); //访问控制允许报头Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    ctx.set('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200; //OPTIONS类型的请求直接返回200
    } else {
        await next();
    }
}
module.exports = cros_handle;