import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { RecordService } from 'src/app/shared/services/record-service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/shared/services/file.service';
import { FileUtil } from 'src/app/shared/utils/file.util';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent implements OnInit {

  @Input() personId: number;
  photoFile: any;
  photoSrc: any;
  loading = false;

  constructor(
    private toastr: ToastrService,
    private fileService: FileService,
    private fileUtil: FileUtil
  ) { }

  ngOnInit() {
    this.getProfilePhoto();
  }

  getProfilePhoto() {
    this.fileService.getFile(this.personId, 'profilePhoto.png').subscribe((res) => {
      if (res) {
        this.photoSrc = this.fileUtil.arrayBufferToSrc(res.body);
      }
    }, error => {
      console.log(error);
    });
  }

  uploadPhoto() {
    this.loading = true;
    const payload = {
      personId: this.personId,
      therapistId: '', // Values is being set on the service layer
      description: 'Profile photo',
      isProfilePhoto: true
    };
    var blob = this.photoFile.slice(0, this.photoFile.size, 'image/png');
    var tempFile = new File([blob], 'profilePhoto.png', {type: 'image/png'});
    this.fileService.uploadFile(tempFile, payload).subscribe((res) => {
      if (res.status === 200) {
        this.ngOnInit();
        this.toastr.success('La foto ha sido cargado exitosamente', 'Operacion exitosa');
      }
      this.loading = false;
    }, error => {
      this.toastr.error('Hubo un error al cargar el archivo', 'Operacion fallida');
      console.log(error);
    });
  }

  isFileEmpty() {
    return typeof this.photoFile === 'undefined';
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.toastr.error('Formato de archivo no compatible', 'Archivo invalido');
      return;
    } else if (file.size > 10000000) {
      this.toastr.error('Excede el tamaño. Max 10MB', 'Archivo invalido');
      return;
    }
    this.photoFile = file;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.photoSrc = reader.result;
  }

}
