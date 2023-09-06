
# Messaging Web Server BackEnd Rest Api with Mongo, Express, Node.

This project, is for building a live messaging server with live notification and full authentication and authorization based also.
Here, we will add private chat and group chat feature.


## Features

- Full Authentication and Authorization based.
- Private Chat
- No images can be separately opened or viewed for privacy
- No images in private chat can be downloaded
- Think about it if you are chatting in personal moment and someone in your family comes to check in ... I added a feature to hide all previous chats 🤣
- Group Chat
- Admin can kick in group Chat
- You can leave group chat anytime 
- You can change your messaging avatar now
- Verify users with mail

  
## Lessons Learned

- Node Js
- Express 
- Nodemailer
- Multer
- Socket Io
- Jimp
- Mongo
- Joi
- Mongoose
- Cors
- Morgan
- Error Handling



## Run Locally

Clone the project

```bash
  git clone https://github.com/SaminKirigaya/Chat_WebApp_BackEnd_RestApi_with_NODE_EXPRESS.git

```

Go to the project directory

```bash
  cd my-project
  //your project saving directory name
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Optimizations

The most important thing which you must remember is that you have to change .env file and adjust it according to your hosting.I ran the project in localhost in port 8000.

- PORT=8000
- SMTP_MAIL= {Must add ur smtp mail here}
- SMTP_PASS= {Must add smtp mails google provided pass}
- IMG=http://localhost:8000
- DBURL=mongodb://0.0.0.0:27017/chatserver


-   Port means which port to run it.
-   Imgpath is a link starting root address ... I used express.static to save image inside public/images.
so the image link was like :
http://localhost:8000/public/images/imagename.jpg


-   smtp_mail and smtp_pass are your smtp creation provided one.

- Change DBURL's mongo db urls if you host in mongo atlas.

## Support

For support, saminyeasararnob@gmail.com 


