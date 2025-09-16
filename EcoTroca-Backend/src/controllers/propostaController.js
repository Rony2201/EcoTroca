import prisma from '../prisma.js';

export const enviarProposta = async (req, res) => {
  try {
    const { productId } = req.body;
    const proposerId = req.params.id;
    
    const proposta = await prisma.tradeOffer.create({
      data: {
        productId: Number(productId),
        proposerId: Number(proposerId)
      },
    });

    return res.status(201).json({ message: 'Proposta enviada com sucesso!', proposta });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao enviar proposta', details: error.message });
  }
};