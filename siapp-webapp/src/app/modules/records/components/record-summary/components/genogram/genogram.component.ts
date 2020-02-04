import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from 'src/app/shared/services/record-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-genogram',
  templateUrl: './genogram.component.html',
  styleUrls: ['./genogram.component.css']
})
export class GenogramComponent implements OnInit {

  @Input() recordId;
  genogramFile: File;
  genogramSrc = '';
  record: any;

  constructor(
    private router: Router,
    private recordService: RecordService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getRecordInformation();
  }


  uploadGenograma() {
    this.recordService.uploadGenogram(this.genogramFile, this.recordId).subscribe((response) => {
      if (response === 200) {
        // this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
        // this.router.navigate(['home', 'record-summary', this.record.person.id]));
        this.toastr.success('El archivo ha sido cargado exitosamente', 'Operacion exitosa');
      }
    }, error => {
      this.toastr.error('Hubo un error al cargar el archivo', 'Operacion fallida');
      console.log(error);
    });
  }

  getRecordInformation() {
    this.recordService.getRecordById(this.recordId).subscribe(data => {
      if (data) {
        this.record = data;
        this.genogramSrc = 'data:image/png;base64,' + data.genogram;
      }
    }, error => {
    });
  }

  isFileEmpty(){
    return typeof this.genogramFile === 'undefined';
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.toastr.error('Formato de archivo no compatible', 'Archivo invalido');
      return;
    } else if (file.size > 1000000) {
      this.toastr.error('Excede el tamaño. Max 10MB', 'Archivo invalido');
      return;
    }
    this.genogramFile = file;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.genogramSrc = reader.result;
  }

}
