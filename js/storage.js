/**
 * Almacenamiento de los dumplings guardados.
 * Usa IndexedDB con fallback a localStorage.
 *
 * Item: { id, config, name, created }
 *   - config: la config completa (color, eyes, mouth, blush, accessories, box, boxColor, name)
 */

const DB_NAME = 'mi-dumpling';
const STORE = 'dumplings';
const VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export class Storage {
  async list() {
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      return this._lsList();
    }
  }

  async save(config) {
    const item = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      config: { ...config },
      created: new Date().toISOString(),
    };
    try {
      const db = await openDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put(item);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      return item;
    } catch (err) {
      this._lsSave(item);
      return item;
    }
  }

  async remove(id) {
    try {
      const db = await openDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      this._lsRemove(id);
    }
  }

  /* ----- Fallback localStorage ----- */
  _lsList() {
    try { return JSON.parse(localStorage.getItem('mi-dumpling-list') || '[]'); }
    catch { return []; }
  }
  _lsSave(item) {
    const items = this._lsList();
    items.push(item);
    localStorage.setItem('mi-dumpling-list', JSON.stringify(items));
  }
  _lsRemove(id) {
    const items = this._lsList().filter(i => i.id !== id);
    localStorage.setItem('mi-dumpling-list', JSON.stringify(items));
  }
}
