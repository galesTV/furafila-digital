const db = require("../models/db");

const createOrder = async (req, res) => {
  const { usuario_id, total_pedido, forma_pagamento, itens } = req.body;

  if (!usuario_id) {
    return res.status(400).json({ message: "ID do usuário não fornecido." });
  }

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
      const produtoId = item.id || item.id_produto;

      if (!produtoId) {
        throw new Error(`O item ${item.nome} está sem ID de produto.`);
      }

      return connection.execute(
        "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)",
        [pedidoId, produtoId, item.qtd, item.preco],
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

const getOrdersByUser = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const [pedidos] = await db.execute(
      "SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY data_pedido DESC",
      [usuario_id],
    );

    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    res.status(500).json({ message: "Erro ao buscar histórico de pedidos." });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const [pedidos] = await db.execute(`
      SELECT p.*, u.nome as nome_usuario 
      FROM pedidos p 
      JOIN usuarios u ON p.usuario_id = u.id_usuario 
      WHERE p.status_pedido IN ('Pendente', 'Preparando')
      ORDER BY p.data_pedido ASC
    `);

    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const [itens] = await db.execute(
          `
            SELECT ip.*, p.nome 
            FROM itens_pedido ip 
            JOIN produtos p ON ip.produto_id = p.id_produto 
            WHERE ip.pedido_id = ?
          `,
          [pedido.id_pedido],
        );

        return { ...pedido, itens };
      }),
    );

    res.status(200).json(pedidosComItens);
  } catch (error) {
    console.error("Erro ao buscar pedidos ativos:", error);
    res.status(500).json({ message: "Erro ao carregar painel." });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id_pedido, novo_status } = req.body;

  try {
    await db.execute(
      "UPDATE pedidos SET status_pedido = ? WHERE id_pedido = ?",
      [novo_status, id_pedido],
    );
    res.status(200).json({ message: "Status atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    res.status(500).json({ message: "Erro ao atualizar pedido." });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus,
};
