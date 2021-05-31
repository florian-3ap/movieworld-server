# Movieworld Server

REST API Server to load, like and unlike movies.

# API

### Response Schema

```
{
  status: number
  payload: any
}
```

***

### Description

Store movie as liked in the database.

`POST /movie/:movieId/like`

### Status Codes

- 200: Like is stored in DB
- 500: Error

***

### Description

Unlikes the movie.

`DELETE /movie/:movieId/like`

### Response

- 200: Like is deleted in DB
- 500: Error

***

### Description

Loading all liked movies.

`GET /likes`

### Response

- 200: Returns a list of liked movies
- 500: Error

***

### Description

Check if specific movie is liked.

`GET /movie/:movieId`

### Response

- 204: Movie is liked
- 404: Movie is not liked
