import prisma from "../prisma.js";

export const enviarProposta = async (req, res) => {
  const { productId, mensagem } = req.body;
  const proposerId = req.params.id;

  if (!productId || !mensagem) {
    return res
      .status(400)
      .json({ error: "Os campos productId e mensagem são obrigatórios." });
  }

  try {
    //Verificar se o dono do produto é o mesmo que está propondo
    const product = await prisma.product.findUnique({
      where: { id_product: Number(productId) },
      select: { ownerId: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    if (product.ownerId === Number(proposerId)) {
      return res.status(400).json({
        error: "Você não pode fazer uma proposta para um produto que já é seu.",
      });
    }

    const proposta = await prisma.tradeOffer.create({
      data: {
        productId: Number(productId),
        proposerId: Number(proposerId),
        messages: {
          create: {
            content: mensagem,
            authorId: Number(proposerId),
          },
        },
      },
      include: {
        messages: true,
      },
    });

    return res
      .status(201)
      .json({ message: "Proposta enviada com sucesso!", proposta });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Você já enviou uma proposta para este produto." });
    }
    console.error("Erro ao enviar proposta:", error);
    return res
      .status(500)
      .json({ error: "Erro ao enviar proposta", details: error.message });
  }
};

export const getReceivedProposals = async (req, res) => {
  try {
    const { userId } = req.params;

    const ownedProducts = await prisma.product.findMany({
      where: {
        ownerId: Number(userId),
      },
      select: {
        id_product: true,
      },
    });

    if (ownedProducts.length === 0) {
      return res.status(200).json([]);
    }

    const ownedProductIds = ownedProducts.map((p) => p.id_product);

    const receivedProposals = await prisma.tradeOffer.findMany({
      where: {
        productId: {
          in: ownedProductIds,
        },
      },
      include: {
        proposer: { select: { id: true, username: true } },
        product: { select: { id_product: true, title: true, ownerId: true } },
        messages: {
          include: {
            author: { select: { id: true, username: true } },
          },
          orderBy: { sentAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(receivedProposals);
  } catch (error) {
    console.error("Erro ao buscar propostas recebidas:", error);
    return res.status(500).json({
      error: "Erro ao buscar propostas recebidas",
      details: error.message,
    });
  }
};

export const getSentProposals = async (req, res) => {
  try {
    const { userId } = req.params;

    const sentProposals = await prisma.tradeOffer.findMany({
      where: {
        proposerId: Number(userId),
      },
      include: {
        proposer: { select: { id: true, username: true } },
        product: { select: { id_product: true, title: true, ownerId: true } },
        messages: {
          include: {
            author: { select: { id: true, username: true } },
          },
          orderBy: { sentAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(sentProposals);
  } catch (error) {
    console.error("Erro ao buscar propostas enviadas:", error);
    return res.status(500).json({
      error: "Erro ao buscar propostas enviadas",
      details: error.message,
    });
  }
};
