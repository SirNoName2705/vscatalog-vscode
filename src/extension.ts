import * as vscode from 'vscode';
import * as https from 'https';

const catalogUrl = 'https://raw.githubusercontent.com/SirNoName2705/VintelliSchemas/master/SchemaReleases/current/vs_schema_catalog.json';

// Funktion, um den Katalog zu laden und anzuwenden
function updateSchemasFromCatalog() {
	vscode.commands.executeCommand('json.clearCache');
	return fetchCatalog(catalogUrl).then(catalog => {
		if (catalog && Array.isArray(catalog.schemas)) {
			const updatedSchemas = catalog.schemas.map((schema: any) => ({
				fileMatch: schema.fileMatch,
				url: schema.url
			}));
			// Schemas auf die Workspace-Einstellungen anwenden
			vscode.workspace.getConfiguration('json').update(
				'schemas', updatedSchemas, vscode.ConfigurationTarget.Workspace
			);
			vscode.window.showInformationMessage('vscatalog schemas updated successfully');
		}
	}).catch(error => {
		vscode.window.showErrorMessage('Error updating vscatalog schemas');
	});
}

// Funktion, um den Katalog abzurufen
function fetchCatalog(url: string): Promise<any> {
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
				} catch (error) {
					reject('Error parsing catalog JSON');
				}
			});
		}).on('error', (err) => {
			reject('Error fetching catalog: ' + err.message);
		});
	});
}

// Aktivierungsfunktion
export function activate(context: vscode.ExtensionContext) {
	// Befehl registrieren, der die Schemas aktualisiert
	const updateSchemasCommand = vscode.commands.registerCommand('vscatalog.update', () => {
		updateSchemasFromCatalog(); // Die Funktion wird aufgerufen
	});

	context.subscriptions.push(updateSchemasCommand);

	// Die Schemas automatisch beim Aktivieren aktualisieren
	updateSchemasFromCatalog();
}

// Deaktivierungsfunktion
export function deactivate() {
	vscode.commands.executeCommand('json.clearCache');
}
