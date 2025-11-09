# Suelas Toty – Angular 20 storefront

Esta maqueta implementa la experiencia web descrita para Suelas Toty utilizando **Angular 20** con componentes standalone y Node.js 20.19.5. Incluye las pantallas principales (inicio, catálogo, servicio al cliente, contacto, inventario y panel administrativo) y la estructura base para integrar módulos operativos, pagos y logística en futuras iteraciones.

## Requisitos

- Node.js **20.19.5** (recomendado utilizar `nvm` para emparejar la versión)
- npm 10.5 o superior

## Puesta en marcha

```bash
cd frontend
npm install
npm start
```

El comando `npm start` inicia el servidor de desarrollo (`http://localhost:4200/`). Los scripts adicionales (`npm run build`, `npm test`) quedan disponibles para automatizar builds y pruebas cuando se agregue lógica conectada a servicios reales.

## Estructura del proyecto

```
frontend/
├── angular.json
├── package.json
├── src/
│   ├── main.ts
│   ├── index.html
│   ├── styles.scss
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── core/layout/
│   │   │   ├── header.component.ts
│   │   │   └── footer.component.ts
│   │   ├── shared/components/value-pill/
│   │   │   └── value-pill.component.ts
│   │   └── features/
│   │       ├── home/home.component.ts
│   │       ├── products/products.component.ts
│   │       ├── customer-service/customer-service.component.ts
│   │       ├── contact/contact.component.ts
│   │       ├── inventory/inventory.component.ts
│   │       └── admin/admin-dashboard.component.ts
│   └── assets/
│       ├── data/products.json
│       └── images/logo.svg
└── tsconfig*.json, karma.conf.js
```

La maqueta utiliza un `ValuePillComponent` reutilizable y `products.json` como fuente de datos estática para el catálogo.

## Secciones incluidas

- **Inicio:** héroe con valores corporativos (calidad, honestidad, respeto, servicio, compromiso, trabajo en equipo), misión, visión y objetivos.
- **Catálogo de productos:** tarjetas con referencia, precio, stock, colores y estado (disponible, bajo inventario, producción programada) usando datos mock.
- **Servicio al cliente:** canales de atención con tiempos de respuesta y workflow de soporte 360°.
- **Contacto y redes:** formulario listo para validaciones y tarjetas de canales directos, redes sociales y horarios.
- **Inventario (administrador):** KPIs resumidos para existencias, pedidos y alertas, orientado a la vista restringida.
- **Panel administrativo:** resumen de módulos sensibles (inventario, CRM, pagos, configuración) con badges de acceso.

Cada sección mantiene la estética establecida en la documentación anterior, respetando la paleta azul de Suelas Toty y los principios de accesibilidad (contraste, jerarquía tipográfica y diseño responsive).

## Próximos pasos sugeridos

1. Conectar los componentes a servicios reales (`HttpClient`) y gestionar estado global (NgRx Signals Store o alternativa).
2. Implementar autenticación y autorización (guards, interceptores) para separar la experiencia de clientes y administradores.
3. Añadir módulos de carrito, checkout, seguimiento de pedidos e integración con pasarelas de pago y operadores logísticos.
4. Incluir pruebas unitarias y de integración en `src/app` conforme se incorpore lógica de negocio.

Esta base sirve como punto de partida visual y técnico para evolucionar hacia la plataforma e-commerce completa de Suelas Toty.
