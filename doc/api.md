> Sample for get collections result

```
{
    "success": true,
    "data": {
        "collections": {
            "5df5533c9a2f48293c99afde": {
                "restaurants": [
                    "5df0f57efe9773b24e74bf40"
                ],
                "collaborations": [
                    "5df6614022eb0971498f3b6c"
                ],
                "_id": "5df5533c9a2f48293c99afde",
                "name": "My 5 stars",
                "owner_email": "skborey@gmail.com"
            },
            "5df553709a2f48293c99afdf": {
                "restaurants": [],
                "collaborations": [],
                "_id": "5df553709a2f48293c99afdf",
                "name": "The weekend favorite",
                "owner_email": "skborey@gmail.com"
            }
        },
        "restaurants": {
            "5df0f57efe9773b24e74bf40": {
                "_id": "5df0f57efe9773b24e74bf40",
                "name": "Osakaya Restaurant",
                "hours": "Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm"
            }
        },
        "collaborations": {
            "5df6614022eb0971498f3b6c": {
                "_id": "5df6614022eb0971498f3b6c",
                "name": "Borey",
                "email": "skborey@mailsac.com"
            }
        }
    }
}
```

> PUT /api/v1/collections

```
{
	"name": "test collection",
	"owner_id": "skborey@gmail.com"
}
```

> POST api/v1/collaborations/rename

``
{
	"new_name": "sok borey",
	"id": "5df67c454cd22d3ac5125f1f"
}
``