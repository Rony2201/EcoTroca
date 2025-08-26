import prisma from '../prisma.js';

const register = async (data) => {
    return prisma.users.create({
        data
    })
}

export default register;