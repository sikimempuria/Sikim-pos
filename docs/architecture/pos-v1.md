# Arquitectura POS V1

Este documento es un documento de arquitectura para el repositorio `sikimempuria/Sikim-pos`.

Queda expresamente fuera del alcance de esta tarea implementar esquema de base de datos, interfaz, impresión, pagos, despliegue o integraciones fiscales. Este repositorio POS nace como un repositorio dedicado y separado de la app interna de gestión/reservas existente y de la app pública de reservas externas.

## Objetivo

Definir la arquitectura funcional y los límites de una primera versión operativa del POS / TPV de Sikim, de forma que sirva como base para futuras tareas de implementación sin mezclar este repositorio con la app interna actual ni con el motor público de reservas.

El objetivo operativo de V1 es cubrir el circuito:

`reserva o walk-in -> sesión de mesa -> comanda -> producción de cocina/barra -> ticket de cliente -> pago -> cierre de turno`

V1 debe ser utilizable a nivel operativo interno, pero no se considera una solución fiscal final.

## Alcance de V1

V1 incluye a nivel conceptual:

- acceso interno al POS;
- mapa interactivo de sala / mesas;
- gestión de mesas físicas;
- sesiones de mesa;
- vínculo opcional entre una sesión de mesa y una reserva existente;
- sesiones walk-in sin reserva previa;
- creación y edición de comandas;
- alta de líneas desde catálogo activo respaldado por Cheffing;
- notas y modificadores básicos;
- envío de líneas a cocina/barra;
- envío idempotente a cocina/barra;
- abstracción de print slip o print-job para cocina/barra;
- ticket operativo para cliente;
- registro básico de pagos;
- apertura y cierre básico de turno/caja;
- auditoría mínima de eventos y cambios de estado.

V1 no incluye cumplimiento fiscal definitivo, integración con hardware de cobro real, ni rediseño de los sistemas de reservas existentes.

## Relación entre repositorios

En el ecosistema Sikim existen tres piezas separadas:

1. `sikimempuria/Sikim-pos`
   Este repositorio. Su responsabilidad futura es el POS / TPV dedicado.
2. Repositorio interno de gestión y reservas
   Ya contiene conceptos operativos como reservas/eventos, clientes, salas, asignaciones, Cheffing, usuarios internos y flujos internos relacionados con cocina.
3. Repositorio público de reservas externas
   Ya resuelve el flujo público de solicitud y confirmación de reservas externas.

La arquitectura de POS V1 debe respetar que el bloque de reservas externas ya está operativamente cerrado. El POS podrá relacionarse en el futuro con reservas confirmadas, pero no debe depender de rediseñar ni modificar ese motor externo.

## Límites del repositorio POS

`Sikim-pos` es un repositorio dedicado al POS / TPV. No debe duplicar la app interna completa de gestión.

Principios de frontera:

- el POS debe permanecer separado como aplicación;
- el POS no debe convertirse en un sistema de negocio aislado;
- las futuras integraciones deben hacerse mediante contratos explícitos;
- este repositorio no debe asumir que ya existen localmente esquemas, tablas o configuración compartida;
- no se debe copiar código de la app interna salvo una decisión explícita de migración o extracción.

Puntos potenciales de integración futura:

- Supabase;
- reservas y eventos existentes;
- platos, cartas y menús de Cheffing;
- usuarios internos y permisos;
- estrategia compartida de autenticación/sesión;
- entornos de despliegue en Vercel.

La propiedad del esquema de datos queda abierta. No se decide en este documento si:

- las migraciones POS vivirán en `Sikim-pos`;
- el repositorio interno seguirá siendo el dueño canónico del esquema Supabase compartido;
- será necesario un repositorio futuro de infraestructura o esquema compartido.

En esta tarea no se crean migraciones.

## Módulos POS V1

Una descomposición razonable para V1 es la siguiente:

- acceso POS y contexto de usuario;
- mapa de sala y mesas;
- sesiones de mesa;
- catálogo TPV visible;
- comandas y líneas de comanda;
- envío a cocina/barra;
- impresión y print jobs;
- ticket operativo de cliente;
- pagos básicos;
- turno/caja;
- auditoría operativa.

Estos módulos deben mantenerse separados en responsabilidad aunque compartan contratos y estados de negocio.

## Modelo de mesas

V1 debe distinguir con claridad entre conceptos que a menudo se confunden:

- mesa física;
- reserva;
- sesión de mesa;
- comanda.

Una mesa física no es una reserva. Una reserva puede acabar ocupando una o varias mesas, y una sesión de mesa representa el uso operativo real durante el servicio. La comanda representa el conjunto de pedidos operativos sobre esa sesión.

Como modelo conceptual futuro, podrían existir entidades candidatas como:

- `pos_areas`;
- `pos_tables`;
- `pos_table_layouts`;
- `pos_table_sessions`.

Estas entidades se describen como candidatas de diseño futuro, no como tablas ya implementadas en este repositorio.

## Sesiones de mesa

