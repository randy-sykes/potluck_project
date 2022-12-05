# Potluck
## SERVER
Everything for the SERVER section should be done from the SERVER folder
### Setup
Before running the application ensure you have a .env file created in the SERVER folder. It MUST contain these 4 values currently:
The information is what I sent to everyone individually. It breaks out like this:
```"mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority"```
```
MONGO_USERNAME=MONGO_USERNAME
MONGO_PASSWORD=MONGO_PASSWORD
MONGO_URL=MONGO_URL
MONGO_DB=MONGO_DB
```

Install required packages:
```npm i```

### Starting the application (DEV)

To run the application:
```
npm run dev
```

## CLIENT
Everything for the CLIENT section should be done from the CLIENT folder.
### SETUP
You can use a .env file to override the client default config with this value contained within:
```
POTLUCK_URI=<URI:PORT>
```
Install required packages:
```npm i```
### Starting the application (DEV)

To run the application:
```
npm run dev
```
