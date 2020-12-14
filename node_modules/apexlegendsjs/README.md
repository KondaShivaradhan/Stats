# apexlegendsjs

![npm](https://img.shields.io/npm/dt/apexlegendsjs)

`npm install apexlegendsjs`

Very light 0 Dependency package that connects to an Apex Legends API

# How to use
First run `npm install apexlegendsjs`

Go here to sign up for an API Key: https://apex.tracker.gg/site-api

Then paste your key into API_KEY_HERE

After that, use apex.player() to get core player information.
The data this returns is listed in the documentation here:https://tracker.gg/developers/docs/titles/apex

Recently Updated to V2 of apex tracker API!

"PLAFORM" needs be either origin, psn, or xbl.

```js
const apex = require('apexlegendsjs')(API_KEY_HERE)
async function main(){
const profile = await apexjs.profile("playerName", "PLATFORM")
const playerSegments = await apexjs.playerSegments("playerName", "PLATFORM", "legend")
const searchResults = await apexjs.search("PLATFORM", "query")
const playerSessionData = await apexjs.playerSessions("playerName", "PLATFORM")
}()
```

This API is documented by JSDocs and the API is promise based. Feel free to look at the code on github and suggest any improvements

# Created By
This package was created by John Kryspin.
