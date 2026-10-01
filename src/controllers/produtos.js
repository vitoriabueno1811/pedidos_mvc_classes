const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../dados/produtos.json');

const lerDados = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const salvarDados = (dados) => {
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
};

exports.alterar = (req, res) => {
  const produtos = lerDados();
  const id = parseInt(req.params.id);
  const produtoExiste = produtos.some(p => p.id === id);

  if (!produtoExiste) return res.status(404).json({ mensagem: 'Produto não encontrado' });

  let produtoAtualizado;
  const novosProdutos = produtos.map(p => {
    if (p.id === id) {
      produtoAtualizado = { ...p, ...req.body };
      return produtoAtualizado;
    }
    return p;
  });

  salvarDados(novosProdutos);
  res.json(produtoAtualizado);
};

exports.excluir = (req, res) => {
  const produtos = lerDados();
  const id = parseInt(req.params.id);
  const produtoExiste = produtos.some(p => p.id === id);

  if (!produtoExiste) return res.status(404).json({ mensagem: 'Produto não encontrado' });

  const produtosFiltrados = produtos.filter(p => p.id !== id);
  salvarDados(produtosFiltrados);

  res.json({ mensagem: 'Produto removido com sucesso' });
};