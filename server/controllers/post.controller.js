import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

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
      where: { id },
      include:{
        postDetail : true,
        user: {
          select:{
            username : true,
            avatar: true
          }
        }
      }
    });

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
        ...body.postData,  // Spreading the postData fields into the create data
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,  // Creating related postDetail
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
        message:"post deleted !!"
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to create Post !! ",
    });
  }
};
