
const todoRoutes = (app, fs) => {

    // variables
    const dataPath = './data/todos.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/todos', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/todos', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newTodoId = Date.now().toString();

            // add the new todo
            data[newTodoId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new todo added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/todos/:id', (req, res) => {

        readFile(data => {

            // add the new todo
            const todoId = req.params["id"];
            data[todoId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`todos id:${todoId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/todos/:id', (req, res) => {

        readFile(data => {

            // delete the todo
            const todoId = req.params["id"];
            delete data[todoId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`todos id:${todoId} removed`);
            });
        },
            true);
    });
};

module.exports = todoRoutes;