import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

export enum AndroidDataLocation {
  DataDirectory,
  ExternalDataDirectory,
  ExternalApplicationStorageDirectory
}

@Injectable()
export class FileDownloadService {
  private readonly platformIsIos: boolean;
  private readonly platformIsAndroid: boolean;
  private readonly platformIsCordova: boolean;

  constructor(private platform: Platform, private transfer: FileTransfer, private file: File) {
    this.platformIsIos = this.platform.is('ios');
    this.platformIsAndroid = this.platform.is('android');
    this.platformIsCordova = this.platform.is('cordova');
  }

  private getPathPrefix(androidLocation: AndroidDataLocation = AndroidDataLocation.DataDirectory) {
    if (this.platformIsIos) {
      return this.file.documentsDirectory;
    }

    if (!this.platformIsAndroid) {
      throw new Error('Unsupported platform');
    }

    switch (androidLocation) {
      case AndroidDataLocation.DataDirectory:
        return this.file.dataDirectory;
      case AndroidDataLocation.ExternalDataDirectory:
        return this.file.externalDataDirectory;
      case AndroidDataLocation.ExternalApplicationStorageDirectory:
        return this.file.applicationStorageDirectory;
      default:
        throw new Error('Unsupported location');
    }
  }

  download(sourceUrl: string, targetFileName: string, androidLocation?: AndroidDataLocation): Promise<string> {
    if (!this.platformIsCordova) {
      throw new Error('Must run on in Cordova on device to download files.');
    }
    const path = this.getPathPrefix(androidLocation);
    const transfer = this.transfer.create();
    return transfer.download(sourceUrl, `${path}${targetFileName}`).then(entry => entry.toURL());
  }
}
