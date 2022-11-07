# CRUD MOVIE API

## Routes

<br>

```javascript
Movie {
  id: number
  title: string,
  year: string,
  releaseDate: string,
  storyline: string,
  actors: string[],
  imdbRating: string,
}
```

```javascript
METHOD | ENDPOINT | RETURNS;
```

```javascript
GET /movies -> Movie[]
```

> returns all movie list

<br>

```javascript
POST /movies -> Movies[]
```

> requires body to be a Movie{}

> pushes Movie{} to database

> if exists returns status 400

<br>

```javascript
POST /rating -> Movies[]
```

> requires id from query

> updates rating from id

> if not exists returns status 400

<br>

```javascript
PUT /movies -> Movie[]
```

> requires body to be a Movie{}

> pushes Movie{} to database

> if exists updates replaces the new values from object

<br>

```javascript
DELETE /movies -> Movie[]
```

> requires body to be a Movie{}

> pushes Movie{} to database

> if exists updates replaces the new values from object
