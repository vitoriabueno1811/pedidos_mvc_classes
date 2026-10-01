const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../dados/itens.json');

const lerDados = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const salvarDados = (dados) => {
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
};

const calcularSubtotal = (item) => ({
  ...item,
  subtotal: item.preco * item.quantidade
});
exports.listar = (req, res) => {
  const itens = lerDados().map(calcularSubtotal);
  res.json(itens);
};
exports.buscarPorId = (req, res) => {
  const itens = lerDados();
  const id = Number(req.params.id);
  const item = itens.find(i => Number(i.id) === id);

  if (!item) return res.status(404).json({ mensagem: 'Item não encontrado' });

  res.json(calcularSubtotal(item));
};
exports.criar = (req, res) => {
  const itens = lerDados();
  const novoItem = { id: Date.now(), ...req.body };

  itens.push(novoItem);
  salvarDados(itens);

  res.status(201).json(calcularSubtotal(novoItem));
};
exports.alterar = (req, res) => {
  const itens = lerDados();
  const id = Number(req.params.id);
  const itemExiste = itens.some(i => Number(i.id) === id);

  if (!itemExiste) return res.status(404).json({ mensagem: 'Item não encontrado' });

  let itemAtualizado;
  const novosItens = itens.map(i => {
    if (Number(i.id) === id) {
      itemAtualizado = { ...i, ...req.body };
      return itemAtualizado;
    }
    return i;
  });

  salvarDados(novosItens);
  res.json(calcularSubtotal(itemAtualizado));
};
exports.excluir = (req, res) => {
  const itens = lerDados();
  const id = Number(req.params.id);
  const itemExiste = itens.some(i => Number(i.id) === id);

  if (!itemExiste) return res.status(404).json({ mensagem: 'Item não encontrado' });

  const itensFiltrados = itens.filter(i => Number(i.id) !== id);
  salvarDados(itensFiltrados);

  res.json({ mensagem: 'Item removido com sucesso' });
};