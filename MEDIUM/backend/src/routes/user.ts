import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  sign, verify } from 'hono/jwt'
import { signupInput , signinInput } from '@aaqibba/common';

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
}>()

userRouter.post('/signup',async(c) => {

    const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success } = signupInput.safeParse(body);

    if(!success){
        return c.json({
            msg:"inputs are not correct"
        })
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            email:body.email
        }
    });
    if(existingUser){
        return c.json({
            msg:"email already present please choose another email  "
        })
    }
    try{
        const user =  await prisma.user.create({
        data:{
            email:body.email,
            password:body.password
        }
    });
    const token  = await sign({id:user.id},c.env.JWT_SECRET)

	return c.json({jwt:token})
}
catch(error){
    return c.json({
        msg:error
    })
}

})


userRouter.post("/signin",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body =await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
        return c.json({
            msg:"please check your inputs"
        })
    }

    const user = await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    });

    if(!user ){
        return c.json({
            msg:"wrong credentials"
        })
    }
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({
        jwt:token
    })
});
