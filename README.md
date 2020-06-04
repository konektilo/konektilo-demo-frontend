![](src/assets/konektilo-logo.png | width=300)
# konektilo demo frontend
The konektilo demo frontend is an ionic app which you can use for developing a dashboard for your opc-ua servers that are connected to konektilo.
The app is developed with ionic 5.
Below you can see an overview of the different components of konektilo.
If you would like to test and include konektilo as RESTful api for opc-ua you can find the free version here: ```https://konektilo.de/testuser```

![alt text](graphics/konektilo-demo-frontend.png "konektilo demo frontend overview")

# getting started
* For the ionic setup please take a look at ```https://ionicframework.com/getting-started```
* Clone this repository
* Dependencies can be installed with ```npm install```
* The development server can be started with ```ng serve```
* After startup the development server runs at ```http://localhost:4200```

## service overview
* Please look at the device service for adding/changing opc-ua servers ```src\app\services\device\device.service.ts```
* Please look at the konektilo service for changing ip-address/port of konektilo ```src\app\services\konektilo\konektilo.service.ts```
* Please look at the konektilo signalR service for changing ip-address/port of konektilo ```src\app\services\konektilo-signalr\konektilo-signal-r.service.ts```

# deployment

## deployment as www folder
* Build project with the command ```ng build```
* Copy the content of the www folder to your webserver

## deployment as docker container
* Build docker image with the command ```docker build --tag konektilo-demo-frontend .```
* Run the docker container ```docker run --publish 8080:80 -d --name konektilo-demo-frontend konektilo-demo-frontend```
* The website is available at ```http://localhost:8080```
