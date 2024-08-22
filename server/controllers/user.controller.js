import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json({
    users,
  });

  try {
  } catch (error) {
    res.status(500).json({
      Message: "failed to  get user !",
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params.id;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      Message: "failed to get user",
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({
      message: "Not Authorized",
    });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && avatar),
      },
    });

    res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      Message: "failed to update user",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({
      message: "Not Authorized",
    });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({
      message: "User Deleted !!",
    });
  } catch (error) {
    res.status(500).json({
      Message: "failed to get user",
    });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  console.log(`postId : ${postId} & token : ${tokenUserId}`);

  try {
    const savedPost = await prisma.savedPost.findFirst({
      where: {
        userId: tokenUserId,
        postId: postId,
      },
    });

    if (savedPost) {
      console.log(`Entering if block - post already saved`);

      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });

      return res.status(200).json({
        message: "Post removed from saved list",
      });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId: postId,
        },
      });

      return res.status(200).json({
        message: "Post saved",
      });
    }
  } catch (error) {
    console.error("Error in savePost:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getProfilePost = async (req, res) => {
  const tokenUserId = req.params.userId;
  

  try {
    // Fetch all posts created by the user
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });

    console.log(userPosts);
    

    // Fetch all posts saved by the user
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true, 
      },
    });

    console.log(saved);


    
    const savedPost = saved.map((item) => item.post);
    console.log(savePost);
    

    return res.status(200).json({
      userPosts,
      savedPost,
    });
  } catch (error) {
    console.error("Error in getProfilePost:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
