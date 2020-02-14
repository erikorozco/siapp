import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { RecordService } from '../../../../shared/services/record-service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/shared/services/file.service';
import { FileUtil } from '../../../../shared/utils/file.util';

@Component({
  selector: 'app-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css']
})
export class RecordSummaryComponent implements OnInit {

  params: any;
  person: any;
  record: any;
  photoFile: any;
  photoSrc: any;
  loading = false;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private personService: PersonService,
    private recordService: RecordService,
    private toastr: ToastrService,
    private fileService: FileService,
    private fileUtil: FileUtil
  ) { }

  ngOnInit() {
    this.routes.params.subscribe(params => {
      this.params = params;
    });

    this.getPersonInformation();
    this.getRecordInformation();
    this.getProfilePhoto();
  }

  getPersonInformation() {
    this.personService.getPerson(this.params.personId).subscribe(data => {
      this.person = data;
    }, error => {
      console.log(error);
    });
  }

  getRecordInformation() {
    this.recordService.getRecordByPersonId(this.params.personId).subscribe(data => {
      this.record = data;
    }, error => {
      console.log(error);
    });
  }

  getProfilePhoto() {
    this.fileService.getFile(this.params.personId, 'profilePhoto.png').subscribe((res) => {
      if (res) {
        this.photoSrc = this.fileUtil.arrayBufferToSrc(res.body);
      }
    });
  }

  viewPrivacyAgreement() {
    this.router.navigate(['home', 'privacy-agreement', this.params.personId]);
  }

  uploadPhoto() {
    this.loading = true;
    const payload = {
      personId: this.params.personId,
      therapistId: 1,//TODO- CHANGE THIS TO GET THE SESION ID
      description: 'Profile photo',
      isProfilePhoto: true
    };
    var blob = this.photoFile.slice(0, this.photoFile.size, 'image/png');
    var tempFile = new File([blob], 'profilePhoto.png', {type: 'image/png'});
    this.fileService.uploadFile(tempFile, payload).subscribe((res) => {
      if (res.status === 200) {
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then( () =>
        this.router.navigate(['home', 'record-summary', this.params.personId]));
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
