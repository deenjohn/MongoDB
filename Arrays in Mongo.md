https://docs.mongodb.com/manual/tutorial/query-arrays/#read-operations-arrays
https://docs.mongodb.com/manual/tutorial/query-array-of-documents/
https://docs.mongodb.com/manual/tutorial/query-embedded-documents/

https://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
https://docs.mongodb.com/manual/reference/method/db.getCollection/


## Insert

```
db.inventory.insert([
   { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
   { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
   { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
   { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
   { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
]);

```
## Find

```
db.documents.find() ;

```

#### Match an Array

```
 
 The following example queries for all documents where the field tags 
 value is an array with exactly two elements, "red" and "blank", in the specified order:

 db.inventory.find( { tags: ["red", "blank"] } );
{ "_id" : ObjectId("59de257479e16efcabea38f9"), "item" : "notebook", "qty" : 50, "tags" :
 [ "red", "blank" ], "dim_cm" : [ 14, 21 ] }
 
 
 If, instead, you wish to find an array that contains both the elements "red" and "blank", 
 without regard to order or other elements in the array, use the $all operator:
 
 db.inventory.find( { tags: { $all: ["red", "blank"] } } )
 
 { "_id" : ObjectId("59de257479e16efcabea38f8"), "item" : "journal", "qty" : 25, "tags" :
[ "blank", "red" ], "dim_cm" : [ 14, 21 ] }
{ "_id" : ObjectId("59de257479e16efcabea38f9"), "item" : "notebook", "qty" : 50, "tags" :
 [ "red", "blank" ], "dim_cm" : [ 14, 21 ] }
{ "_id" : ObjectId("59de257479e16efcabea38fa"), "item" : "paper", "qty" : 100, "tags" : [
 "red", "blank", "plain" ], "dim_cm" : [ 14, 21 ] }
{ "_id" : ObjectId("59de257479e16efcabea38fb"), "item" : "planner", "qty" : 75, "tags" :
[ "blank", "red" ], "dim_cm" : [ 22.85, 30 ] }




The following example queries for all documents where tags is an array that contains the string "red" as one of its elements:


db.inventory.find( { tags: "red" } )

To specify conditions on the elements in the array field, use query operators in the query filter document:

{ <array field>: { <operator1>: <value1>, ... } }



ex : { dim_cm: { $gt: 25 } }

ex 2 : { dim_cm: { $gt: 15, $lt: 20 } } //satisfy both

Use $elemMatch operator to specify multiple criteria on the elements of an array such 
that at least one array element satisfies all the specified criteria.

db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

Query for an Element by the Array Index Position

db.inventory.find( { "dim_cm.1": { $gt: 25 } } )



```









