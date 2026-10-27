## Features

- El enunciado especifica que las cadenas de texto deben tener al menos 1 carácter de longitud. Al no especificarse un límite de máximo de caracteres, se opta por limitarlo a 1000 carácteres por motivos de escabilidad.
- Se desactiva el botón de añadir una nueva cadena de texto cuando el contenido del input es 0. Si el contenido supera los 1000 caracteres, también de desactiva y se muestra un mensaje de error al usuario para explicarle la regla de validación.
- Con el objetivo de simplificar, se ha implementado la función de borrado tal y como se especificaba en el enunciado. Sin embargo, en un proyecto real sería recomendable añadir un mensaje de confirmación cuando el usuario hace doble click en una cadena de texto, pues podría no ser obvio que esa acción provoca el borrado de datos. En todo caso, al disponer de una función de deshacer, se reduce el riesgo de que el usuario pierda datos accidentalmente.

- Se añade un scroll vertical cuando la lista de cadenas de texto supera la altura especificada por el diseño, pues se asume que es una altura fija.
- Se adapta el diseño para que sea responsive en pantallas de móvil o tablet
- Se han mantenido los mismos textos "This is a technical proof" y el lorem ipsum de las labels de la página que aparecía en los diseños. Alternativamente, podríamos por ejemplo substituir el lorem ipsum por instrucciones de como eliminar una cadena de texto.
- El modal puede cerrarse con Escape o al pulsar fuera de su cuerpo. Al abrirse enfoca el campo y, al cerrarse, devuelve el foco al botón que lo abrió.

## Estructura del proyecto

- Se estructura el proyecto como un monorepo que incluye ambas soluciones requeridas: Vanilla Js y React
- Se utiliza vite para simplificar el desarrollo y el scaffolding del proyecto

## Persistencia de datos

- No se implementa Backend al no ser parte del enunciado
- En la solución de React se guardan los datos en el estado, sin persistir entre diferentes sesiones del usuario. Se toma esta decisión al no especificarse en el enunciado que se requiera ese tipo de persistencia (por ejemplo: persistir los datos cuando se recarga la página)
- En la solución de Vanilla JS se persisten los datos en memoria, como hace React.
- Si quisiéramos persistir datos entre sesiones sin tener una Base de Datos, podríamos por ejemplo guardarlos en el storage del navegador.

## Arquitectura Frontend

- Se utiliza JavaScript en ambas pruebas, pero en un proyecto real recomendaría utilizar Typescript por sus múltiples beneficios tales como el typado de variables.

- Se utiliza tailwind.css para los estilos. Ya que el enunciado no especifica una solución concreta, hemos optado por usar un framework ampliamente usado en el ecosistema frontend.

- Los estilos están duplicados, pues son los mismos para cada prueba (Vanilla Js y React). Se decide mantenerlos independientes para que las pruebas sean complementamente independientes entre sí, pues al ser dos soluciones diferentes para los mismo requerimientos, no necesitarán convivir en un proyecto real.
- Si ambas pruebas tuvieran que convivir, se crearía un Sistema de Diseño minimalista con una librería de componentes que fuera agnóstica (por ejemplo una basada en web components nativos). De esta manera se podrían reutilizar los componentes ya estilizados en ambas pruebas e incluso en otras hipotéticas pruebas que usaran otras tecnologías de Frontend.

## Calidad del código

Al no especificarse cómo gestionar la calidad del código, se opta por soluciones ampliamente usadas en el ecosistema FE moderno:

- Oxlint para linting del código.
- Playwright para tests de componente y tests e2e.
- Vitest para tests unitarios de las funciones lógicas en javascript.
- En un proyecto real, donde tuviéramos un entorno de protección, diseñaríamos un pipeline de CI/CD. Por ejemplo, esta pipeline incluiría pasos para realizar una nueva release que todos los tests y los checks de lint fueran positivos.
