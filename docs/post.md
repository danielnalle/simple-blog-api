# Post API Spec

## Create Post

Endpoint : `POST /posts`

Request Body :

```json
{
  "title": "Judul Postingan",
  "content": "Isi dari postingan atau deskripsi"
}
```

Response Body `Success` :

```json
{
  "status": "success",
  "data": {
    "id": 6,
    "title": "Judul Postingan",
    "content": "Isi dari postingan atau deskripsi",
    "user_id": 2,
    "created_at": "2025-11-06T12:37:05.689Z",
    "updated_at": "2025-11-06T12:37:05.689Z"
  }
}
```

Response Body `Fail`:

```json
{
  "status": "fail",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Judul dan konten tidak boleh kosong"
  }
}
```

## Get All Posts

Endpoint : `GET /posts`

Without Request Param :

```json
{
  "status": "success",
  "metadata": {
    "totalItems": 3,
    "totalPages": 1,
    "currentPage": 1,
    "itemsPerPage": 10
  },
  "data": [
    {
      "id": 6,
      "title": "Judul Postingan",
      "created_at": "2025-11-06T12:37:05.689Z",
      "author_username": "daniel"
    },
    {
      "id": 3,
      "title": "Postingan ketiga",
      "created_at": "2025-11-03T11:44:51.419Z",
      "author_username": "budi"
    },
    {
      "id": 2,
      "title": "Postingan kedua",
      "created_at": "2025-11-03T11:31:06.576Z",
      "author_username": "eko"
    }
  ]
}
```

With Request Param `limit=2` :

```json
{
  "status": "success",
  "metadata": {
    "totalItems": 3,
    "totalPages": 2,
    "currentPage": 1,
    "itemsPerPage": 2
  },
  "data": [
    {
      "id": 6,
      "title": "Judul Postingan",
      "created_at": "2025-11-06T12:37:05.689Z",
      "author_username": "daniel"
    },
    {
      "id": 3,
      "title": "Postingan ketiga",
      "created_at": "2025-11-03T11:44:51.419Z",
      "author_username": "budi"
    }
  ]
}
```

With Request Param `limit=2` & `page=2` :

```json
{
  "status": "success",
  "metadata": {
    "totalItems": 3,
    "totalPages": 2,
    "currentPage": 2,
    "itemsPerPage": 2
  },
  "data": [
    {
      "id": 2,
      "title": "Postingan kedua",
      "created_at": "2025-11-03T11:31:06.576Z",
      "author_username": "eko"
    }
  ]
}
```

## Get Single Post

Endpoint : `GET /posts/:id`

Response Body `Success` :

```json
{
  "status": "success",
  "data": {
    "id": 3,
    "title": "Postingan ketiga",
    "content": "Ini postingan ketiga yang dibuat oleh user_id 2",
    "created_at": "2025-11-03T11:44:51.419Z",
    "updated_at": "2025-11-03T11:44:51.419Z",
    "author": {
      "id": 2,
      "username": "daniel"
    }
  }
}
```

Response Body `Fail` :

```json
{
  "status": "fail",
  "error": {
    "code": "INVALID_INPUT",
    "message": "ID Post harus berupa angka."
  }
}
```

Response Body `Fail 2` :

```json
{
  "status": "fail",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Postingan dengan ID 10 tidak ditemukan."
  }
}
```

## Update A Post

Endpoint : `PUT /posts/:id`

Request Body :

```json
{
  "title": "Postingan pertama (updated1)",
  "content": "Ini postingan pertama yang dibuat oleh user_id 3 (updated1)"
}
```

Response Body `Success` :

```json
{
  "title": "Postingan pertama (updated)",
  "content": "Ini postingan pertama yang dibuat oleh user_id 3 (updated)",
  "updated_at": "2025-11-03T11:44:51.419Z"
}
```

Response Body `Fail` :

```json
{
  "status": "fail",
  "error": {
    "code": "INVALID_INPUT",
    "message": "ID Post harus berupa angka."
  }
}
```

Response Body `Fail 2` :

```json
{
  "status": "fail",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Judul dan konten tidak boleh kosong"
  }
}
```

Response Body `Fail 3` :

```json
{
  "status": "fail",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Postingan dengan ID 10 tidak ditemukan atau Anda tidak memiliki akses."
  }
}
```
