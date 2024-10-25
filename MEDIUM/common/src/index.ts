import zod  from "zod";

export const signupInput = zod.object({
    email:zod.string().email(),
    password:zod.string().min(4),
    name:zod.string().optional()
});
export type SignupInput = zod.infer<typeof signupInput>

export const signinInput = zod.object({
    email:zod.string().email(),
    password:zod.string().min(4)
});

export type SigninInput = zod.infer<typeof signinInput>

export const createBlogInput = zod.object({
    title: zod.string(),
    content: zod.string(),
});

export type CreateBlogInput = zod.infer<typeof createBlogInput>

export const updateBlogInput = zod.object({
    title: zod.string(),
    content: zod.string(),
    id: zod.number()
});

export type UpdateBlogInput = zod.infer<typeof updateBlogInput>
