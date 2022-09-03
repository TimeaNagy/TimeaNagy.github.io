import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html'
})
export class FeatureComponent {
    @Input() feature = '';
    @Input() icon = '';
}
