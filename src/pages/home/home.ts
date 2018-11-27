import { Component } from '@angular/core';
import { AndroidDataLocation, FileDownloadService } from '../../app/file-download.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private readonly remoteFilePath = 'https://drive.google.com/uc?export=download&id=1j9J3LUAU4qtEwUCy40-ljqoP1SI7vF7E';

  constructor(private fileDownload: FileDownloadService) {
  }

  openFile(androidLocation?: AndroidDataLocation) {
    this.fileDownload.download(this.remoteFilePath, 'example.pdf', androidLocation)
      .then(filePath => {
        console.log('Opening PDF file:', filePath);
        return new Promise((resolve, reject) => {
          RadaeePDFPlugin.open(
            {
              url: filePath,
            },
            function(message) {
              console.log('Success: ' + message);
              resolve(message);
            },
            function(err) {
              console.log('Failure: ' + err);
              reject(err);
            }
          );
        });
      })
      .catch(console.error);
  }

  openFromExternalDataDirectory() {
    this.openFile(AndroidDataLocation.ExternalDataDirectory);
  }

  openFromApplicationStorageDirectory() {
    this.openFile(AndroidDataLocation.ExternalApplicationStorageDirectory);
  }
}
