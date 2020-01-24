import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ng2-redux-test',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Welcome to the Zoo';
}
