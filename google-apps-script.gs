/**
 * Recibe los leads del quiz "El Compás del Temperamento" y los agrega
 * como fila en la hoja de cálculo a la que está vinculado este script.
 *
 * Instalación:
 * 1. Crea un Google Sheet con esta fila de encabezados en la hoja "Leads":
 *    Fecha | Nombre | Email | Resultado | Colerico | Sanguineo | Flematico | Melancolico
 * 2. Extensiones > Apps Script, borra el contenido de Code.gs y pega este archivo.
 * 3. Implementar > Nueva implementación > tipo "Aplicación web".
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 4. Copia la URL que te da ("Web app URL") y pégala en GAS_WEBHOOK_URL
 *    dentro de index.html.
 * 5. Cada vez que edites este script, vuelve a "Nueva implementación"
 *    (o "Administrar implementaciones" > editar) para que el cambio se publique.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads')
    || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.email || '',
    data.resultado || '',
    data.colerico || 0,
    data.sanguineo || 0,
    data.flematico || 0,
    data.melancolico || 0
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
