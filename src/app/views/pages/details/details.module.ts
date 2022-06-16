import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailsComponent } from "./details.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: DetailsComponent,
  },
];

@NgModule({
  declarations: [DetailsComponent],
  imports: [SharedModule ,RouterModule.forChild(routes)],
})
export class DetailsModule {}