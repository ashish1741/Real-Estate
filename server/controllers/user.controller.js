import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  console.log(`it's works`);

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
  console.log(`id is ${id}`);

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    console.log(user);
    
    

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
  const { password,avatar, ...inputs } =  req.body;

  console.log(id , tokenUserId);
  

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

    console.log(updatedUser);

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
        where:{id}
    })
    res.status(200).json({
        message:"User Deleted !!"
    })


  } catch (error) {
    res.status(500).json({
      Message: "failed to get user",
    });
  }
};
