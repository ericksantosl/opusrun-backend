import bcrypt from 'bcrypt';
import { prisma } from '../prisma/prisma.js';

export const register = async (req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            erro: 'Nome é obrigatório.'
        });
    }

    if (!email || email.trim() === '') {
        return res.status(400).json({
            erro: 'Email é obrigatório.'
        });
    }

    if (!senha) {
        return res.status(400).json({
            erro: 'Senha é obrigatória.'
        });
    }

    if (senha.length < 6) {
        return res.status(400).json({
            erro: 'A senha deve possuir pelo menos 6 caracteres.'
        });
    }

    if (senha !== confirmarSenha) {
        return res.status(400).json({
            erro: 'As senhas não coincidem.'
        });
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (userExists) {
            return res.status(400).json({
                erro: 'Não foi possível realizar o cadastro.'
            })
        }

        const senhaHash = await bcrypt.hash(senha, 10)

        const user = await prisma.user.create({
            data: {
                nome,
                email,
                senha: senhaHash
            }
        })

        return res.status(201).json({
            success: 'Usuário criado com sucesso.',
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao criar o usuário'
        })
    }

}

export const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || email.trim() === '') {
        return res.status(400).json({
            erro: 'Email é obrigatório.'
        })
    }

    if (!senha) {
        return res.status(400).json({
            erro: 'Senha é obrigatória.'
        });
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(401).json({
                erro: 'Credenciais inválidas.'
            });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({
                erro: 'Credenciais inválidas'
            });
        }

        req.session.userId = user.id;
        req.session.userName = user.nome;

        return res.status(200).json({
            success: 'Login realizado com sucesso.',
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao realizar login'
        })
    }
}

export const logout = (req, res) => {
    req.session.destroy();
    res.json({
        mensagem: 'Logout realizado'
    });
}