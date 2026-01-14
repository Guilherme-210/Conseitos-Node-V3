import crypto from 'node:crypto'
import { usersData } from '../../mock/users.js'

class UsersController {
    getUsers(req, res) {
        const { role } = req.query

        try {
            let userFilter = usersData.filter((u) => u.role === 'user')

            if (role) {
                if (role !== "user" && role !== "admin") {
                    return res.status(400).json({
                        error: 'Dados enviados não conferem',
                        menssagem: 'As roles existentes são "user" ou "admin".'
                    })
                }
            
                userFilter = usersData.filter((u) => u.role === role)
            }
            
            return res.json(userFilter)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor! ' })
        }
    }

    getUser(req, res) {
        const { id } = req.params

        try {
            const userFilter = usersData.find((u) => u.id === id)

            if (!userFilter) {
                res.status(404).json({ error: 'Usuário não encontrado!' })                
            }

            return res.status(200).json(userFilter)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor! ' })
        }
    }

    postUser(req, res) {
        const { name, email, password } = req.body

        try {            
            const newUser = {
                id: crypto.randomUUID(),
                role: "user",
                name,
                email,
                password
            }

            usersData.push(newUser)

            return res.status(200).json({ exito: `O usuario ${name} foi criado` })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor!' })
        }
    }

    putUser(req, res) {
        const { id } = req.params
        const { name, email, password, role } = req.body

        try {
            const index = usersData.findIndex((u) => u.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            }

            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Os campos "name", "email" e "password" são obrigatórios' })
            }

            const newRole = role ?? usersData[index].role
            if (newRole !== 'user' && newRole !== 'admin') {
                return res.status(400).json({ error: 'O campo "role" deve ser "user" ou "admin"' })
            }

            usersData[index] = {
                id: usersData[index].id,
                role: newRole,
                name,
                email,
                password
            }

            return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', user: usersData[index] })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor!' })
        }
    }

    patchUser(req, res) {
        const { id } = req.params
        const updates = req.body

        try {
            const index = usersData.findIndex((u) => u.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            }

            if (updates.role && updates.role !== 'user' && updates.role !== 'admin') {
                return res.status(400).json({ error: 'O campo "role" deve ser "user" ou "admin"' })
            }

            Object.assign(usersData[index], updates)

            return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', user: usersData[index] })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor!' })
        }
    }

    deleteUser(req, res) {
        const { id } = req.params

        try {
            const index = usersData.findIndex((u) => u.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            }

            usersData.splice(index, 1)

            return res.status(200).json({ mensagem: 'Usuário excluído com sucesso' })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor!' })
        }
    }
}

export const usersController = new UsersController()
