import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-multi-select',
  templateUrl: './admin-multi-select.component.html',
  styleUrls: ['./admin-multi-select.component.scss']
})
export class AdminMultiSelectComponent implements OnInit {

  @Input() tempFormGroup: FormGroup;
  @Input() field: FormControl;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() options: Array<any>;
  settings: Object;

  constructor() {
    this.settings = {
      singleSelection: false,
      idField: 'id',
      textField: 'value',
      selectAllText: 'Seleccionar Todas',
      unSelectAllText: 'Deseleccionar Todas',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar'
    }
  }

  ngOnInit() {
  }

}
