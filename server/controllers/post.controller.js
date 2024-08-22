import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const { city, type, property, bedroom, minPrice, maxPrice } = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city,
        type: type,
        property: property,
        bedroom: bedroom ? parseInt(bedroom) : undefined,
        price: {
          gte: minPrice ? parseInt(minPrice) : undefined,
          lte: maxPrice ? parseInt(maxPrice) : undefined,
        },
      },
    });

    res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
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

    let userId;
    const token = req.cookies?.token;
    

    if (!token) {
      userId = null;
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          userId = null;
        } else {
          userId = payload.id;
        }
      });
    }

    const saved = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          postId: id,
          userId,
        },
      },
    });

    res.status(200).json({
      ...post,
      isSaved: saved ? true : false,
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
