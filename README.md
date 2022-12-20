# Potluck
## SERVER
Everything for the SERVER section should be done from the SERVER folder

### Swagger page
Locally found at ```http://localhost:3001/api/docs```


### Setup
You can utilize a .env file for every environment. i.e can use .env.dev and .env.test are set to be used by the package.json but will default to .env only if no other exists.
Before running the application ensure you have a .env file created in the SERVER folder. It MUST contain these 5 values currently:
The information is what I sent to everyone individually. It breaks out like this:
```"mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority"```
```
MONGO_USERNAME=MONGO_USERNAME
MONGO_PASSWORD=MONGO_PASSWORD
MONGO_URL=MONGO_URL
MONGO_DB=MONGO_DB
TOKEN_KEY=JSONWebTokenCreationKey
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
POTLUCK_URI=<URI:PORT>/api
```
Install required packages:
```npm i```
### Starting the application (DEV)

To run the application:
```
npm run dev
```
