const express = require('express'); // นำเข้าโมดูล express
const app = express(); // สร้าง instance ของ express app
const http = require('http'); // นำเข้าโมดูล http
const server = http.createServer(app); // สร้าง instance ของ http server พร้อมกับส่ง app ไปยัง request listener
const { Server } = require("socket.io"); // นำเข้าโมดูล socket.io และ destructuring คอนสตรักต์ Server
const io = new Server(server); // สร้าง instance ของ socket.io server พร้อมกับส่ง http server ไปยัง constructor


app.get('/', (req, res)=> { 
    res.sendFile(__dirname + '/index.html'); 
  });

io.on('connection', (socket) => { // ตั้ง event listener สำหรับการเชื่อมต่อของแต่ละ client
    socket.on('chat message', (msg) => { // ตั้ง event listener สำหรับข้อความที่ส่งมาจาก client
        console.log('message:' + msg); // แสดงข้อความที่ได้รับจาก client บน console
        io.emit('chat message', msg); // send the message to everyone, including the sender.
    })
});


server.listen(3000,() => { // เริ่มต้นการ listen บน port 3000
    console.log('listening on *:3000'); // แสดงข้อความบน console เมื่อเริ่ม listen บน port 3000
});
