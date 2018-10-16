# API Definition

# Public APIs

### Authentication

All clients must authenticate to receive a token to further engage with the API.

* Endpoint: `/api/auth`
* Query Parameters:
    * `auth` - The Pre-Shared Key (code displayed on the player)
    * `name` - The name the user wants to be known as
* Response: An auth token to use for future interactions
* Errors:
    * `400: Invalid Request` - required parameter(s) not found
    * `401: Unauthorized` - Pre-Shared Key not provided or invalid

**Note:** You must provide the token in the same format as it was provided to you.  
Removing the hyphens may prevent it being validated correctly.

### Enqueue

This allows a user to add an item to the queue.

* Endpoint: `/api/enqueue`
* Query Parameters:
    * `token` - the token returned by `/api/auth`
    * `videoId` - the ID of the video to add to the queue (note this is not validated)
    * `next` \[optional] - add the song to the front of the queue by adding `next=true`.  
    Any other value for `next` (including `True`) is considered false.
    * `noinfluence` \[optional] - prevent this song influencing automatic selection of songs  
    Any other value for `noinfluence` (including `True`) is considered false.
* Response: An object containing the following:
    * `videoId` - the ID of the video added (the one passed in)
    * `queuePosition` - and its position in the queue (1-based - _will be `1` if it will play next_)
* Errors:
    * `401: Unauthorized` - Token not provided or invalid

### Dequeue

This allows a user to remove an item (at any position) from the queue.

* Endpoint: `/api/dequeue`
* Query Parameters:
    * `token` - the token returned by `/api/auth`
    * `videoId` - the ID of the video to remove from the queue
* Response: 
* Errors:
    * `401: Unauthorized` - Token not provided or invalid
    * `400: Item not in queue` - Attempted to remove the item, but it wasn't found
    * `400: Dequeue failed` - Failed to remove the item. Likely the user didn't own it.  
    Further information is available in the response.

### Queue List

This allows a user to see what items are currently in the play queue.

* Endpoint: `/api/queue_list`
* Query Parameters:
    * `token` - the token returned by `/api/auth`
* Response: An array of objects representing the queue. Currently:
    * `videoId` - The ID of the video
    * `title` - The video title
    * `thumbnailUrl` - Url to a thumbnail image
    * `channelName` - The name of the channel which uploaded the video
    * `user` - The name of the user who added the item to the queue
* Errors:
    * `401: Unauthorized` - Token not provided or invalid

### Search

This allows a user to search for videos to add to the queue.

* Endpoint: `/api/search`
* Query Parameters:
    * `token` - the token returned by `/api/auth`
    * `q` - the search query
* Response: An array of objects representing the search results:
    * `videoId` - The ID of the video
    * `title` - The title of the video
    * `channelName` - The name of the channel hosting the video
    * `thumbnailUrl` - The URL to a thumbnail of the video
* Errors:
    * `401: Unauthorized` - Token not provided or invalid

### Queue State

This allows an app to check the state of the queue, as well as whether there is anything available to play (auto-play).

* Endpoint: `/api/poll`
* Query Parameters:
    * `key` - the key of the queue to query. this is the Pre-Shared key used to authenticate users
* Response: A JSON object containing:
    * `itemsAvailableToPlay` - A boolean value of whether the server can provide a video if requested (queued or auto-played)
    * `queueLength` - A number showing the number of items in the queue

## Internal APIs

### Queue States

This allows an administrator to check how many queues exist, how many songs are queued, and when they were last touched.

* Endpoint: `/api/internal/queue_states`
* Query Parameters:
    * `token` - the token returned by `/api/auth`
* Response: An array of objects representing each player queue
* Errors:
    * `401: Unauthorized` - Token not provided or invalid

### Clean Queues

This allows an administrator to clean all queues which haven't been touched in a while and are likely dead.

* Endpoint: `/api/internal/clean_queues`
* Query Parameters:
    * `token` - the token returned by `/api/auth`
* Response: A JSON object containing the number of cleaned queues
* Errors:
    * `401: Unauthorized` - Token not provided or invalid