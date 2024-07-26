import bcrypt from "bcrypt"


export  const register = async (req, res) => {
    const {username , email , password} =  req.body
 
    if (!username || !email || !password) {
      return   res.status(400).json({
            message: 'Please provide all required fields'
        })
            
        
        
    }

    try {

        const hashedPassword =  await bcrypt.hash(password , 10);
        console.log(hashedPassword);
        
    } catch (error) {
        return   res.status(500).json({
            message: 'internal server error'
        })
        
    }






}

export  const login = (req, res) => {

    
}

export  const logout = (req, res) => {

    
}