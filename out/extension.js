"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const https = __importStar(require("https"));
const catalogUrl = 'https://raw.githubusercontent.com/SirNoName2705/VintelliSchemas/master/SchemaReleases/current/vs_schema_catalog.json';
// Funktion, um den Katalog zu laden und anzuwenden
function updateSchemasFromCatalog() {
    vscode.commands.executeCommand('json.clearCache');
    return fetchCatalog(catalogUrl).then(catalog => {
        if (catalog && Array.isArray(catalog.schemas)) {
            const updatedSchemas = catalog.schemas.map((schema) => ({
                fileMatch: schema.fileMatch,
                url: schema.url
            }));
            // Schemas auf die Workspace-Einstellungen anwenden
            vscode.workspace.getConfiguration('json').update('schemas', updatedSchemas, vscode.ConfigurationTarget.Workspace);
            vscode.window.showInformationMessage('vscatalog schemas updated successfully');
        }
    }).catch(error => {
        vscode.window.showErrorMessage('Error updating vscatalog schemas');
    });
}
// Funktion, um den Katalog abzurufen
function fetchCatalog(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            // Überprüfen, ob der Status 200 OK ist
            if (res.statusCode !== 200) {
                return reject('Error: Failed to fetch catalog. Status Code: ' + res.statusCode);
            }
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    // Überprüfen, ob die empfangenen Daten nicht leer sind
                    if (data.trim().length === 0) {
                        return reject('Error: Received empty data from the catalog');
                    }
                    // JSON-Daten parsen
                    const catalog = JSON.parse(data);
                    resolve(catalog);
                }
                catch (error) {
                    reject('Error parsing catalog JSON');
                }
            });
        }).on('error', (err) => {
            reject('Error fetching catalog: ' + err.message);
        });
    });
}
// Aktivierungsfunktion
function activate(context) {
    // Befehl registrieren, der die Schemas aktualisiert
    const updateSchemasCommand = vscode.commands.registerCommand('vscatalog.update', () => {
        updateSchemasFromCatalog(); // Die Funktion wird aufgerufen
    });
    context.subscriptions.push(updateSchemasCommand);
    // Die Schemas automatisch beim Aktivieren aktualisieren
    updateSchemasFromCatalog();
}
// Deaktivierungsfunktion
function deactivate() {
    vscode.commands.executeCommand('json.clearCache');
}
//# sourceMappingURL=extension.js.map