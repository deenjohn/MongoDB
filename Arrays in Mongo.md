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


https://docs.mongodb.com/manual/reference/operator/projection/positional/index.html#project-array-values
https://www.tutorialspoint.com/mongodb/mongodb_projection.htm
https://docs.mongodb.com/v3.2/tutorial/project-fields-from-query-results/


Project Array Values



db.students.insert( [
{ "_id" : 1, "semester" : 1, "grades" : [ 70, 87, 90 ] },
{ "_id" : 2, "semester" : 1, "grades" : [ 90, 88, 92 ] },
{ "_id" : 3, "semester" : 1, "grades" : [ 85, 100, 90 ] } ,
{ "_id" : 4, "semester" : 2, "grades" : [ 79, 85, 80 ] } ,
{ "_id" : 5, "semester" : 2, "grades" : [ 88, 88, 92 ] },
{ "_id" : 6, "semester" : 2, "grades" : [ 95, 90, 96 ] } 

]);

> db.students.find( { semester: 1, grades: { $gte: 85 } });

{ "_id" : 1, "semester" : 1, "grades" : [ 70, 87, 90 ] }
{ "_id" : 2, "semester" : 1, "grades" : [ 90, 88, 92 ] }
{ "_id" : 3, "semester" : 1, "grades" : [ 85, 100, 90 ] }



 the projection { "grades.$": 1 } returns only the first
 element greater than or equal to 85 for the grades field.


db.students.find( { semester: 1, grades: { $gte: 85 } },
                  { "grades.$": 1 } )


db.inventory.find( { semester: 1, grades: { $gte: 85 } },
                  { "grades.$": 1 } );

{ "_id" : 1, "grades" : [ 87 ] }
{ "_id" : 2, "grades" : [ 90 ] }
{ "_id" : 3, "grades" : [ 85 ] }

