La sesión de mesa es la unidad operativa central del servicio en sala.

Debe permitir al menos:

- abrir una sesión sobre una o varias mesas;
- asociarla opcionalmente a una reserva existente;
- iniciarla sin reserva en caso de walk-in;
- conocer su estado operativo;
- agrupar una o más comandas relacionadas con esa atención;
- cerrarla cuando el servicio y el cobro hayan terminado.

Estados conceptuales posibles de una sesión:

- abierta;
- con comandas activas;
- pendiente de cobro;
- cerrada;
- anulada o reubicada si existiera una operación administrativa posterior.

La sesión debe soportar cambios reales de operación, como unir mesas, mover una sesión a otra mesa o dividir la atención, pero sin exigir que toda esa complejidad se implemente en la primera iteración.

## Modelo de comandas

La comanda es la entidad operativa donde se añaden productos, notas y cambios antes de enviarlos a producción.

Como modelo conceptual futuro, podrían existir entidades candidatas como:

- `pos_orders`;
- `pos_order_items`;
- `pos_order_item_modifiers`;
- `pos_order_events`.

No deben interpretarse como tablas ya presentes.

Ciclo de vida conceptual de la comanda:

- `draft/open`;
- `sent`;
- `partially sent`;
- `in production`;
- `ready`;
- `served`;
- `cancelled/voided`;
- `closed/paid`.

Estados conceptuales de línea:

- `draft`;
- `sent`;
- `preparing`;
- `ready`;
- `served`;
- `voided/cancelled`.

Regla crítica: en el momento de enviar un ítem a cocina/barra deben quedar fijados como snapshot el nombre del producto, el precio, los impuestos, la estación de producción y la metadata operativa relevante. El histórico del POS no puede depender de futuras ediciones en Cheffing.

## Relación con reservas existentes

El POS no debe redefinir el sistema de reservas existente.

Relación esperada con reservas:

- una reserva existente puede enlazarse opcionalmente a una sesión de mesa;
- una sesión puede existir sin reserva previa;
- una reserva podría enlazarse a una o varias sesiones según la operación real;
- la sesión debe poder usar datos mínimos de contexto de la reserva sin asumir propiedad del modelo de reservas.

Este repositorio no debe afirmar que ya contiene las tablas de reservas, clientes, salas o asignaciones de la app interna. Para V1, esos conceptos deben tratarse como integraciones externas futuras.

## Relación con Cheffing / cartas / menús

Cheffing sigue siendo la fuente de verdad de platos, cartas, menús y metadata de producto.

El POS no debe editar:

- recetas;
- foodcost;
- importaciones;
- datos fuente de Cheffing.

El POS sí puede necesitar una capa operativa propia de visibilidad/configuración, siempre subordinada a la fuente Cheffing. Esa capa puede decidir cómo se presenta un producto dentro del TPV sin cambiar el dato maestro original.

## Productos TPV visibles

El catálogo visible en POS no debe ser una copia libre del modelo Cheffing, sino una vista operativa del catálogo activo.

Como overlay operativo futuro, un producto podría tener configuraciones como:

- visible en POS;
- categoría POS;
- etiqueta corta de botón;
- orden de aparición;
- estación de producción;
- ruta de impresión;
- disponibilidad;
- override de precio, si y solo si la política operativa lo permite.

La regla histórica sigue siendo la misma: una vez un producto entra en una comanda enviada, su información de venta y producción debe quedar fijada como snapshot.

## Cocina / barra / producción

Solo los ítems enviados pasan a ser líneas de producción. Un ítem en borrador no es producción.

Como modelo conceptual futuro, podrían existir entidades candidatas como:

- `pos_production_stations`;
- `pos_kitchen_lines`;
- `pos_kitchen_line_events`.

El envío a cocina/barra debe cumplir estas reglas:

- ser idempotente;
- no duplicar líneas por clicks repetidos;
- conservar trazabilidad por línea;
- distinguir claramente qué parte de una comanda ya fue enviada y cuál no.

Una línea de producción futura necesitará, como mínimo:

- mesa o sesión;
- comanda;
- ítem;
- cantidad;
- notas;
- curso o momento de servicio si aplica;
- estación;
- timestamps relevantes;
- estado de envío/impresión.

## Impresión

La impresión debe abstraerse desde el inicio, aunque V1 empiece con una solución simple.

Como modelo conceptual futuro, podrían existir:

- `pos_print_jobs`;
- `pos_print_job_attempts`;
- configuración de impresoras por estación.

V1 podría comenzar con impresión desde navegador, PDF o una abstracción mínima de print-job, pero no debe tratar ninguna impresora mock como impresión de producción real.

La impresión fiscal o legal queda fuera de V1.

## Tickets para cliente

El ticket de cliente en V1 es un comprobante operativo, no una factura fiscal final.

Debe poder reflejar:

- mesa y/o sesión;
- fecha y hora;
- líneas servidas o cobradas;
- cantidades;
- precios;
- información fiscal disponible, si existe;
- resumen de pago;
- placeholders de identificación del negocio si más adelante fueran necesarios.

