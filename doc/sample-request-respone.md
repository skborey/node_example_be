> get restaurants

```
{
	"email": "skborey@gmail.com",
	"password": "skborey"
	
}
```

```
{
    "success": true,
    "restaurants": {
        "5dff5f3e062a0c9057a043d3": {
            "_id": "5dff5f3e062a0c9057a043d3",
            "name": "Kushi Tsuru",
            "open": "Mon-Sun 11:30 am - 9 pm"
        },
        "5dff5f3e062a0c9057a043d4": {
            "_id": "5dff5f3e062a0c9057a043d4",
            "name": "The Stinking Rose",
            "open": "Mon-Thu, Sun 11:30 am - 10 pm  / Fri-Sat 11:30 am - 11 pm"
        },
        "5dff5f3e062a0c9057a043d5": {
            "_id": "5dff5f3e062a0c9057a043d5",
            "name": "McCormick & Kuleto's",
            "open": "Mon-Thu, Sun 11:30 am - 10 pm  / Fri-Sat 11:30 am - 11 pm"
        },
        "5dff5f3e062a0c9057a043d6": {
            "_id": "5dff5f3e062a0c9057a043d6",
            "name": "Mifune Restaurant",
            "open": "Mon-Sun 11 am - 10 pm"
        },
        "5dff5f3e062a0c9057a043d7": {
            "_id": "5dff5f3e062a0c9057a043d7",
            "name": "Osakaya Restaurant",
            "open": "Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm"
        },
        "5dff5f3e062a0c9057a043d8": {
            "_id": "5dff5f3e062a0c9057a043d8",
            "name": "The Cheesecake Factory",
            "open": "Mon-Thu 11 am - 11 pm  / Fri-Sat 11 am - 12:30 am  / Sun 10 am - 11 pm"
        },
        "5dff5f3e062a0c9057a043d9": {
            "_id": "5dff5f3e062a0c9057a043d9",
            "name": "New Delhi Indian Restaurant",
            "open": "Mon-Sat 11:30 am - 10 pm  / Sun 5:30 pm - 10 pm"
        },
        "5dff5f3e062a0c9057a043da": {
            "_id": "5dff5f3e062a0c9057a043da",
            "name": "Iroha Restaurant",
            "open": "Mon-Thu, Sun 11:30 am - 9:30 pm  / Fri-Sat 11:30 am - 10 pm"
        },
        "5dff5f3e062a0c9057a043db": {
            "_id": "5dff5f3e062a0c9057a043db",
            "name": "Rose Pistola",
            "open": "Mon-Thu 11:30 am - 10 pm  / Fri-Sun 11:30 am - 11 pm"
        },
        "5dff5f3e062a0c9057a043dc": {
            "_id": "5dff5f3e062a0c9057a043dc",
            "name": "Alioto's Restaurant",
            "open": "Mon-Sun 11 am - 11 pm"
        }
    }
}
```

> add new collection

```
{
	"name": "First collection"
	
}
```

```
{
    "success": true,
    "collection": {
        "_id": "5dff6ab62b0bb61141d24127",
        "name": "First collection",
        "owner_email": "skborey@gmail.com",
        "__v": 0
    },
    "message": "New collection added successfully."
}
```

> Delete a collection, DELETE http://localhost:3001/api/v1/collections/5dff6ab62b0bb61141d24127

```
{
    "success": true,
    "message": "Collection is removed successfully."
}
```

> Add collaborator to collection

```
{
	"name": "First collection",
	"email": "skborey@gamil.com",
	"collection_id": "5dff6dd373605d12ad432532"
}
```

```
{
    "success": true,
    "collaborator": {
        "_id": "5dff8dce2bd13417471fbc83",
        "name": "First collection",
        "email": "skborey@gamil.com"
    },
    "relationC2C": [
        "5dff6dd373605d12ad432532",
        "5dff8dce2bd13417471fbc83"
    ],
    "message": "Add new collaboration successfully. Next request add to collection."
}
```