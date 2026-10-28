# Requerimientos de negocio

## Requerimientos opcionales implementados

Se han implementado todos los requerimentos obligatorios según las instrucciones del reto. También todos los Extras:

- Poder seleccionar múltiples items para poder borrarlos a la vez.
- Que el usuario pueda eliminar elementos de la lista haciendo doble click sobre el ítem que se desea eliminar.
- Permitir al usuario deshacer, como mínimo, el último cambio realizado.
  Se ha creado un historial de cambios ilimitado, que permite al usuario deshacer todos sus cambios en esta sesión.
- Realizada implementación en Vanilla JS.

## Funciones, escenarios y flujos

- El enunciado especifica que las cadenas de texto deben tener al menos 1 carácter de longitud.
  Al no especificarse un límite de máximo de caracteres, se opta por limitarlo a 1000 carácteres por motivos de escabilidad;
  y pensando en la defición de este campo en un modelo de base de datos.
- El botón de añadir una nueva cadena de texto lanza un error que muestra en la interfaz cuando el contenido del input es 0.
  Si el contenido supera los 1000 caracteres, también muestra un mensaje de error al usuario, explicándole la regla de validación.
- Con el objetivo de simplificar, se ha implementado la función de borrado tal y como se especificaba en el enunciado.
  Sin embargo, en un proyecto real sería recomendable añadir un mensaje de confirmación cuando el usuario hace doble click en una cadena de texto, pues podría no ser obvio que esa acción provoca el borrado de datos.
  En todo caso, al disponer de una función de deshacer, se reduce el riesgo de que el usuario pierda datos accidentalmente.
- Si se han borrado todos los elementos de la lista, se muestra un mensaje dentro del componente de "No saved items found".

## Diseño de la interfaz de usuario

- Se añade un scroll vertical cuando la lista de cadenas de texto supera la altura especificada por el diseño,
  pues se asume que es una altura fija.
- Se adapta el diseño para que sea responsive en pantallas de móvil o tablet.
- Se han mantenido los mismos textos "This is a technical proof" y el "lorem ipsum" de las etiquetas de la página que aparecía en los diseños. Alternativamente, podríamos por ejemplo substituir el "lorem ipsum" por instrucciones de como eliminar una cadena de texto.
- El modal puede cerrarse con Escape o al pulsar fuera del panel.
  Al abrirse enfoca el campo y, al cerrarse, devuelve el foco al botón que lo abrió.

## Internacionalización

- Se asume que la aplicación solo necesita mostrarse en un único lenguaje: inglés.
- Por simplificar, en esta prueba se han mantenido las etiquetas directamente entre los tags de html.
- En el mundo real, si nos anticiparamos y supiéramos que la aplicación deberá mostrarse en diferentes idiomas en un futuro, ya comenzaríamos a crear ficheros json u objetos js que contuvieran las etiquetas traducibles, de manera que más adelante nos fuera sencillo integrar un sistema de internacionalización que tradujera las etiquetas de texto.

## Accesibilidad

- Uso de `aria-labels` en componentes interaccionables que describan la acción que realizan.
- Uso de html tags descriptivos que orienten sobre la disposición de elementos en la página.
- Herramientas como Google Lighthouse permiten realizar un informe de la accesibilidad de la aplicación y detectar mejoras.

# Requerimientos técnicos

## Estructura del proyecto

- Se estructura el proyecto como un monorepo que incluye ambas soluciones requeridas: Vanilla Js y React.
- Se utiliza vite para simplificar el desarrollo y el scaffolding del proyecto.

## Persistencia de datos

- No se implementa Backend al no ser parte del enunciado.
- En la solución de React se guardan los datos en el estado, sin persistir entre diferentes sesiones del usuario.
  Se toma esta decisión al no especificarse en el enunciado que se requiera ese tipo de persistencia
  (por ejemplo: persistir los datos cuando se recarga la página).
