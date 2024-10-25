import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from 'hono/jwt'
import {createBlogInput ,  updateBlogInput} from "@aaqibba/common";


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>();

//middleware
async function middleware(c,next){
    const header  = c.req.header("authorization") || "";
    const token  = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
        if (user.id) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
}

blogRouter.post('/',middleware, async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    const body = await c.req.json();
    const {success } = createBlogInput.safeParse(body)
    if(!success){
        return c.json({
            message:"check your inputs"
        })
    }
    try{
        const blog = await prisma.blog.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:Number(userId)
            }
        })
        return c.json({
            msg:"blog created successfully",
            id:blog.id
        })
    }catch(err){
        return c.json({
            err
        })
    }
});//ini/create blog

blogRouter.put('/',middleware,async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const userId = c.get("userId");
    const {success } = updateBlogInput.safeParse(body)
    if(!success){
        return c.json({
            message:"check your inputs"
        })
    }
    if(!userId){
        return c.json({
            msg:"Something went wrong"
        })
    }
    try{
        const blog = await prisma.blog.update({
        where:{
            id:body.id,
            authorId:userId
        },
        data:{
            title:body.title,
            content:body.content,
        }
    });
    return c.json({
        msg:"updated successfully"
    })
}catch(err){
    return c.json({err})
}



})//update blog

blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    email:true
                }
            }
      }
    });
    if(blogs){
        return c.json({
            blogs
        })
    }else{
        c.text('no blogs present');
    }

});//get all blogs

blogRouter.get('/:id',middleware, async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id =  c.req.param("id");


    const blog= await prisma.blog.findFirst({
        where:{
            id:Number(id),
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    email:true
                }
            }
        }
    });
    if(blog){
       return c.json({blog})
    }else{
        return c.json({
            msg:"no blog with given id"
        })
    }


})//get a specific blog
