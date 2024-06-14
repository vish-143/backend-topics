// const fs=require("fs")
// const result=fs.readFileSync("input.txt")
// console.log(result.toString())
// console.log("Program Ended");

// fs.readFile("input.txt",(err,data)=>{
//     if(err){
//         return console.log(err)
//     }
//     else{
//         console.log(data.toString())
//     }
// })
// console.log("Program finished")

// const EventEmitter=require("events")
// const eventEmitter= new EventEmitter()
// const eventHandler=()=>{
//     console.log("Event started")
// }
// eventEmitter.on("myEmitter",eventHandler)
// eventEmitter.emit("myEmitter")

// const events=require("events")
// const myEvents=new events.EventEmitter()

// const listener1=function listener1(){
//     console.log("Listener 1 is executed");
// }

// const listener2=function listener2(){
//     console.log("Listener 2 is executed");
// }

// myEvents.on("connection",listener1)
// myEvents.addListener("connection",listener2)

// const eventListenerCount=require("events").EventEmitter.listenerCount(myEvents,"connection")
// console.log('eventListenerCount: ', eventListenerCount + "Listened this much of times");


// myEvents.emit("connection",listener1)

// myEvents.removeListener("connection",listener1)
// console.log("Listener 1 is not listening")

// myEvents.emit("connection",listener2)

// const eventListenerCount2=require("events").EventEmitter.listenerCount(myEvents,"connection")
// console.log('eventListenerCount: ', eventListenerCount2 + "Listened this much of times");

// console.log("Program ended");

// var buf = new Buffer([10, 20, 30, 40, 50]);
// console.log(buf)

// const fs=require("fs")
// let data=""
// const readerStream=fs.createReadStream("./input.txt")
// readerStream.setEncoding("UTF8")
// readerStream.on("data",(chunk)=>{
//     console.log("chunk",chunk)
// })
// readerStream.on("end",()=>{
//     console.log("data",data);
// })
// readerStream.on("error",(err)=>{
//     console.log(err);
// })

// console.log("Program ended")

// const fs = require("fs")
// const data = "Learning stream concepts in Node"
// const writeStream = fs.createWriteStream("./output.txt")
// writeStream.write(data, "utf8")
// writeStream.end()
// writeStream.on("finish", ()=> {
//     console.log("File written")
// })
// writeStream.on("error", (error) => {
//     console.log(error)
// })
// console.log("Program ended")

// const fs=require("fs")
// const readerStream=fs.createReadStream("./input.txt")
// const writerStream=fs.createWriteStream("./output.txt")
// readerStream.pipe(writerStream)
// console.log("Program ended")

// const fs=require("fs")
// const zlib=require("zlib")

// fs.createReadStream("./output.txt")
// .pipe(zlib.createGzip()).pipe(fs.createWriteStream("./input.txt.gz"))
// console.log("File compressed")


// // Decompress the file input.txt.gz to input.txt
// fs.createReadStream('input.txt.gz')
//    .pipe(zlib.createGunzip())
//    .pipe(fs.createWriteStream('input.txt'));

// console.log("File Decompressed.");

// const fs = require("fs")
// fs.open("./input.txt", "r+", (err, data) => {
//     if (err) {
//         console.log('err: ', err);

//     }
//     else {
//         console.log("File opened successfully");
//     }
// })

// const fs = require("fs")
// fs.stat("./input.txt", (err, stats) => {
//     if (err) {
//         console.log('err: ', err);

//     }
//     console.log('stats: ', stats);
//     console.log("isFile?",stats.isFile())
//     console.log("isDirectory?",stats.isDirectory())


// })

// const fs=require("fs")
// fs.writeFile("./input.txt","Simply learning Node js",(err)=>{
//     if(err){
//         console.log('err: ', err);
//     }
//     console.log("File written")
// })

// fs.readFile("./input.txt",(err,data)=>{
//     if(err){
//         console.log('err: ', err);
//     }
//     console.log('data: ', data.toString());
// })

// console.log("Program ended")

// const fs = require("fs")
// const buff = new Buffer(1024)
// fs.open("./input.txt", "r+", (err, fd) => {
//     if (err) {
//         console.log('err: ', err);
//     }
//     fs.read(fd, buff, 0, buff.length, 0, (err, bytes) => {
//         if (err) {
//             console.log('err: ', err);

//         }
//         console.log("data",bytes)

//         if(bytes > 0){
//             console.log(buff.toString());
//          }
//     })
// })

// const fs = require("fs")
// const buff = new Buffer(1024)

// fs.open("./input.txt", "r+", (err, fd) => {
//     if (err) {
//         console.log('err: ', err);
//     }
//     fs.read(fd, buff, 0, buff.length, 0, (err, byte) => {
//         if (err) {
//             console.log('err: ', err);

//         }
//         console.log("byte", byte)
//         if (byte > 0) {
//             console.log(buff.toString())
//         }
//     })
//     fs.close(fd, (err) => {
//         if (err) {
//             console.log('err: ', err);

//         }
//         console.log("File closed successfully");
//     })


// })

// const fs = require("fs")
// const buff = new Buffer(1024)
// fs.open("./input.txt", "r+", (err, fd) => {
//     if (err) {
//         console.log('err: ', err);
//     }
//     console.log("File opened successfully")
//     fs.ftruncate(fd, 40, (err) => {
//         if (err) {
//             console.log('err: ', err);
//         }
//         console.log("File truncated")

//     })
//     fs.read(fd,buff,0,buff.length,0,(err,bytes)=>{
//         if (err) {
//             console.log('err: ', err);
//         }
//         console.log("bytes",bytes)
//         if(bytes>0){
//             console.log(buff.toString())
//         }
//     })
//     fs.close(fd, function(err) {
//         if (err) {
//            console.log(err);
//         } 
//         console.log("File closed successfully.");
//      });
// })

// var fs = require("fs");

// console.log("Going to delete an existing file");
// fs.unlink('input.txt', function(err) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("File deleted successfully!");
// });

// const fs = require("fs")
// fs.mkdir("D:/projects/mitrahsoft/www.acf.local/node from scratch/test", (err) => {
//     if (err) {
//         console.log('err: ', err);

//     }
//     console.log("Folder created successfully")
// })

// const fs=require("fs")

// fs.rmdir("D:/projects/mitrahsoft/www.acf.local/node from scratch/new folder",(err)=>{
//     if(err){
//         console.log('err: ', err);

//     }
// })
// fs.readdir("D:/projects/mitrahsoft/www.acf.local/node from scratch/",(err,files)=>{
//     if(err){
//         console.log('err: ', err);
//     }
//     files.forEach((file)=>{
//         console.log('file: ', file);

//     })
// })

function printHello() {
    console.log( "Hello, World!");
 }
 
 // Now call above function after 2 seconds
 var t = setTimeout(printHello, 2000);
 
 // Now clear the timer
 clearTimeout(t);