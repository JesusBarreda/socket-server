import socketIO from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';

export const usuariosConectados = new UsuariosLista();

export const conectarUsuario = (cliente: socketIO.Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);              
}

export const desconectar = (cliente: socketIO.Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
    usuariosConectados.borrarUsuario(cliente.id);
  });
}

export const mensaje = (cliente: socketIO.Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
    console.log('Mensaje recibido: ', payload);

    io.emit('mensaje-nuevo', payload);
  });
}

export const configurarUsuario = (cliente: socketIO.Socket) => {
  cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
    usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre} configurado`
    });
  });
}