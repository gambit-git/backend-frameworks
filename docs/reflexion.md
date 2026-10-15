# Reflexión — EC1 F2 A3

Nombre: Gerard Andrei Hincapié Méndez

## 1. ¿Qué responsabilidad cumple Express y qué responsabilidad conserva el servicio?

Express se encarga de recibir las solicitudes HTTP, relacionarlas con una ruta, ejecutar los controladores y enviar una respuesta al cliente.
El servicio conserva la lógica relacionada con las tareas. Por ejemplo, crear, buscar, completar, eliminar o modificar una tarea.
De esta manera, Express se encarga de la comunicación HTTP y el servicio se encarga de las reglas del sistema.

## 2. ¿Por qué no conviene escribir toda la lógica dentro de task.routes.ts?

No conviene porque las rutas deberían encargarse solamente de relacionar una URL y un método HTTP con un controlador.
Si toda la lógica estuviera dentro de `task.routes.ts`, el archivo sería más difícil de entender y mantener.
En este proyecto las rutas llaman a los controladores, los controladores interpretan la solicitud y los servicios realizan las operaciones sobre las tareas. Esto permite tener el código mejor organizado y separar responsabilidades.

## 3. ¿Qué diferencia existe entre req.params y req.body?

`req.params` contiene los valores que vienen directamente en la URL.
Por ejemplo, en:
`GET /api/tasks/3`
el número `3` llega mediante `req.params.id`.
En cambio, `req.body` contiene los datos enviados dentro del cuerpo de la solicitud.
Por ejemplo, al crear una tarea con POST enviamos:
`{"title":"Documentar mi primera API"}
y ese título se obtiene mediante `req.body.title`.

## 4. ¿Por qué el título recibido desde un cliente se considera unknown antes de validarlo?

Se considera `unknown` porque la API no puede confiar automáticamente en los datos que envía un cliente externo.
Aunque esperamos recibir un texto, Postman u otro cliente podría enviar un número, un valor vacío u otro tipo de dato.
Por eso primero se valida que `title` sea un `string` y que no esté vacío. Solo después de hacer esa comprobación se utiliza dentro de la aplicación.

## 5. ¿Qué ventaja ofrece centralizar los errores en un middleware?

Centralizar los errores permite responder de manera uniforme sin tener que repetir el mismo manejo de errores en todos los controladores.
Por ejemplo, cuando ocurre un `AppError`, el middleware utiliza el código correspondiente, como 400 o 404, y devuelve el mensaje en formato JSON.
También permite manejar errores inesperados con un código 500 sin mostrar información interna del servidor al cliente.

## 6. ¿Cuándo debe utilizarse 201 en lugar de 200?

El código `201 Created` debe utilizarse cuando una solicitud crea correctamente un nuevo recurso.
En nuestra API se utiliza en:

`POST /api/tasks`
porque esa solicitud crea una nueva tarea.
El código `200 OK`, en cambio, se utiliza cuando una consulta o actualización se realiza correctamente, como al obtener una tarea o cambiar su estado.

## 7. ¿Por qué DELETE responde 204 sin un objeto JSON?

El código `204 No Content` significa que la solicitud se realizó correctamente pero no hay contenido que devolver en la respuesta.
En nuestra API, cuando eliminamos una tarea con:
`DELETE /api/tasks/:id`
la tarea se elimina correctamente y no es necesario enviar un objeto JSON como respuesta.
Por eso Postman muestra el código 204 pero el cuerpo de la respuesta queda vacío.

## 8. ¿Qué ocurrirá con las tareas cuando el servidor se reinicie y por qué?

Las tareas creadas, modificadas o eliminadas durante la ejecución se perderán cuando el servidor se reinicie.
Esto ocurre porque actualmente las tareas se almacenan en un arreglo en memoria.
Cuando el servidor vuelve a iniciar, el archivo de datos se carga nuevamente con las tareas iniciales.
En una actividad posterior este almacenamiento temporal será reemplazado por MongoDB Atlas.

## 9. ¿Qué archivos podrán conservarse cuando se incorpore MongoDB Atlas?

Se podrán conservar varias partes del proyecto, como los modelos, las rutas, los controladores, los middleware, `app.ts` y `server.ts`.
También podrá conservarse gran parte de la organización de la aplicación.
La parte que tendrá que cambiar principalmente será la forma en la que el servicio obtiene y almacena las tareas, porque dejará de utilizar el arreglo en memoria y empezará a trabajar con MongoDB Atlas.
Esto demuestra la ventaja de haber separado la aplicación por capas, ya que no será necesario rehacer toda la API para cambiar el sistema de almacenamiento.
