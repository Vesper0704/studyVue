const http = require('http');
const urlModule = require('url')

const server = http.createServer()

//监听request请求
server.on('request',function(req,res){

    //true代表调用querystring模块来解析
    const {pathname:url,query} = urlModule.parse(req.url,true);

    if(url === '/getscript'){

        var data = {
            name:'drj',
            age:21,
            gender:'male'
        }
//src/基础/movie.json
        //转化为字符串   JSON.stringify
        //console.log(JSON.stringify(data))
        const scriptStr= `${query.callback}(${JSON.stringify(data)})`

        console.log(scriptStr)  //show()  show({"name":"drj","age":21,"gender":"male"})
        res.end(scriptStr);  //发给客户端  客户端收到之后 可以当作json来调用这个方法（已经在客户端写好）

    }else{
        res.end({
            message:'not found',
            code:404,
        })
    }
})

//在3000端口上监听
server.listen(3000,function (){
    console.log('listening...')
})
