import prisma from '../prisma.js';

const register = async (data) => {
    return prisma.user.create({
        data
    })
}

export default register;