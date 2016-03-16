# Service Worker

## Introduction
You want to make service calls in a multi-window web application, but you don't
want to make lots of redundant requests in each window. Satellite attempts to
solve this problem by implementing a shared worker that makes the requests and
shares the responses across windows. Communication with workers is asynchronous,
but so are HTTP requests, so your application code really can't tell the
difference (except now it can leverage the promises returned by satellite).

### Pain Points
- Need to share data between windows
- Redundant service calls
- No service calls on close
- Slow data updates

### Features
- Instant data updates
- API definition for endpoints
- Batching service calls
- Caching common calls
- Make service calls on close
- Refresh data on regular intervals
- Paged data

## Usage
Import Satellite as a module (AMD, CommonJS, and ES6 support) and use it as:

    satellite({
        name: 'best.service.ever',
        path: '/path/to/best/${arg1}/service/${arg2}/ever'
    });

This registers a service endpoint under a given name, available later as:

    bestPromiseEver = satellite.best.service.ever({
        arg1: 'foo',
        arg2: 'bar'
    });

Where `bestPromiseEver` resolves with the result of the request.

Calling `satellite()` with no arguments will return an object describing all
currently registered services.
