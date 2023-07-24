import { Router } from "express"
import { atualizar, cadastrar, deletar, detalhar, listar } from '../controllers/carros'

const rotas = Router()

rotas.get('/carros', listar)
rotas.get('/carros/:id', detalhar)
rotas.post('/carros/', cadastrar)
rotas.put('/carros/:id', atualizar)
rotas.delete('/carros/:id', deletar)

export default rotas