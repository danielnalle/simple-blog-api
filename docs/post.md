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
