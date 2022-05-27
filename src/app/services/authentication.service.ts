import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  // Register user
  async register (email: string, password: string) {
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(email.trim(), password.trim());
    } catch(error) {
      console.log("Rergister error: ", error);
      return null;
    }
  }

  // Login user
  async login (email: string, password: string) {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Login error: ", error);
      return null;
    }
  }

  // Login user with google
  async loginGoogle (email: string, password: string) {
    try {
      return await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Login google error: ", error);
      return null;
    }
  }

  // <<User Data>>
  // Usuario logueado
  getLoggedUser () {
    return this.angularFireAuth.authState;
  }
  // Id del usuario
  getUserId () {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const userId = user.uid;
      return userId;
    } else {
      return null;
    }
  }
  // Nombre del usaurio
  getUserName () {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const userName = user.displayName;
      return userName;
    } else {
      return null;
    }
  }
  // Foto del usuario
  getUserPic(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const userPhoto = user.photoURL;
      return userPhoto;
    } else {
      return null;
    }
  }
  // Cerrar sesión
  logOut(){
    this.angularFireAuth.signOut();
  }
}
