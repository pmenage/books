# Question 2: Document versioning

To store the document, I would save the following in MongoDB:

```javascript
{
    documentGuid: "a13ec9fc-2b56-4028-8785-2adb50cf88da",
    metadata: {
        title: "My book",
        subtitle: "My subtitle",
        description: "My description",
        author: "Pauline Ménage",
        ...
    },
    lastVersionId: "7a54aff5-f289-4090-a3aa-cc46d1cbcfdf",
    versions: [
        {
            documentGuid: "a13ec9fc-2b56-4028-8785-2adb50cf88da",
            versionGuid: "7a54aff5-f289-4090-a3aa-cc46d1cbcfdf",
            metadata: {
                title: "My book",
                author: "Pauline Ménage",
            },
            data: "",
            createdAt: 1584135666,
            changes: [
                {
                    type: "move",
                    change: 1,
                    createdAt: 1584135618,
                },
                {
                    type: "insert",
                    change: "a string",
                    createdAt: 1584135666,
                },
            ],
        },
        ...
    ],
}
```

The document will have a guid, a current version, and its current metadata (title, subtitle, description, author, etc.). This gives us the current state of the document, and helps us access the last version easily.

Then, I would save an array of versions for the document. A version can be created every time the author clicks on "Save". Each version would have a document id, linking it to the correct book. The version would also have a version id, the current metadata, the creation date, the data and a list of changes. The data could be the text data directly, or the path to the file stored on the disk. The list of changes would contain each action done since the last version, therefore making it possible to see the changes between two versions.

With this data, you can see the document at any point in history, by finding the last version saved before that point. It is also possible to see the changes between two consecutive versions, or combine the actions to see the changes between any two versions.

Finally, every change since the last version could be saved in cache, with Redis for example. The whole text would only be saved when the user clicks on Save, and the changes in the cache would then be added to that version.



