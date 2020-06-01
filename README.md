# YTPM

YTPM provides a player which can be controlled by multiple users to provide music for gatherings.

This project is in three parts:

* A NodeJS-based server for managing users, and orchestrating queues
* An Angular-based mobile client for interacting with the player
* A raw javascript client for displaying the player

## Startup

Navigate to `/player` on the player device.

Once loaded, the player will trigger the server to create a queue and associate it with a 5-character pre-shared key. This code is then displayed on the player, along with a QR Code which links to the 'connect' page, with the key pre-filled.

## Adding to queue

Videos can be added to the queue by searching, adding from a pre-determined discovery list or by YouTube video id.

## AutoQueue

YTPM maintains an AutoQueue which is used to pick songs to play once the user-added queue is empty. The AutoQueue scores related songs to each song which plays, based on how closely YouTube considers the videos to be to the song that is currently playing.

Videos are excluded from the AutoQueue if YouTube doesn't consider them to be music, or if they are longer than 10 minutes long.
