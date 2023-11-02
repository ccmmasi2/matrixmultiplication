import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})

export class BreadCrumbComponent {
  @Input() textPrincipal: string = '';
  @Input() textSecundary: string = '';
  @Output() notifyParent: EventEmitter<any> = new EventEmitter<any>();
  crumbsPrincipal: Record<string, string>[] = [];
  crumbsSecundary: Record<string, string>[] = [];
  
  ngOnInit() {
    this.crumbsPrincipal = this.parseText(this.textPrincipal);
    this.crumbsSecundary = this.parseText(this.textSecundary);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['textSecundary']) {
      this.crumbsSecundary = this.parseText(this.textSecundary);
    }
  }

  parseText(text: string): { key: string; value: string }[] {
    const pairs = text.split('|');
    return pairs.map((pair) => {
      const parts = pair.split(',');
      return { key: parts[0], value: parts[1] };
    });
  }

  invokeClickEvent(): void {
    this.notifyParent.emit();
  }
}
