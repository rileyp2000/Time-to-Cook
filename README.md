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
4. On the Pi, run the `pi-install.sh` script to install MongoDB, Node, and nginx.
5. Run `sudo systemctl status mongod` to ensure that the mongod service is running

## Instructions to go from development project to deploy-ready on the Pi
1. Make sure `npm install` is up to date in the client on your development machine
2. Run `npm run build` to compile the frontend into a production-ready status
3. Move the generated `build/` directory into the `server/` directory
4. Copy over the `server/` directory onto the Pi.
### On the Pi
5. Navigate to the `server/` directory and run `npm install`, then `npm install -g pm2`. Additionally, change references to `.env.docker` in `recipes.js` and `server.js` to be `.env`.
6. This project uses nginx as a reverse proxy. To configure it for the project, edit the config with `sudo vi /etc/nginx/sites-available/default`. The `location /` block should match the following:
```
. . .
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 5M;
    }
```
7. Use `sudo nginx -t` to validate the config, and if successful run `sudo systemctl restart nginx` to apply it.
8. Once complete, run `pm2 server.js` to start the site! To have it auto launch on startup, run `pm2 startup systemd` and then run the command it gives that looks like the following (**DO NOT ACTUALLY RUN THE BELOW BLOCK, RUN THE BLOCK GIVEN TO YOU BY PM2**):
```
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.0.0/bin \\ 
/home/ubuntu/.nvm/versions/node/v20.0.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

```
