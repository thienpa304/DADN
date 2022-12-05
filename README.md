 
# Smart House

## Project Objectives

A smart home is a house that is integrated with advanced technologies to help owners The home can control the electrical appliances as desired, making life meaningful than. With the development of the 4.0 technology revolution, smart home accordingly will also appear more . When making a smart home, it means you are Use technology to make life more comfortable. They will reduce the amount of work our work and have more leisure time.   


<img src="https://github.com/HelloThien/SmartHouse/blob/main/public/static/Dashboard%20edited.png"/>
## Diagram of dependencies between system modules
<img src="https://github.com/HelloThien/SmartHouse/blob/main/public/static/struture.png"/>


- Microbit circuits: devices to be connected and combined on and based on Microbits.
- MQTT broker: use Adafruit with integrated api and socket for each topic corresponding to each device. Serves for consuming and pushing data from other services. 
- Server app: where to consume data by topic from MQTT Broker and then save it Mongo database, providing api for Client app to use stored data in the database 
- Mongo database: Where to store the data needed to serve the application. 
- Client app Displays an interface that allows users to view information and interact with each other interact directly with devices.

## Feature
- Dasheboard:
<img src="https://github.com/HelloThien/SmartHouse/blob/main/public/static/Dashboard%20edited.png"/>

- Login:
<img src="https://github.com/HelloThien/SmartHouse/blob/main/public/static/login-smarthouse.png"/>

- Statistic:
<img src="https://github.com/HelloThien/SmartHouse/blob/main/public/static/dashboard%20temperature.png"/>

- Schedule:
<img src="https://github.com/HelloThien/SmartHouse/blob/main/public/static/schedule_device.png"/>


## Demo
[![Watch the video](https://github.com/HelloThien/SmartHouse/blob/main/public/static/video-demo.png)](https://www.youtube.com/watch?v=etYJXkReOuE)
