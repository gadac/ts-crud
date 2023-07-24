"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletar = exports.atualizar = exports.cadastrar = exports.detalhar = exports.listar = void 0;
const db_1 = require("../connection/db");
const listar = async (req, res) => {
    try {
        const lista = await (0, db_1.knex)('carros');
        return res.json(lista);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.listar = listar;
const detalhar = async (req, res) => {
    const { id } = req.params;
    try {
        const carro = await (0, db_1.knex)('carros').where({ id: Number(id) }).first();
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' });
        }
        return res.json(carro);
    }
    catch (_a) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.detalhar = detalhar;
const cadastrar = async (req, res) => {
    const { marca, modelo, cor, ano, valor } = req.body;
    try {
        const carro = await (0, db_1.knex)('carros').insert({
            marca,
            modelo,
            cor,
            ano,
            valor
        }).returning('*');
        return res.status(201).json(carro[0]);
    }
    catch (_a) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.cadastrar = cadastrar;
const atualizar = async (req, res) => {
    const { marca, modelo, cor, ano, valor } = req.body;
    const { id } = req.params;
    try {
        const carro = await (0, db_1.knex)('carros').where({ id: Number(id) }).first();
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado.' });
        }
        await (0, db_1.knex)('carros').update({
            marca,
            modelo,
            cor,
            ano,
            valor
        }).where({ id: Number(id) });
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.atualizar = atualizar;
const deletar = async (req, res) => {
    const { id } = req.params;
    try {
        const carro = await (0, db_1.knex)('carros').where({ id: Number(id) }).first();
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado.' });
        }
        await (0, db_1.knex)('carros').del().where({ id: Number(id) });
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.deletar = deletar;
