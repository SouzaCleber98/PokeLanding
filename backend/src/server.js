import app from './app.js';
const PORT = process.env.PORT || 3000;
// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na PORTa ${PORT}`);
});