import { Component, OnInit, Input } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageViewComponent } from '../../../../../../shared/components/image-view/image-view.component';


@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  @Input() personId;
  images: [];
  fileInput: any;
  fileSrc = '';
  fileLabel = 'Seleccione un archivo..';
  loading = false;

  constructor(
    private fileService: FileService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.fileService.getImagesByPersonId(this.personId).subscribe((res) => {
      this.images = res;
    }, error => {
      console.log(error);
    });
  }

  openImage(imageData) {
    const dialogRef = this.dialog.open(ImageViewComponent, { width: 'auto', height: '90%' });
    dialogRef.componentInstance.image = imageData;
  }

  uploadFile() {
    this.loading = true;
    const payload = {
      personId: this.personId,
      therapistId: 1,//TODO- CHANGE THIS TO GET THE SESION ID
      description: 'This is a description'
    };
    this.fileService.uploadFile(this.fileInput, payload).subscribe((res) => {
      if (res.status === 200) {
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
        this.router.navigate(['home', 'record-summary', this.personId]));
        this.toastr.success('El archivo ha sido cargado exitosamente', 'Operacion exitosa');
      } else if (res.status === 409) {
        this.toastr.error('Ya existe un archivo con este nombre', 'Operacion fallida');
      }
      this.loading = false;
    }, error => {
      this.toastr.error('Hubo un error al cargar el archivo', 'Operacion fallida');
      console.log(error);
    });
  }

  isFileEmpty() {
    return typeof this.fileInput === 'undefined';
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
    this.fileInput = file;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.fileLabel = file.name;
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.fileSrc = reader.result;
  }

}
