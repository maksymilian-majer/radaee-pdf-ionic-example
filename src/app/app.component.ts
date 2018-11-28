import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
@Component({
  templateUrl: "app.html"
})
export class MyApp {

  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (!platform.is("cordova")) {
        return;
      }
    });

    this.setPdfReaderLicense().then(() => this.configurePdfReader());
  }

  async setPdfReaderLicense(): Promise<any> {
    return new Promise((resolve, reject) => {
      RadaeePDFPlugin.activateLicense(
        {
          licenseType: 0, //0: for standard license, 1: for professional license, 2: for premium license
          company: "", //the company name you entered during license activation
          email: "", //the email you entered during license activation
          key: "" //you license activation key
        },
        resolve,
        reject
      );
    });
  }

  async configurePdfReader(): Promise<any> {
    return new Promise((resolve, reject) => {
      RadaeePDFPlugin.setThumbnailBGColor(
        {
          color: 0xFFFF0000
        },
        resolve,
        reject
      );
    });
  }
}
