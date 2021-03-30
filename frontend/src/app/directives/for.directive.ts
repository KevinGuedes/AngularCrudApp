import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit { //pode ser OnChange

  @Input('myForEm') numbers: number[];
  //@Input('myForUsando') texto: string;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnInit() {
    for (let number of this.numbers) {
      this.container.createEmbeddedView(this.template, { $implicit: number }) //pegando a tag li com this.container
    }
  }
}
