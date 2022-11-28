# Potluck
## Setup
Before running the application ensure you have a .env file created in the src folder. It MUST contain these 2 values currently:
The information is what I sent to everyone individually. It breaks out like this:
"mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority"
```
MONGO_PASSWORD=MONGO_USERNAME
MONGO_USERNAME=MONGO_PASSWORD
MONGO_URL=MONGO_URL
MONGO_DB=MONGO_DB
```

Install required packages:
```npm i```

## Starting the application (DEV)

To run the application:
```
npm run dev
```
