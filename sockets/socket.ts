import socketIO from 'socket.io';

export const desconectar = (cliente: socketIO.Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
}

export const mensaje = (cliente: socketIO.Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
    console.log('Mensaje recibido: ', payload);

    io.emit('mensaje-nuevo', payload);
  });
}