VeriFactu, AEAT, factura fiscal final y exportes contables no forman parte de este documento de V1.

## Pagos básicos

V1 puede registrar pagos básicos manuales o semimanuales:

- efectivo;
- tarjeta;
- otros/manual.

Como modelo conceptual futuro, podrían existir entidades candidatas como:

- `pos_payments`;
- `pos_shifts`;
- `pos_cash_movements`;
- `pos_shift_closures`.

No se integrarán terminales de pago reales en V1 sin una decisión explícita posterior.

## Turno y caja

La gestión mínima de turno/caja en V1 debe cubrir el ciclo básico:

- apertura de turno;
- registro de pagos durante el servicio;
- cierre de turno;
- cálculo de efectivo esperado;
- recuento de efectivo;
- diferencia;
- notas;
- actor responsable.

El objetivo es trazabilidad operativa básica, no contabilidad final.

## Permisos

Los permisos del POS deben ser explícitos y no asumirse por pertenecer genéricamente al sistema interno.

Capacidades futuras posibles:

- acceso POS;
- gestionar comandas;
- enviar a cocina/barra;
- anular o cancelar líneas;
- registrar pagos;
- cerrar turnos;
- administrar configuración POS.

No debe asumirse que cualquier usuario interno puede operar el POS. Además, los permisos de cocina/barra pueden diferir de los permisos de caja o administración.

## Auditoría y seguridad operativa

La operación POS debe ser auditable por defecto.

Como mínimo, una implementación futura debería capturar:

- actor o email de usuario;
- timestamps de creación y actualización;
- cambios de estado de comanda;
- eventos de envío a cocina/barra;
- motivos de void/cancelación;
- registro de pagos;
- diferencias en cierre de turno;
- intentos de impresión.

También deben considerarse sensibles los datos de clientes, staff, historial de pedidos, pagos, movimientos de caja y notas operativas. La auditoría es un requisito funcional, no un añadido opcional.

## Fases de implementación

Una secuencia futura razonable en pasos pequeños sería:

1. Documento de arquitectura.
2. README y posicionamiento del proyecto.
3. Scaffold inicial con Next.js, TypeScript, npm y Node 20.
4. Despliegue inicial en Vercel.
5. Decisión de integración con Supabase.
6. Diseño del esquema POS.
7. Catálogo POS derivado de Cheffing.
8. Mapa de mesas y sesiones de mesa.
9. Comandas y líneas.
10. Envío a cocina/barra y abstracción de print-job.
11. Tickets para cliente.
12. Pagos básicos y cierre de turno.
13. QA operativa.
14. Fiscalidad, contabilidad y reporting futuro.

El orden exacto puede ajustarse, pero la idea es separar primero arquitectura y límites, y después introducir infraestructura y modelo de datos con decisiones explícitas.

## Fuera de V1

Queda explícitamente fuera de V1:

- cumplimiento fiscal/legal final;
- integración con VeriFactu o AEAT;
- sincronización con Odoo o contabilidad;
- integración con terminales de pago;
- decremento automático de inventario;
- actualizaciones avanzadas de foodcost;
- pedidos por QR de cliente;
- pagos online;
- refunds o chargebacks más allá de notas manuales básicas;
- integraciones con plataformas de delivery/takeaway;
- POS offline-first;
- certificación de hardware de impresión;
- BI o reporting avanzado;
- loyalty o CRM;
- planificación automática de personal;
- rediseño del motor de reservas externas;
- duplicar la app interna de gestión.

## Decisiones abiertas

Este documento deja abiertas, a propósito, varias decisiones de arquitectura:

- propiedad canónica del esquema y de las migraciones;
- estrategia de autenticación y sesión compartida o separada;
- mecanismo de sincronización con reservas y Cheffing;
- detalle del modelo de impresión física;
- granularidad exacta del modelo de caja y arqueo;
- estrategia de despliegue y entornos compartidos en Vercel;
- alcance real de overrides de precio y disponibilidad en POS;
- si el POS consume una base compartida o una capa intermedia de contratos/eventos.

Estas decisiones deben resolverse antes de implementar datos operativos sensibles.

## Principios de implementación

Los siguientes principios deben guiar la implementación futura:

- separar claramente UI, dominio POS e integraciones externas;
- mantener las reglas de negocio críticas cerca del dominio;
- no asumir que las tablas candidatas ya existen;
- usar contratos explícitos para reservas, catálogo y usuarios;
- snapshotear datos relevantes en el momento de envío/venta;
- tratar cocina/barra, pagos, impresión y cierre de turno como operaciones sensibles;
- evitar duplicados por reintentos o clicks repetidos;
- priorizar flujos rápidos, claros y difíciles de usar mal en servicio;
- introducir infraestructura y fiscalidad solo cuando exista una decisión de arquitectura aprobada.

Este documento debe servir como referencia de base para futuros prompts de implementación en Codex sin forzar todavía decisiones de infraestructura o de propiedad del esquema que siguen abiertas.
