const fs=require('fs')

const requestHandler=(request,response)=>{
    if(request.url==="/"){
        response.setHeader("Content-type","text/html")
        response.write('<html>')
        response.write('<head><title>Form</title></head>')
        response.write('<body><form action="/message" method="POST"><input type="text" name="message" /><input type="submit"/></form></body>')
        response.write('</html>')
        return response.end()
    }
    if(request.url==='/message' && request.method=="POST"){
        const body=[]
        request.on('data',(chunk)=>{
          body.push(chunk)
          console.log(chunk);
        })
        request.on('end',()=>{
            const parseBody=Buffer.concat(body).toString()
            console.log("end event file called last due to async fn");
            const response=parseBody.split("=")
            fs.writeFileSync("response.txt",response[1])
        })
        fs.writeFileSync("redirect.txt","Redirection to be occured")
        console.log("file called first due to sync fn");
        response.setHeader('Location','/')
        response.statusCode=302
        return response.end()
    }
    response.setHeader("Content-type","text/html")
    response.write('<html>')
    response.write('<head><title>Node Server</title></head>')
    response.write('<body><h1>First server created by Node</h1></body>')
    response.write('</html>')
    response.end()
}
module.exports={
    handler:requestHandler,
    sometext:"Print Something"
}