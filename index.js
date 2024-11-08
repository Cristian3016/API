// Importa Express y la lista de libros.
const express = require('express');
const { json } = express;
const libros = require('./libros');

// Configura la aplicación y el puerto.
const app = express();
const port = 3000;

// Middleware para analizar cuerpos JSON.
app.use(json());

// Ruta para obtener todos los libros.
app.get('/libros', (req, res) => {
    res.json({ message: 'Lista de libros obtenida con éxito', libros });
});

// Ruta para obtener un libro por ID.
app.get('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(libro);
});

// Ruta para añadir un nuevo libro.
app.post('/libros', (req, res) => {
    const { titulo, autor, anioPublicacion, genero } = req.body;

    if (!titulo || !autor || !anioPublicacion || !genero) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoLibro = {
        id: libros.length + 1,
        titulo,
        autor,
        anioPublicacion,
        genero: {
            id: genero.id || libros.length + 1,
            nombre: genero.nombre,
            codigo: genero.codigo,
        }
    };

    libros.push(nuevoLibro);
    res.status(201).json({ message: 'Libro añadido con éxito', libro: nuevoLibro });
});

// Ruta para actualizar un libro por ID.
app.put('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const { titulo, autor, anioPublicacion, genero } = req.body;
    libro.titulo = titulo || libro.titulo;
    libro.autor = autor || libro.autor;
    libro.anioPublicacion = anioPublicacion || libro.anioPublicacion;
    libro.genero = genero || libro.genero;

    res.json({ message: 'Libro actualizado con éxito', libro });
});

// Ruta para eliminar un libro por ID.
app.delete('/libros/:id', (req, res) => {
    const index = libros.findIndex(l => l.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const libroEliminado = libros.splice(index, 1);
    res.status(200).json({ message: 'Libro eliminado con éxito', libro: libroEliminado });
});

// Inicia el servidor en el puerto especificado.
app.listen(port, () => console.log(`Aplicación ejecutándose en http://localhost:${port}`));

