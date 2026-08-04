import { prisma } from "../prisma/prisma.js"

export const listTasks = async (req, res) => {
    const userId = req.session.userId;

    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId
            }
        });

        return res.status(200).json(tasks);

    } catch (error) {
        return res.status(500).json({
            erro: 'Error listing tasks.'
        });
    }
};

export const createTask = async (req, res) => {
    const { titulo } = req.body;
    const userId = req.session.userId;

    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({
            erro: "Title is required."
        });
    }

    try {

        const task = await prisma.task.create({
            data: {
                titulo,
                status: 0,
                userId
            }
        });

        return res.status(201).json(task);
        
    } catch (error) {
        return res.status(500).json({
            erro: 'Error creating task.'
        });
    }
};

export const completeTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (isNaN(Number(id))) {
        return res.status(400).json({
            erro: "Invalid id."
        });
    }

    try {
        const task = await prisma.task.findFirst({
            where: {
                id: Number(id),
                userId
            }
        });

        if (!task) {
            return res.status(404).json({
                erro: "Task not found."
            });
        }

        await prisma.task.update({
            where: {
                id: Number(id)
            },
            data: {
                status: 1
            }
        });

        return res.status(200).json({
            success: 'Task complete'
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Error completing task.'
        });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (isNaN(Number(id))) {
        return res.status(400).json({
            erro: "Invalid id."
        });
    }

    try {
        const task = await prisma.task.findFirst({
            where: {
                id: Number(id),
                userId
            }
        });

        if (!task) {
            return res.status(404).json({
                erro: "Task not found."
            });
        }
        
        await prisma.task.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({
            success: 'Task deleted'
        });

    } catch (error) {
        return res.status(500).json({
            erro: 'Error deleting task.'
        });
    }
};