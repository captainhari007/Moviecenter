// _id: "507f1f77bcf86cd799439011"  ObjectId string example

//12 bytes 

//4 bytes: timestamp
//3 bytes: machine id
//2 bytes: process id
//3 bytes: counter

//Used in MongoDB as a primary key for a collection document
//Can be generated client side or server side
//Unique across collections and databases

//In Mongoose, ObjectId is represented by the Schema.Types.ObjectId data type
//Used to create references between documents in different collections

// 1byte = 8 bits
//2 ^ 8 = 256
// 2 ^ 24 = 16,777,216