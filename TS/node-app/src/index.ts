// interface user {
//     name:string,
//     age:number
// }


// function getAge(user1:user,user2:user){
//  return user1.age+user2.age
// }


// const result =getAge({
//     name:"aaqib",
//     age:21
// },{
//     name:"sahil",
//     age:10
// })
// console.log(result);


//!PICK

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     createdAt: Date;
//   }

//   // For a profile display, only pick `name` and `email`
//   type UserProfile = Pick<User, 'name' | 'email'>;

//   const displayUserProfile = (user: UserProfile) => {
//     console.log(`Name: ${user.name}, Email: ${user.email}`);
//   };

//!Partial


// interface user{
//     id:number,
//     name:string,
//     email:string,
//     password:string
// }

// type updatedProps = Pick<user,'name'|'email'>;

// type updatedPropsOptional  = Partial<updatedProps>;

// function updateUser(updatedProps: updatedPropsOptional) {
//     // hit the database tp update the user
// }
// updateUser({})

//!READONLY

// interface Config {
//     readonly endpoint: string;
//     readonly apiKey: string;
//   }

//   const user:Config={
//     endpoint:'hely@gmail.com',
//     apiKey:"heyllo2343"
//   }

//   const config: Readonly<Config> = {
//     endpoint: 'https://api.example.com',
//     apiKey: 'abcdef123456',
//   };
//!records
// interface User {
//     id: string;
//     name: string;
//   }

//   type Users = { [key: string]: User };

//   const users: Users = {
//     'abc123': { id: 'abc123', name: 'John Doe' },
//     'xyz789': { id: 'xyz789', name: 'Jane Doe' },
//   };

//   interface User {
//     id: string;
//     name: string;
//   }

//   type Users = Record<string, User>;

//   const users: Users = {
//     'abc123': { id: 'abc123', name: 'John Doe' },
//     'xyz789': { id: 'xyz789', name: 'Jane Doe' },
//   };

//   console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }


//!Maps

// interface User {
//     id: string;
//     name: string;
//   }

//   // Initialize an empty Map
//   const usersMap = new Map<string, User>();

//   // Add users to the map using .set
//   usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
//   usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

//   // Accessing a value using .get
//   console.log(usersMap.get('xyz789')); // Output: { id: 'abc123', name: 'John Doe' }

//?for js only
// const usersMap2 = new Map()
// usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
// usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });
// console.log(usersMap.get('abc123'));

//!exclude
// type Event1 = 'click' | 'scroll' | 'mousemove';
// type ExcludeEvent = Exclude<Event1, 'scroll'>; // 'click' | 'mousemove'

// const handleEvent = (event: ExcludeEvent) => {
//   console.log(`Handling event: ${event}`);
// };

// handleEvent('click'); // OK

//! type inference

// import { z } from 'zod';
// import express from "express";

// const app = express();

// // Define the schema for profile update
// const userProfileSchema = z.object({
//   name: z.string().min(1, { message: "Name cannot be empty" }),
//   email: z.string().email({ message: "Invalid email format" }),
//   age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
// });

// app.put("/user", (req, res) => {
//   const { success } = userProfileSchema.safeParse(req.body);
//   const updateBody = req.body; // how to assign a type to updateBody?

//   if (!success) {
//     res.status(411).json({});
//     return
//   }
//   // update database here
//   res.json({
//     message: "User updated"
//   })
// });

// app.listen(3000);
