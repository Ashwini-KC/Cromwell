//To validate login
export const loginInputValidation = (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email){
            throw new Error("Email is required.");
        }

        if(!password){
            throw new Error('Password is required');
        }
       
    } catch (e) {
        return res.status(400).json({
            error: {
                message: e.message
            }
        });
    }
    next();
}
//To validate Register
export const registerValidation = (req,res,next) =>{
    try{
        const {name, email, password,confirmPassword} = req.body;

        if(!name){
            throw new Error("FullName is required.");
        }
        if(!email){
            throw new Error("Email is required.");
        }
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            throw new Error('Invalid Email format');
        }

        if(password.length < 8){
            throw new Error('Password too short');
        }
        if(!/(?=.*[A-Z])/.test(password)){
            throw new Error('Password must contain one Uppercase Letter');
        }

        if(!/(?=.*[a-z])/.test(password)){
            throw new Error('Password must contain atleast one Lowercase Letter');
        }
        if(!/(?=.*\d)/.test(password)){
            throw new Error('Password must contain atleast one digit');
        }
        if(!/(?=.*[@$!%*?&])/.test(password)){
            throw new Error('Password must contain one special character');
        }

        if(!(password === confirmPassword)){
            throw new Error('Passwords do not match');
        }



    }catch (e) {
        return res.status(400).json({
            error: {
                message: e.message
            }
        });
    }
    next();
}

