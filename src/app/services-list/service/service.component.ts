import { Component, Input } from '@angular/core';
import { AnimationComponent } from 'src/app/animation.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent extends AnimationComponent {
  @Input() service = '';
  @Input() picture = '';
  @Input() ref = '';

  scroll() {
    const el = document.getElementById(this.ref);
    if (el) {
        el.scrollIntoView({behavior: 'smooth'});
    }
}
}
