import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// window.onkeydown = function (e: Event) {
//   const ev: any = window.event || e;
//   const code = ev.keyCode || ev.width;
//   if (code === 82 && (ev.metaKey || ev.ctrlKey)) {
//     return false;
//   }
// };
