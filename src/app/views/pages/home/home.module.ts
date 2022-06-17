import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule ,RouterModule.forChild(routes)],
})
export class HomeModule {}
