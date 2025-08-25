import register from "../models/userModel.js";

const userRegister = async (req, res) => {
    const{email, password, username} = req.body;
    try {
        const newUser = await register({email,password,username});

        res.status(201).json({user: newUser, message:"criado com sucesso!"});

    } catch (error) {

        res.status(500).json({ error: error, message: "erro ao criar usuário" });

    }
}

export default userRegister;