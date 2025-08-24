import prisma from '../prisma.js';

const register = async (email, password, username) => {
    return prisma.user.create({
        data:{
            email: email,
            password: password,
            username: username
        }
    })
}

export default register;