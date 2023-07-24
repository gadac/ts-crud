import { Request, Response } from 'express'
import { knex } from '../connection/db'
import { Carro } from '../types/index'
import { Knex } from 'knex'

export const listar = async (req: Request, res: Response) => {
    try {        
        const lista = await knex<Carro>('carros')
        return res.json(lista)        
    } catch (error){
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor'})
    }
}

export const detalhar = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const carro = await knex<Carro>('carros').where({id: Number(id)}).first()
        
        if(!carro){
            return res.status(404).json({mensagem: 'Carro não encontrado'})
        }

        return res.json(carro)
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor'})
    }
}

export const cadastrar = async (req: Request, res: Response) => {
    const { marca, modelo, cor, ano, valor } = req.body
    try {
        const carro = await knex<Omit<Carro, 'id'>>('carros').insert({
            marca, 
            modelo, 
            cor, 
            ano, 
            valor
        }).returning('*')

        return res.status(201).json(carro[0])
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor'})
    }

}

export const atualizar = async (req: Request, res: Response) => {
    const { marca, modelo, cor, ano, valor } = req.body
    const { id } = req.params
    try {

        const carro = await knex<Carro>('carros').where({id: Number(id)}).first()
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado.'})
        }

        await knex('carros').update({
            marca, 
            modelo, 
            cor, 
            ano, 
            valor
        }).where({id: Number(id)})

        return res.status(204).send()
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor'})
    }
}

export const deletar = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const carro = await knex<Carro>('carros').where({id: Number(id)}).first()
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado.'})
        }

        await knex<Carro>('carros').del().where({id: Number(id)})

        return res.status(204).send()

    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor'})
    }
}