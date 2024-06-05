const { exec } = require('child_process');
const fs = require('fs');
// bruger config filen i bunden (mro.config.json = indholder database credentials)
class SchemaDocumentationWithMRO {
  constructor(configFile) {
    this.configFile = configFile;
  }

  /**
   * Kører MRO-kommandoen for at generere HTML-dokumentation.
   * @returns {Promise} 
   */
  runMRO() {
    return new Promise((resolve, reject) => {
      exec(`npx mro -c ${this.configFile}`, (err, stdout, stderr) => { //executer mro commandoen til at lave doku. Istedet for at gøre det i kommando line
        if (err) {
          reject(`Fejl ved kørsel af MRO: ${stderr}`);
        } else {
          resolve('Dokumentation genereret med succes af MRO.');
        }
      });
    });
  }

  
   //Starter dokumentationsgenereringsprocessen ved at køre MRO.
   
  async generateDocumentation() {
    try {
      const message = await this.runMRO();
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  }
}

// Brug af klassen
const docGenerator = new SchemaDocumentationWithMRO('./mro.config.json');
docGenerator.generateDocumentation();

