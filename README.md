# not-so-slow

This is just a toy example of how plain logging may not be enough to find out
upstream response time from the downstream perspective.

## usage

Install things with:

  $ yarn install

Then run on two different terminals:

  $ node api-server.mjs

  $ node web-server.mjs

Finally stress it running many requests witha tool like `ab`:

  $ ab -c 4 -n 20 localhost:3456/

You'll notice at this point that some log outputs from `web-server` will print
fast response times in the low miliseconds range, while others will print slow
response times in the hundreds of miliseconds. That's despite the upstream
`api-server` fast responses, as queued requests on `web-server` are
synchronously blocking and delaying other requests response handling from
starting.
