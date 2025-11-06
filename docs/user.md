# User API Spec

## Register User API

Endpoint : `POST /register`

Request Body :

```json
{
  "username": "daniel",
  "email": "daniel@gmail.com",
  "password": "daniel"
}
```

Response Body `Success` :

```json
{
  "status": "success",
  "data": {
    "id": 6,
    "username": "daniel"
  }
}
```

Response Body `Fail` :

```json
{
  "status": "fail",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Semua field wajib diisi."
  }
}
```

Response Body `Fail 2` :

```json
{
  "status": "fail",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email sudah terdaftar."
  }
}
```

## Login User API

Endpoint : `POST /login`

Request Body :

```json
{
  "email": "daniel@gmail.com",
  "password": "daniel"
}
```

Response Body `Success` :

```json
{
  "status": "success",
  "token": "ajdnakjdkjansdjansdkjan1y3187y3..."
}
```

Response Body `Fail` :

```json
{
  "status": "fail",
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Email tidak terdaftar."
  }
}
```

Response Body `Fail 2` :

```json
{
  "status": "fail",
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Email atau password yang anda masukkan salah"
  }
}
```
