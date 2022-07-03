# Description
The chat for Proyectos Beta (proyectosbeta.net)

# Tecnologies

- NodeJS 14.19.3
- NPM 6.14.17
- Socket.io 4.5.1
- Express 4.18.1
- Sonarqube 9.5.XX

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

# Quality code 

## Sonarqube

-   [Site](https://www.sonarqube.org/)

### Install

#### With docker

```bash
docker pull sonarqube
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

#### Web access

```
http://localhost:9000
```

##### Credentials

-   User: admin
-   Password: admin

#### Use with docker

```bash
docker pull newtmitch/sonar-scanner

```

##### GNU-Linux/MacOS

Execute

```bash
docker run -ti -v /home/proyectosbeta/repositoriosGit/chat-web:/usr/src --link sonarqube newtmitch/sonar-scanner
```

##### Microsoft Windows

Execute

```bash
docker run -ti -v C:\Users\proyectosbeta\repositoriosGit\chat-web:/usr/src --link sonarqube newtmitch/sonar-scanner
```

# Production

## RUN APP

Pm2 is a tool for Node.JS application production environments, basically this tool helps us to launch our application as a daemon service on our server.

```bash
npm install pm2 -g
```

We must create a daemon with PM2 so we stop the server and execute the following command:

```bash
pm2 start /home/proyectosbeta/repositoriosGit/chat-web/app/server/index.js --name chat-web
```

We need to configure the server startup script.

```bash
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u proyectosbeta --hp /home/proyectosbeta
```

## Web access

```
http://51.15.192.116:5000/
```
