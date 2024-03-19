# CodeCollab

This application optimizes the interview process in software field 

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)


## Description 
CodeCollab enables the interviewers (HR, technical) to take interviews efficiently. CodeCollab have a create meeting functionality where a new meet or room is created. In this room 2 or more people can join and access and edit the code at same time Thus guiding the candidate becomes easier. The code editor provided in this room have a built-in compiler for C++, python and java. Also interviewers can schedule multiple interviews at one click, they just need to upload the excel file with candidate details and the date and time slot on which they want to conduct the interviews. Time slots will be given to candidates and an email will be sent to the candidates containing date, time, room id and other information regarding the scheduled interview.
[click here to view the video](https://www.canva.com/design/DAF_u84Fwqo/2pLac9r3bk3mtuy2HI7mLw/edit?utm_content=DAF_u84Fwqo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Technologies

- Client : React + tailwind
- Server : Nodejs
- DB : Firebase + Mongodb
- webRTC : Socket.io

## Installation

### Client Side

1) Clone the repo first  
```
git clone https://github.com/Ishika-08/CodeCollab
```

2) Go inside client fodler 

```
cd client
```

3) Install dependencies using npm 

```
npm install 
```

4) Create an env and fill its credentials  
```
cp .env.example .env
```

5) To run development server using vite  
```
npm run dev
```

### Server side

1) After cloning the go inside the server folder  
```
cd server
```  
2) Install dependencies using npm   
```
npm install
```  
3) Create `.env` file by copying the content of example env file  
```
cp .env.example .env
```
4) Fill the env keys and run the sever  
```
npm run serve
```


## Docker Integration

⚠️ **Notice:** Docker integration is currently under development and will be available soon. 



## Usage

- Start the `client` and `server` server at the same time to test the application.


