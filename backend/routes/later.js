export async function auth(params) {
  /** auth.js
   * POST /api/register – új felhasználó regisztrációja (név, jelszó)
   * POST /api/login – belépés (név, jelszó)
   */
}

export async function mindenki(params) {
  /**
   * o Visszaad: authenticated (true/false), isAdmin (true/false)
   * • GET /api/products – snackek listázása (mindenkinek)
   */
}

export async function user(params) {
  /**
   * Visszaad: authenticated (true/false), isAdmin (true/false)
   * POST /api/order – rendelés leadása (felhasználó, kosár tartalom)
   * ___  GET /api/products – snackek listázása (mindenkinek)
   */
}

export async function admin(params) {
  /**
   * Visszaad: authenticated (true/false), isAdmin (true/false)
   * POST /api/products – új termék (csak admin)
   * PUT /api/products/:id – termék módosítása (csak admin)
   * DELETE /api/products/:id – törlés (csak admin)
   * ___ POST /api/order – rendelés leadása (felhasználó, kosár tartalom)
   * ___ GET /api/products – snackek listázása (mindenkinek)
   *
   * Ellenőrzi a készletet, csökkenti azt, eltárolja a rendelést.
   * GET /api/orders – rendeléslista (csak admin)
   */
}
