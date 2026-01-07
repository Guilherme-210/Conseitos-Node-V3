import crypto from 'node:crypto'
import { usersData } from '../../mock/users.js'

class UsersController {
    getUsers(req, res, next) {
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

    getUser(req, res, next) {
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

    getUsersName(req, res, next) {
        const { name } = req.body

        try {
            const usersFilter = usersData.filter((u) => u.name === name)

            if (!usersFilter) {
                res.status(404).json({ error: 'Nenhum usuário foi encontrado!' })                
            }

            return res.status(200).json({
                total: usersFilter.length,
                users: usersFilter
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor!' })
        }
    }
}

export const usersController = new UsersController()