import { Injectable } from '@angular/core';
import { Foto } from '../modelli/foto';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor() { }

  foto: Foto [] = [
    {percorso: '../../assets/ShopFoto/Acavallo Louvre.jpg',nome: 'Acavallo Louvre'},
    {percorso: '../../assets/ShopFoto/Acavallo Modigliani.jpg',nome: 'Acavallo Modigliani'},
    {percorso: '../../assets/ShopFoto/Arco Evolution Alupro.jpg',nome: 'Arco Evolution Alupro'},
    {percorso: '../../assets/ShopFoto/Champion Class.jpg',nome: 'Champion Class'},
    {percorso: '../../assets/ShopFoto/Equestro Sagomato.jpg',nome: 'Equestro Sagomato'},
    {percorso: '../../assets/ShopFoto/Equipe Easy.jpg',nome: 'Equipe Easy'},
    {percorso: '../../assets/ShopFoto/Equipe Emporio.jpg',nome: 'Equipe Emporio'},
    {percorso: '../../assets/ShopFoto/Equipe Expression Special.jpg',nome: 'Equipe Expression Special'},
    {percorso: '../../assets/ShopFoto/Equipe Monostaffili Pelle.jpg',nome: 'Equipe Monostaffili Pelle'},
    {percorso: '../../assets/ShopFoto/Equipe Paratendine.jpg',nome: 'Equipe Paratendine'},
    {percorso: '../../assets/ShopFoto/Equipe Platinum DaVinci.jpg',nome: 'Equipe Platinum DaVinci'},
    {percorso: '../../assets/ShopFoto/Equipe Staffili Emporio.jpg',nome: 'Equipe Staffili Emporio'},
    {percorso: '../../assets/ShopFoto/EquiTime Comfort.jpg',nome: 'EquiTime Comfort'},
    {percorso: '../../assets/ShopFoto/EquiTime Monostaffili Pelle.jpg',nome: 'EquiTime Monostaffili Pelle'},
    {percorso: '../../assets/ShopFoto/FreeJump Pro +.jpg',nome: 'FreeJump Pro +'},
    {percorso: '../../assets/ShopFoto/Kep Italia Jokey Carbon.jpg',nome: 'Kep Italia Jokey Carbon'},
    {percorso: '../../assets/ShopFoto/Kris Rubber Reins.jpg',nome: 'Kris Rubber Reins'},
    {percorso: '../../assets/ShopFoto/Loire Classic SCC White.jpg',nome: 'Loire Classic SCC White'},
    {percorso: '../../assets/ShopFoto/Norton Montone Sintetico.jpg',nome: 'Norton Montone Sintetico'},
    {percorso: '../../assets/ShopFoto/Sarm Hippique C.jpg',nome: 'Sarm Hippique C'},
    {percorso: '../../assets/ShopFoto/Sarm Hippique.jpg',nome: 'Sarm Hippique'},
    {percorso: '../../assets/ShopFoto/Supreme Y.jpg',nome: 'Supreme Y'},
    {percorso: '../../assets/ShopFoto/Veredus Carbon Gel.png',nome: 'Veredus Carbon Gel'},
    {percorso: '../../assets/ShopFoto/Veredus Kevlar.jpg',nome: 'Veredus Kevlar'},
  ]
    
  getPercorso(nome: string): string | undefined {
    const fotoCorrispondente = this.foto.find(foto => foto.nome === nome);
    return fotoCorrispondente ? fotoCorrispondente.percorso : undefined;
}
}
