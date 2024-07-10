import {NgModule} from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'

const myModules: any = [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule
];

@NgModule({
    imports: [...myModules],
    exports: [...myModules]
})

export class MaterialModule {}