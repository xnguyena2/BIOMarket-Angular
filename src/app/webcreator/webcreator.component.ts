import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-webcreator',
  templateUrl: './webcreator.component.html',
  styleUrls: ['./webcreator.component.css']
})
export class WebcreatorComponent implements OnInit {

  showHTML: boolean = false;

  @Input() innerHtml: string;
  @Output() generateHtml = new EventEmitter<string>();

  @ViewChild('textBox', { static: false }) oDoc!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initDoc();
  }

  initDoc() {
    if (this.showHTML) { this.setDocMode(true); }
  }

  setDocMode(bToSource) {
    let oContent;
    if (bToSource) {
      oContent = document.createTextNode(this.oDoc.nativeElement.innerHTML);
      this.oDoc.nativeElement.innerHTML = "";
      let oPre = document.createElement("pre");
      this.oDoc.nativeElement.contentEditable = false;
      oPre.id = "sourceText";
      oPre.contentEditable = 'true';
      oPre.appendChild(oContent);
      this.oDoc.nativeElement.appendChild(oPre);
      document.execCommand("defaultParagraphSeparator", false, "div");
    } else {
      if (document.all) {
        this.oDoc.nativeElement.innerHTML = this.oDoc.nativeElement.innerText;
      } else {
        oContent = document.createRange();
        oContent.selectNodeContents(this.oDoc.nativeElement.firstChild);
        this.oDoc.nativeElement.innerHTML = oContent.toString();
      }
      this.oDoc.nativeElement.contentEditable = true;
    }
    this.oDoc.nativeElement.focus();
  }

  formatDoc(sCmd, sValue) {
    if (this.validateMode()) { document.execCommand(sCmd, false, sValue); this.oDoc.nativeElement.focus(); }
  }

  validateMode() {
    if (!this.showHTML) { return true; }
    alert("Uncheck \"Show HTML\".");
    this.oDoc.nativeElement.focus();
    return false;
  }

  printDoc() {
    if (!this.validateMode()) { return; }
    var oPrntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    oPrntWin.document.open();
    oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + this.oDoc.nativeElement.innerHTML + "<\/body><\/html>");
    oPrntWin.document.close();
  }

  cleanAll() {
    if (this.validateMode() && confirm('Are you sure?')) {
      this.oDoc.nativeElement.innerHTML = "";
    }
  }

  insertLink() {
    let sLnk = prompt('Write the URL here', '');
    if (sLnk && sLnk != '') {
      this.formatDoc('createlink', sLnk)
    }
  }

  insertImg() {
    let imgSrc = prompt('Write the Image URL here', '');
    if (imgSrc && imgSrc != '') {
      this.formatDoc('insertImage', imgSrc)
    }
  }

  insertYoutube() {
    let youtubeSrc = prompt('Write the Youtube URL here', '');
    if (youtubeSrc && youtubeSrc != '') {
      let elementSrc = `<iframe src="${youtubeSrc}" frameborder="0" allowfullscreen></iframe>`;
      this.formatDoc('insertHTML', elementSrc)
    }
  }

  generateHTML() {
    console.log(this.oDoc.nativeElement.innerHTML);
    this.generateHtml.emit(this.oDoc.nativeElement.innerHTML);
  }

}
