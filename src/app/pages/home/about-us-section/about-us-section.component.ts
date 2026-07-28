import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us-section',
  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  templateUrl: './about-us-section.component.html',
  styleUrl: './about-us-section.component.scss'
})
export class AboutUsSectionComponent {

}
