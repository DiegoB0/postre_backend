export enum CurrentPermissions {
  /*
   * Permissions for postre admins
   */
  // Api keys
  CreateApiKey = 'create-api-key',
  DeleteApiKey = 'delete-api-key',

  // Usuarios
  CreateUser = 'create-user',
  ListUser = 'list-user',
  DeleteUser = 'delete-user',
  UpdateUser = 'update-user',

  // Configuraciones
  CreateConfig = 'create-config',
  ListConfig = 'list-config',
  DeleteConfig = 'delete-config',
  UpdateConfig = 'update-config',

  // Restaurantes
  CreateRestaurant = 'create-restaurant',
  ListRestaurant = 'list-restaurant',
  DeleteRestaurant = 'delete-restaurant',
  UpdateRestaurant = 'update-restaurant',

  /*
   * Permissions for restaurant owners and pos admins
   */

  // Employees. Types of users (punto-venta-admin, mesero)

  // Puntos de venta
  CreatePuntoDeVenta = 'create-punto-venta',
  ListPuntoDeVenta = 'list-punto-venta',
  DeletePuntoDeVenta = 'delete-punto-venta',
  UpdatePuntoDeVenta = 'update-punto-venta',

  // Productos
  CreateProductos = 'create-product',
  ListProducts = 'list-product',
  DeleteProduct = 'delete-product',
  UpdateProduct = 'update-product',

  /*
   * Permissions for waiters
   */

  // Mesas
  CreateMesa = 'create-mesas',
  ListMesa = 'list-mesa',
  DeleteMesa = 'delete-mesa',
  UpdateMesa = 'update-mesa',

  // Cuentas
  CreateCuenta = 'create-cuenta',
  ListCuenta = 'list-cuenta',
  DeleteCuenta = 'delete-cuenta',
  UpdateCuenta = 'update-cuenta',
}
