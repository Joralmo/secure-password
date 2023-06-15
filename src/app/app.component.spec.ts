import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "./button/button.component";
import { InputPasswordComponent } from "./input-password/input-password.component";
import { ReactiveFormsModule } from "@angular/forms";

describe("AppComponent", () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [ HomeComponent, InputComponent, ButtonComponent, InputPasswordComponent ],
    imports: [ ReactiveFormsModule ]
  });

  beforeEach(() => spectator = createComponent());

  it("Debería crear el componente", () => {
    expect(spectator.component).toBeTruthy();
  });
});