import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query =  req.query;


  try {
    const posts = await prisma.post.findMany({
      where:{
        city:query.city || undefined,
        type:query.type || undefined,
        property:query.property || undefined,
        bedroom:parseInt(bedroom) || undefined,
        price:{
          gte: parseInt(query.minPrice) || 0,
          lte:parseInt(query.maxPrice) || 100000
        }
      }
    });

    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  
  try {
    const post = await prisma.post.findUnique({
      where: { id :  id },
      include: {
        postDetails: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    console.log(post);
    
    res.status(200).json({
      post,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get post",
    });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData, 
        userId: tokenUserId,
        postDetails: {
          create: body.postDetail, 
        },
      },
    });

    res.status(200).json({
      newPost,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create Post !! ",
    });
  }
};

export const updatePost = (req, res) => {
  console.log("working");
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({
        message: "unauthorized",
      });
    }
    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({
      message: "post deleted !!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create Post !! ",
    });
  }
};
