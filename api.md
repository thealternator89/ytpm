# API Definition

## Authentication

All clients must authenticate to manipulate the queue.

If authentication is successful, a token is returned, otherwise a `401 'Unauthorized'` response.

* Endpoint: `/api/auth`
* Query Parameters:
    * `auth` - The Pre-Shared Key (code displayed on the player)
    * `name` - The name the user wants to be known as

## Enqueue

This allows a user to add an item to the queue

* Endpoint: `/api/enqueue`
* Query Parameters:
    * `token` - the token returned by `/api/auth`
    * `videoId` - the ID of the video to add to the queue (note this is not validated)
    * `next` [optional] - add the song to the front of the queue by adding `next=true`.  
    Any other value for `next` (including `True`) is considered false.
    * `noinfluence` [optional] [future] - prevent this song influencing automatic selection of songs  
    Any other value for `noinfluence` (including `True`) is considered false.

## Dequeue

This allows a user to remove an item (at any position) from the queue.

Currently this allows any user to remove any item, however restrictions (only able to remove items enqueued by the same user) may be introduced at some point.

* Endpoint: `/api/dequeue`
* Query Parameters:
    * `token` - the token returned by `/api/auth`
    * `videoId` - the ID of the video to remove from the queue

## Queue State

This allows a user to see what items are currently in the play queue.

* Endpoint: `/api/queue_list`
* Query Parameters:
    * `token` - the token returned by `/api/auth`