# Time-to-Cook

## Development
This project uses a docker compose setup for testing purposes. To run, perform the following commands from the root directory of the project
```
docker compose build
docker compose up
```
If the mongo-express service fails to startup correctly, run `docker compose start` to restart it.

To tear down the setup, run 
```
docker compose down
```


## Setup a Pi for our project
1. Our project requires the 64-bit distribution of Ubuntu 20.04 to run on your 
    Raspberry Pi. The easiest way to flash a new SD card is to use the [Raspberry
    Pi Imager software](https://www.raspberrypi.com/software/). 
    - In the imager, go to `Other general-purpose OS -> Ubuntu -> Ubuntu Server 20.04.5 LTS (64-bit)`
2. To setup your wifi connection before you plug in the Pi, navigate to the network
    config file on the SD card. Uncomment the wlan0 section and replace the 
    access points with your wifi SSID and password. This will allow you to connect
    to your Wifi at boot time on the Pi.
3. Insert the SD card into the Pi and turn it on, resetting the ubuntu user's 
    password.
4. On the Pi, run the `pi-install.sh` script to install MongoDB and Node
5. Run `sudo systemctl status mongod` to ensure that the mongod service is running

## Instructions to go from development project to deploy-ready on the Pi
1. Make sure `npm install` is up to date in the client on your development machine
2. Run `npm run build` to compile the frontend into a production-ready status
3. Move the generated `build/` directory into the `server/` directory
4. Copy over the `server/` directory onto the Pi.
### On the Pi
5. Navigate to the `server/` directory and run `npm install`. Additionally, change references to `.env.docker` in `recipes.js` and `server.js` to be `.env`.
6. Once complete, run `node server.js` to start the site! If you would like the 
    service to run in the background, instead run `node server.js &`
