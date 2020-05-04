import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-release-types-dialog',
  templateUrl: './release-types-dialog.component.html',
  styleUrls: ['./release-types-dialog.component.css']
})
export class ReleaseTypesDialogComponent implements OnInit {

  options = [
    {
      text: "Alta normal",
      value: "medicalRelease"
    },
    {
      text: "Alta voluntaria",
      value: "ownMedicalRelease"
    },
    {
      text: "Baja",
      value: "unsubscribeMedicalRelease"
    }
  ]

  constructor(
    public dialogRef: MatDialogRef<ReleaseTypesDialogComponent>
  ) { }

  ngOnInit() {
  }

}
