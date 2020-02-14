
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FileUtil {

  constructor(
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  arrayBufferToSrc(arrayBuffer) {
      const arrayBufferView = new Uint8Array( arrayBuffer );
      let blob = new Blob( [ arrayBufferView ], { type: 'image/jpeg' } );
      let urlCreator = window.URL;
      let src: any = urlCreator.createObjectURL( blob );
      src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
      return src;
  }

}

