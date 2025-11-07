# Comment API Spec

## Create Comment

Endpoint : `POST /posts/:id/comments`

Request Body :

```json
{
  "content": "Ini adalah komentar untuk yang ketiga kalinya dari user_id 3 di postingan dengan id 2"
}
```

Response Body `Success` :

```json
{
  "status": "success",
  "data": {
    "id": 6,
    "content": "Ini adalah komentar untuk yang ketiga kalinya dari user_id 3 di postingan dengan id 2",
    "created_at": "2025-11-06T12:37:05.689Z",
    "author_id": 3,
    "author_username": "daniel"
  }
}
```

Response Body `Fail`:

```json
{
  "status": "fail",
  "error": {
    "code": "INVALID_INPUT",
    "message": "ID Post harus berupa angka."
  }
}
```

Response Body `Fail 2`:

```json
{
  "status": "fail",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Komentar tidak boleh kosong"
  }
}
```

Response Body `Fail 3`:

```json
{
  "status": "fail",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Postingan dengan ID 7 tidak ditemukan."
  }
}
```

## Delete A Comment

Endpoint : `DELETE /comments/:id`

Response Body `Success` :

```json
{}
```

Response Body `Fail` :

```json
{
  "status": "fail",
  "error": {
    "code": "INVALID_INPUT",
    "message": "ID Comment harus berupa angka."
  }
}
```

Response Body `Fail 2` :

```json
{
  "status": "fail",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Komentar dengan ID 11 tidak ditemukan atau Anda tidak memiliki akses."
  }
}
```

Response Body `Fail 3` :

```json
{
  "status": "fail",
  "error": {
    "code": "FORBIDDEN",
    "message": "Anda tidak memiliki izin untuk menghapus komentar ini."
  }
}
```
