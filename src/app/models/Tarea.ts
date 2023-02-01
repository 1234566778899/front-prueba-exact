import { Estado } from './Estado';
export interface Tarea {
    id: number,
    descripcion: string,
    estado: Estado,
    opcion?: boolean
}
