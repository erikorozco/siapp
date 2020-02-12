import { Component, OnInit, Input } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  @Input() personId;
  mySrc: any;

  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  viewFiles() {
    this.fileService.getFile().subscribe((res) => {
      console.log(res);
      var arrayBufferView = new Uint8Array( res.body );
      var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
      var urlCreator = window.URL;
      this.mySrc  = urlCreator.createObjectURL( blob );
      this.mySrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.mySrc);

    }, error =>{
      console.log(error);
    });
  }

}
