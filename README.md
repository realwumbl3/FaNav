FaNav adds previous, next page, favorite and unfavorite hotkeys to furaffinity along with gallery layout fixes.

Customize user effects for specific users by renaming mydata_template.js to mydata.js and adding user data to the object.

``` // mydata.js
    {
        username: { // username of the user 
            excluded: true, // block user submissions
            note: "enter notes here", // notes about the user
            superwatch: false, // puts their submissions at the top of the gallery
        },
    }
```

TODO: 
Blur submissions from certain users.
Sync hidden users.
Superwatch grid.