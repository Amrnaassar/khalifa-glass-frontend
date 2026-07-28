import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  standalone:true,
  imports: [TranslatePipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
  
})
export class AboutUsComponent {

}
