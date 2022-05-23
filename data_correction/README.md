# Data correction program
Each endpoint holds some data, but someone made a mistake and shuffled it.
Thankfully, all users ids are still here !
You have to fix it ! For that, you have to make a backup of each endpoint locally (one json file per endpoint),
then compile them in one file, sanitize the data, store it locally and upload it on Krates.
## Build Setup

``` bash
# install dependencies
npm install

# start the program
node .\src\index.js

# Run unit testing
npm test

```

