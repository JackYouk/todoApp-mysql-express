const router = require('express').Router();
const connection = require('../../../db/connection');


router.get('/', async (req, res) => {
    try{
        const getAllTodos = 'SELECT * FROM todos;'
        const [todos] = await connection.query(getAllTodos);
        console.log(todos);
        res.json(todos);
    }catch(e){
        console.log(e);
        res.json(e);
    }
});

router.post('/', async (req, res) => {
    const {todo} = req.body;

    if(todo.trim().length === 0){
        return res.status(400).json({error: 'Todo must be valid'});
    }

    const insertTodoQuery = 'INSERT INTO todos (todo) VALUES(?);';
    const getTodoById = 'SELECT * FROM todos WHERE id = ?;'
    try{
        const [queryResult] = await connection.query(insertTodoQuery, [todo]);
        const [todos] = await connection.query(getTodoById, [queryResult.insertId])
        res.json(todos);
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:todoId', async (req, res) => {
    const {todoId} = req.params;

    const getTodoById = 'SELECT * FROM todos WHERE id = ?;'
    const deleteTodoById = 'DELETE FROM todos WHERE id = ?;';

    try{
        const [todos] = await connection.query(getTodoById, todoId);

        if(todos.length === 0){
            return res.status(404).json({error: 'TodoId not found'});
        }

        await connection.query(deleteTodoById, todoId);

        res.json(todos[0]);
    }catch(err){
        res.status(500).json({err});
    }
})

router.patch('/:todoId', async (req, res) => {
    const {todo} = req.body;
    const {todoId} = req.params;

    if(todo.trim().length === 0){
        return res.status(400).json({error: 'Todo must be provided'});
    }

    const updateTodoById = 'UPDATE todos SET todo = ? WHERE id = ?;'

    try{
        await connection.query(updateTodoById, [todo, todoId]);
        const getTodoById = 'SELECT * FROM todos WHERE id = ?;'
        const [todos] = await connection.query(getTodoById, todoId);
        res.json(todos[0]);
    }catch(err){
        res.status(500).json({err});
    }
})



module.exports = router;