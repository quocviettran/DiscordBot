const http = require("http");

function setup() {
//Signal listening
    process
        .on("SIGTERM", shutdown("SIGTERM"))
        .on("SIGINT", shutdown("SIGINT"))
        .on("uncaughtException", shutdown("uncaughtException"));

    http
        .createServer((req, res) => res.end("hi"))
        .listen(process.env.PORT || 3000, () => console.log("Listening"));
}

function shutdown(signal) {
    return (err) => {
        console.log(`${signal}...`);
        if (err) console.error(err.stack || err);
        setTimeout(() => {
            console.log("...waited 2s, exiting.");
            process.exit(err ? 1 : 0);
        }, 2000).unref();
    };
}

exports = {setup, shutdown}