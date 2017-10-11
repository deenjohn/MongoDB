

https://docs.mongodb.com/manual/reference/method/db.collection.update/
https://docs.mongodb.com/manual/reference/method/db.collection.update/#update-parameter

https://www.tutorialspoint.com/mongodb/mongodb_update_document.htm

The following operation uses:

the $inc operator to increment the stock field; and
the $set operator to replace the value of the item field, the publisher field in the info 
embedded document, the tags field, and the second element in the ratings array


db.books.update(
   { _id: 1 },
   {
     $inc: { stock: 5 },
     $set: {
       item: "ABC123",
       "info.publisher": "2222",
       tags: [ "software" ],
       "ratings.1": { by: "xyz", rating: 3 }
     }
   }
)


