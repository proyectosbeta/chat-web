# Chat

# Tecnologies

- NodeJS
- NPM
- Socket.io

# Development

## Install

```bash
npm i
```

## Start

```bash
npm start
```

## Web access

```
http://localhost:3000/
```

# Production

## RUN APP

Pm2 is a tool for Node.JS application production environments, basically this tool helps us to launch our application as a daemon service on our server.

```bash
npm install pm2 -g
```

We must create a daemon with PM2 so we stop the server and execute the following command:

```bash
pm2 start /home/proyectosbeta/repositoriosGit/chat-web/app/socket/server.js --name chat-web
```

We need to configure the server startup script.

```bash
pm2 startup
```