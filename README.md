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