- En la solución de Vanilla JS se persisten los datos en memoria, como hace React.
- Si quisiéramos persistir datos entre sesiones sin tener una Base de Datos,
  podríamos por ejemplo guardarlos en el storage del navegador.

## Arquitectura Frontend

- Se utiliza JavaScript en ambas pruebas,
  pero en un proyecto real recomendaría utilizar Typescript por sus múltiples beneficios tales como el tipado de variables.
- En la prueba de React, usamos JSDoc junto con `@ts-check` para definir
  y comprobar los tipos de los props y otras variables de los componentes sin dejar de usar JavaScript.
- En la prueba de Vanilla JS se opta por no usar `@ts-check` para respetar la limitación de solo usar JavaScript puro.

- Se utiliza `tailwind.css` para los estilos.
  Ya que el enunciado no especifica una solución concreta,
  hemos optado por usar un framework ampliamente usado en el ecosistema frontend.

- Los estilos están duplicados, pues son los mismos para cada prueba (Vanilla Js y React),
  aunque implementados en diferentes componentes.
  Se decide mantenerlos independientes para que las pruebas sean complementamente independientes entre sí,
  pues al ser dos soluciones diferentes para los mismos requerimientos, no necesitarán convivir en un proyecto real.
- Si ambas pruebas tuvieran que convivir, se crearía un Sistema de Diseño minimalista con una librería de componentes que fuera agnóstica
  (por ejemplo una basada en web components nativos).
  De esta manera se podrían reutilizar los componentes ya estilizados en ambas pruebas
  e incluso en otras hipotéticas pruebas que usaran otros frameworks de Frontend como `Vue.js`.

## Rendimiento

- En la Aplicación React, se guarda el estado en el componente que permita minimizar el número de renderizados.
  Por ejemplo, al guardar el estado del contenido del input en `AddItemModal`,
  evitamos renderizar la página entera una y otra vez cada vez que el usuario escribe en el input.
- `React Developer Tools` es una útil herramienta para detectar problemas de rendimiento,
  ya que por ejemplo permite visualizar cuando se renderiza un componente.
- `Chrome` también incluye un panel de `Performance` con información útil acerca del rendimiento de la aplicación frontend.

## Calidad del código

Al no especificarse cómo gestionar la calidad del código, se opta por soluciones ampliamente usadas en el ecosistema FE moderno:

- `Oxlint` para linting del código (especialmente útil si hubiera varios desarrolladores trabajando en el proyecto).
- `Playwright` para tests de componente y tests e2e
  (e2e enfocado a cubrir la funcionalidad completa de Frontend, sin incluir backend ya que este proyecto no lo incorpora).
- Se usaría `Vitest` para tests unitarios de las funciones lógicas en JavaScript
  (en esta prueba no ha sido necesario implementar ninguna función de este tipo, por lo que se ha prescindido de tests unitarios).
- En un proyecto real, donde tuviéramos un entorno de protección, diseñaríamos un pipeline de CI/CD.
  Por ejemplo, esta pipeline incluiría pasos para realizar una nueva release
  consistentes en que todos los tests, los checks de lint y ts-checks fueran positivos.

## Seguridad del código

Las características de esta aplicación realmente no lo requieren, debido a su simplicidad;
pero se detalla a continuación algunas recomendaciones generales.

- Se sanitiza el texto introducido por el usuario en el input, para evitar posibles inyecciones de sql.
  Esta medida preventiva permitiría evitar enviar payloads peligrosos a la Base de Datos desde el Frontend.
- En un escenario real, se recomendaría usar herramientas de monitorización de errores
  y de rendimiento de la aplicación en entornos de producción,
  como por ejemplo `Sentry` o `Datadog`.
- Dockerizar el proyecto (introducirlo en un contenedor) sería útil para garantizar que se ejecuta de igual manera en todos los entornos.
  Esto sería especialmente útil si necesitáramos usar variables de entorno para guardar secretos que no deban guardarse en el código fuente por contener información sensible de ser explotada por potenciales atacantes.
