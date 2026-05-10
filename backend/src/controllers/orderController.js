const db = require("../models/db");

const createOrder = async (req, res) => {
  const { usuario_id, total_pedido, forma_pagamento, itens } = req.body;

  if (!itens || itens.length === 0) {
    return res.status(400).json({ message: "O carrinho está vazio." });
  }

  const connection = await db.getConnection(); // É pego uma conexão para a transação

  try {
    await connection.beginTransaction();

    const [pedidoResult] = await connection.execute(
      "INSERT INTO pedidos (usuario_id, total_pedido, forma_pagamento, status_pedido) VALUES (?, ?, ?, 'Pendente')",
      [usuario_id, total_pedido, forma_pagamento],
    );

    const pedidoId = pedidoResult.insertId;

    // Criar queries de inserção para cada item do carrinho
    const queriesItens = itens.map((item) => {
      return connection.execute(
        "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)",
        [pedidoId, item.id, item.qtd, item.preco],
      );
    });

    await Promise.all(queriesItens);

    // Se tudo deu certo, confirma as alterações no banco
    await connection.commit();

    res.status(201).json({
      message: "Pedido realizado com sucesso!",
      pedidoId: pedidoId,
    });
  } catch (error) {
    // Se algo falhou, desfaz tudo o que foi feito nessa tentativa
    await connection.rollback();
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ message: "Erro ao processar o pedido." });
  } finally {
    connection.release(); // Libera a conexão de volta para o pool
  }
};

module.exports = { createOrder };
