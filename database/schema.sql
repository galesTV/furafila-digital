CREATE DATABASE IF NOT EXISTS furafila_digital;
USE furafila_digital;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS itens_pedido, pedidos, produtos, usuarios;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    id_escola VARCHAR(20) NOT NULL,
    serie VARCHAR(50),
    preferencia_alimentar VARCHAR(50),
    saldo_carteira DECIMAL(10, 2) DEFAULT 0.00,
    tipo_perfil ENUM('aluno', 'admin') NOT NULL
);

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria ENUM('Salgados', 'Doces', 'Bebidas') NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total_pedido DECIMAL(10, 2) NOT NULL,
    forma_pagamento ENUM('Carteira', 'PIX') NOT NULL,
    status_pedido ENUM('Pendente', 'Preparando', 'Pronto', 'Entregue', 'Atrasado') DEFAULT 'Pendente',
    codigo_qr VARCHAR(255), 
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
);

CREATE TABLE itens_pedido (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (produto_id) REFERENCES produtos(id_produto)
);
