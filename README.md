# rest-stub

Simple web application which automatically responds to HTTP requests.

Often when creating applications which consume REST APIs, the resource endpoints don't yet exist or are somehow unavailable.  With this application, those requests can be pointed somewhere temporarily and provide real responses without the hassle of writing stubs.


## Available Endpoints

- **`/delay/[time]`** - A `200` response that is delayed by `[time]` seconds.
- **`/echo/[status]`** - A response of `[status]` status code with no content.  Prints request body to the console.
- **`/status/[status]`** - A response of `[status]` status code with no content.
- **`/wildcard/[percentage]`** - A response which randomly fails roughly `[percentage]` percent of the time.
- **`/[*]`** - Catch-all responder.  Will recognize two custom headers:
    + **`x-delay`** - Delays response by given integer.
    + **`x-status`** - Response will return with given status code (1xx - 5xx).


## Usage

```
npm install rest-stub
cd node_modules/rest-stub/
npm start
```

The application runs on port `48200`.

On OS X, a launch agent is included (if a little clunky to use):

1. Edit the `com.mikattack.rest-stub.plist` file and change the `/PATH/TO/server.js` string to point to where `rest-stub` was placed.
2. Copy `com.mikattack.rest-stub.plist` to `~/Library/LaunchAgents`.
3. Run `launchctl load ~/Library/LaunchAgents/com.mikattack.rest-stub.plist`

Check the *Console* application's output if the server doesn't seem accessible.
