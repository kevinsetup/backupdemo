import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { OwlDialogContainerComponent } from 'ng-pick-datetime/dialog/dialog-container.component';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { interval as observableInterval } from 'rxjs';
import { takeWhile, scan, tap } from 'rxjs/operators';
import {
  Map,
  Control,
  DomUtil,
  MapOptions,
  tileLayer,
  latLng,
  LocationEvent,
  marker,
  Marker,
} from 'leaflet';
import Swal from 'sweetalert2';
import { CameraComponentComponent } from './../camera-component/camera-component.component';
import { DragService } from '../drag/drag.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-previsual-component',
  templateUrl: './previsual-component.component.html',
  styleUrls: ['./previsual-component.component.css']
})
export class PrevisualComponentComponent implements OnInit {
  @HostBinding("style.--main-theme") colora: string = '#ff9933';
  @HostBinding("style.--main-theme-scroll") colorScrolla: string = '#94775b';
  @HostBinding("style.--main-theme-fondo") fondoPrevisual: string = '#e7c7a6';

  
 // receive data from parent using 'MAT_DIALOG_DATA'
  //Variables necesarias para el funcionamiento
  @ViewChildren('radio_group_edit') radio_group_edit_2: QueryList<any>;
  object_edit: any = -1;
  state_components = 'add';
  state_add = true;
  state_edit = false;
  state_aparence = false;
  styleArray = new Array<boolean>();
  condition_encuesta = true; //Aparece cuando no hay elementos
  //Formato de fecha
  dateFormatYear = 'yyyy';
  dateFormatMaY = 'MM/yyyy';
  configurationMap = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }),
    ],
    draggable: true,
    clickable: true,
    zoom: 4,
    center: latLng(-7.4414635, -70.5010989),
  };
  date: any = null;
  mapDraw: any;
  //Contruccion de drag and drop
  styleAparence = {
    title_status: false,
    description_status: false,
    send_status: false,
    title: 'El título de la encuesta no está configurado',
    title_opcion: 'text',
    title_style: 'left',
    description: '<p>Contenido de descripción de la encuesta</p>',
    send: 'Enviar',
  };
  done = [
    {
      title: 'Pregunta sin título ',
      name: 'defect',
      text: null,
      type: 'defect',
      position: 0,
      options: [''],
      options_selec: null,
      necessary_question: false,
      necessary_recuent: false,
      recuent_min: '',
      recuent_max: '',
      sugerence: '',
      calification_num: 0,
      calification: 0,
      calification_icon: '',
      date_time: this.date,
      date_time_init_limitation: '',
      date_time_finally_limitation: '',
      date_time_type: null,
      latitud: 0,
      longitud: 0,
      typeDraw: 'point',
      optionsMap: { ...this.configurationMap },
      type_aparence_date: 'DD/MM/YY',
      center: latLng(-7.4414635, -70.5010989),
      zoom: 4,
      marker: null,
      map: this.date,
      type_origin: '',
      especific_recuent: true,
      size_archive: 5,
      recuent_especific: 1, //Numero de archivos especificos
      necessary_recuent_image: false,
      recuent_min_archive: 0,
      recuent_max_archive: 0,
      type_recuent_image: 'especific',
      text_information: '',
      options_document: [''],
      answer_document: [''],
      answer_archive: [''],
      type_select: '',
      name_archiveordocument: [{ name: '', size: 0, lastModified: '0' }],
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,private dragService: DragService
  ) {
    this.done = data;
    console.log(this.done);
  }

  ngOnInit(): void {}

  addElementNotRelationation(index: any) {
    //Esta funcion añade elementos que no se deberian clonar en el fomulario
    //Evita errores de relaciones al clonar o añadir
    if (
      this.done[index]['type'] == 'radioButton' ||
      this.done[index]['type'] == 'select'
    ) {
      //Solo si tiene opciones se añade
      this.done[index]['options'] = ['Opcion 1', 'Opcion 2', 'Opcion 3'];
    }
    //Añade mapa si tiene la propiedad
    if (this.done[index]['type'] == 'map') {
      this.done[index]['optionsMap'] = { ...this.configurationMap };
      this.done[index]['map'] = this.mapDraw;
    }
    //Sugerencia se añade a todos
    this.done[index]['sugerence'] = this.htmlText;
  }
  deleteDefault() {
    if (this.done.length == 2) {
      this.done = this.done.filter((c) => c['name'] != 'defect');
      this.condition_encuesta = true; //Si se agrega ,recien aparece
    }
  }
  changeStyle(i: any) {
    for (let i in this.styleArray) {
      this.styleArray[i] = false;
    }
    this.styleArray[i] = true;
    this.changeStyleAparenceFalse();
    console.log(this.done);
  }
  changeStyleFalse() {
    for (let i in this.styleArray) {
      this.styleArray[i] = false;
    }
    this.changeStyleAparenceFalse();
  }
  changeStyleAparenceFalse() {
    this.styleAparence['title_status'] = false;
    this.styleAparence['description_status'] = false;
    this.styleAparence['send_status'] = false;
  }
  changeStyleAparence(type: any) {
    //======Aqui deshabilitamos los border con adornos de todos y pasamos a editar
    this.object_edit = -1;
    this.changeStyleFalse();
    this.state_add = false;
    this.state_aparence = false;
    this.state_edit = true;
    this.state_components = 'edit';
    //======Final edit

    //Verificamos que tipo es y aparece
    if (type == 'title') {
      this.changeStyleAparenceFalse();
      this.styleAparence['title_status'] = !this.styleAparence['title_status'];
    }
    if (type == 'description') {
      this.changeStyleAparenceFalse();
      this.styleAparence['description_status'] =
        !this.styleAparence['description_status'];
      //Si esta vacio que le aparesca un texto
      if (!this.styleAparence['description']) {
        this.styleAparence['description'] =
          '<p>¿La descripción de la encuesta está vacía? Puede ocultarla usando la pestaña Apariencia.</p>';
      }
    }
    if (type == 'send') {
      this.changeStyleAparenceFalse();
      this.styleAparence['send_status'] = !this.styleAparence['send_status'];
    }
  }
  changeStyleAparenceTitle(style: any) {
    if (style == 'left') this.styleAparence['title_style'] = 'left';
    if (style == 'center') this.styleAparence['title_style'] = 'center';
    if (style == 'right') this.styleAparence['title_style'] = 'right';
  }
  deleteComponent(index: any) {
    this.styleArray.pop(); //Lo eliminamos del array de estilos
    let arr = this.done.filter((c, i) => i != index); //Filtramos
    this.done = arr; //Le asignamos
    this.addButton(); //Hacemos que pase al add
    this.object_edit = -1; //Cambiamos el target para editar
    this.changeStyleFalse(); //Hacemos que quite el estilo a todos
    if (this.done.length == 0) this.object_edit = -1; //Linea de codigo de precaución
    if (this.done.length == 0) this.condition_encuesta = false; //Hace que sea falso cuando no hay opciones
  }

  duplicateComponent(index: any, item: any, event: any) {
    let itemChange = { ...item };
    itemChange['title'] = itemChange['title'] + ' - Duplicado';
    var optionsChange: any = [];
    if (this.done[index].hasOwnProperty('options')) {
      //Solo si tiene opciones se añade
      optionsChange = [...item['options']];
      itemChange['options'] = optionsChange;
    }
    var archiveDocumentChange: any = [];
    //name_archiveordocument : [{'name' : '', 'size' : 0, 'lastModified' : '0' }]
    if (this.done[index].hasOwnProperty('name_archiveordocument')) {
      archiveDocumentChange = [...item['name_archiveordocument']];
      itemChange['name_archiveordocument'] = archiveDocumentChange;
    }
    this.done.splice(index + 1, 0, itemChange);
    this.styleArray.push(false); //se agregar al igual que un componente para adornar el div seleccionado
    this.changeStyleFalse();
    this.changeStyle(index + 1); //Para pintar el div que recien se agrego
    this.editButton(index + 1);
    event.stopPropagation();
  }
  addComponent(item: any) {
    this.done.push({ ...item });
    this.deleteDefault();
    this.styleArray.push(false); //se agregar al igual que un componente para adornar el div seleccionado
    this.changeStyle(this.done.length - 1); //Para pintar el div que recien se agrego
    this.editButton(this.done.length - 1);
    this.addElementNotRelationation(this.done.length - 1);
    //Esta añadiendo algo ,por la tanto se reitera que aparesca los componentes
    this.condition_encuesta = true;
  }

  scrollToTop(el: any) {
    //Funcion que hace bajar el scroll
    const duration = 600;
    const interval = 100;
    const move = (el.scrollHeight * interval) / duration;
    observableInterval(interval)
      .pipe(
        scan((acc, curr) => acc + move, el.scrollHeight),
        tap((position) => (el.scrollTop = position)),
        takeWhile((val) => val < 0)
      )
      .subscribe();
  }
  //Configuración Botones
  add() {
    return {
      add: this.state_add,
    };
  }
  edit() {
    return {
      edit: this.state_edit,
    };
  }
  aparence() {
    return {
      aparence: this.state_aparence,
    };
  }

  addButton() {
    this.state_add = true;
    this.state_aparence = false;
    this.state_edit = false;
    this.state_components = 'add';
  }
  editButton(i: any) {
    this.state_add = false;
    this.state_aparence = false;
    this.state_edit = true;
    this.state_components = 'edit';
    if (i !== -1) {
      this.object_edit = i;
    }
  }
  aparenceButton() {
    this.state_add = false;
    this.state_aparence = true;
    this.state_edit = false;
    this.state_components = 'aparence';
  }
  changeFocusAndValueRadioGroup(object_edit: any, i: any, event: any) {
    //Esta funcion cambia el foco ,cuando escribes en los input de una radio button
    this.done[object_edit]['options'][i] = event.target.value;
    //console.log(this.radio_group_edit_2)
    //console.log(this.radio_group_edit_2.toArray()[i]);
    setTimeout(() =>
      this.radio_group_edit_2.toArray()[i].nativeElement.focus()
    );
    //this.done[object_edit]['options_selec']= event.target.value;
  }

  checkState(event: any, el: any) {
    //Esta funcion hace que cuando desde otro click en el radio button se desactive
    event.preventDefault();
    event.stopPropagation();
    if (this.done[this.object_edit]['options_selec'] === el.value) {
      el.checked = false;
      this.done[this.object_edit]['options_selec'] = null;
    } else {
      this.done[this.object_edit]['options_selec'] = el.value;
      el.checked = true;
    }
  }
  addOption(event: any, index: any) {
    //Añade 1 opcion debajo ,con el numero de elementos
    event.preventDefault();
    event.stopPropagation();
    this.done[this.object_edit]['options'].splice(
      index + 1,
      0,
      'Opcion ' + (this.done[this.object_edit]['options'].length + 1) + ' '
    );
    //this.done.splice(index + 1, 0, itemChange);
  }
  deleteOption(event: any, index: any) {
    //Elimina la opción seleccionada
    console.log(
      'eliminar opcion' + this.done[this.object_edit]['options'].length
    );
    event.preventDefault();
    event.stopPropagation();
    if (this.done[this.object_edit]['options'].length > 1) {
      this.done[this.object_edit]['options'] = this.done[this.object_edit][
        'options'
      ].filter((c, i) => i != index);
    }
  }
  //======================Calification Functions=======================
  changeIcon(type: any) {
    //Esta funcion Cambia los tipos de iconos

    this.done[this.object_edit]['calification_icon'] = type;
  }

  changeValueCalification(num: any) {
    this.done[this.object_edit]['calification_num'] = num;
  }
  //======================DateTime Functions=======================
  checkStateDateTime(event: any, el: any) {
    //Esta funcion hace que cuando desde otro click en el radio button se desactive
    //Esta funcion hace que se asigne una fecta
    event.preventDefault();
    event.stopPropagation();
    if (this.done[this.object_edit]['date_time_type'] === el.value) {
      el.checked = false;
      this.done[this.object_edit]['date_time_type'] = null;
    } else {
      this.done[this.object_edit]['date_time_type'] = el.value;
      el.checked = true;
    }
    if (this.done[this.object_edit]['date_time_type'] == 'now') {
      this.done[this.object_edit]['date_time'] = new Date();
    }
    if (!this.done[this.object_edit]['date_time_type']) {
      this.done[this.object_edit]['date_time'] = null;
    }
  }
  //======================Map Functions=======================
  ubicationSave(index: any, map: any) {
    //Guarda la latitud y longitud para cuando venga de la db
    this.done[index]['optionsMap']['center'] = latLng(
      map.latlng.lat,
      map.latlng.lng
    );
    /*let m = marker(latLng(
      map.latlng.lat,
      map.latlng.lng
    ));
    m.addTo(this.done[index]['map']);
    */
  }
  zoomSave(index: any, zoom: any) {
    //Guarda el zoom cuando venga de la db
    this.done[index]['optionsMap']['zoom'] = zoom.target._zoom;
  }
  onMapReady(index: any, map: any) {
    // Para cargar una pagina de mapa,donde se pondra los marcadores
    console.log(map);
    this.done[index]['map'] = map;
  }
  //======================Image Functions=======================

  textInformationChangeInput(index: any, type_recuent_image: any, event: any) {
    if (type_recuent_image == 'especific') {
      this.done[index]['text_information'] =
        '(número de fotos necesarias: ' +
        this.done[index]['recuent_especific'] +
        ')';
      if (!this.done[index]['recuent_especific']) {
        this.done[index]['text_information'] =
          '(número de fotos necesarias: 1)';
      }
    }
    let min = this.done[index]['recuent_min_archive'];
    let max = this.done[index]['recuent_max_archive'];
    if (type_recuent_image == 'range') {
      //Si no entra a ninguna condicional que no haya nada
      this.done[index]['text_information'] = '';
      //Si solo rellena el valor mínimo
      if (
        this.done[index]['recuent_max_archive'] == null ||
        (max.toString() == '' && this.done[index]['recuent_min_archive'])
      ) {
        this.done[index]['text_information'] =
          '(número mínimo de fotos necesarias: ' +
          this.done[index]['recuent_min_archive'] +
          ')';
      }
      //Si solo rellena el valor máximo
      if (
        this.done[index]['recuent_min_archive'] == null ||
        (min.toString() == '' && this.done[index]['recuent_max_archive'])
      ) {
        this.done[index]['text_information'] =
          '(número máximo de fotos necesarias: ' +
          this.done[index]['recuent_max_archive'] +
          ')';
      }
      //Si rellena el valor mínimo y máximo
      if (
        this.done[index]['recuent_min_archive'] != null &&
        this.done[index]['recuent_max_archive'] != null
      ) {
        if (
          this.done[index]['recuent_min_archive'] &&
          this.done[index]['recuent_max_archive']
        ) {
          this.done[index]['text_information'] =
            '(número de fotos permitidas: de ' +
            this.done[index]['recuent_min_archive'] +
            ' a ' +
            this.done[index]['recuent_max_archive'] +
            ')';
        }
      }

      console.log(this.done[index]['recuent_min_archive']);
      console.log(this.done[index]['recuent_max_archive']);
      if (
        this.done[index]['recuent_min_archive'] != null &&
        this.done[index]['recuent_max_archive'] != null &&
        min.toString() != '' &&
        max.toString() != ''
      ) {
        if (min.toString().length >= max.toString().length) {
          if (min > max) {
            this.done[index]['recuent_min_archive'] = 1;
            this.done[index]['text_information'] =
              '(número de fotos permitidas: de ' +
              this.done[index]['recuent_min_archive'] +
              ' a ' +
              this.done[index]['recuent_max_archive'] +
              ')';
            //Muestra un mensaje luego de setear un valor
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'error',
              title: 'El valor mínimo debe ser menor que el valor máximo',
            });
          }
        }
      }
      //Si ambos son null para evitar errores
      if (
        this.done[index]['recuent_min_archive'] == null &&
        this.done[index]['recuent_max_archive'] == null
      ) {
        this.done[index]['text_information'] = '';
      }
    }
  }
  openDialogCamera(indexGeneral: any) {
    const dialogRef = this.dialog.open(CameraComponentComponent, {
      panelClass: 'app-full-bleed-dialog',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      //{ name: '', size: 0, lastModified: '0' }
      if (result != undefined) {
        var img = new Image();
        let base64 = result[0].split(',')[1];

        img.src = 'data:image/jpeg;base64,' + btoa(base64);
        var file = this.dataURLtoBlob(result[0]);
        //var sizeKB = file.size / 1000;
        var sizeMB = file.size / 1048576;
        var fechaNow = new Date();
        this.done[indexGeneral]['name_archiveordocument'] = [
          ...this.done[indexGeneral]['name_archiveordocument'],
          {
            name: 'multimedia_' + this.combineDateAndTime(fechaNow) + '.jpg',
            size: sizeMB,
            lastModified: '0',
          },
        ];
      }
    });
  }
  dataURLtoBlob(dataURL: any) {
    //http://mitgux.com/send-canvas-to-server-as-file-using-ajax
    // Decode the dataURL
    var binary = atob(dataURL.split(',')[1]);
    // Create 8-bit unsigned array
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    // Return our Blob object
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
  }
  combineDateAndTime(date: any) {
    let timeString =
      date.getHours().toString() +
      date.getMinutes().toString() +
      date.getSeconds().toString();

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();
    var dateString =
      year.toString() + month.toString() + day.toString() + timeString;
    return dateString;
  }
  //======================Document  Functions=======================
  onChangeDocument(index: any, option: string, checked: boolean) {
    if (checked && this.done[index]['answer_document'].indexOf(option) < 0) {
      this.done[index]['answer_document'] = [
        ...this.done[index]['answer_document'],
        option,
      ].sort((a, b) =>
        this.done[index]['options_document'].indexOf(a) >
        this.done[index]['options_document'].indexOf(b)
          ? 1
          : -1
      );
      //we can also not sort the array
      //this.answer=[...this.answer,option]
    }

    if (!checked)
      this.done[index]['answer_document'] = this.done[index][
        'answer_document'
      ].filter((x) => x != option);
  }
  onChangeArchive(index: any, option: string, checked: boolean) {
    if (checked && this.done[index]['answer_archive'].indexOf(option) < 0) {
      this.done[index]['answer_archive'] = [
        ...this.done[index]['answer_archive'],
        option,
      ].sort((a, b) =>
        this.done[index]['answer_archive'].indexOf(a) >
        this.done[index]['options_document'].indexOf(b)
          ? 1
          : -1
      );
      //we can also not sort the array
      //this.answer=[...this.answer,option]
    }

    if (!checked)
      this.done[index]['answer_archive'] = this.done[index][
        'answer_archive'
      ].filter((x) => x != option);
  }
  fileChange(file: any, indexGeneral: any) {
    //Sirve para detectar el cambio de archivos
    let x: any;
    x = file.target.files[0];
    console.log('Guardar archvos');
    console.log('Object edit' + indexGeneral);
    
    
    console.log(this.done[indexGeneral]['name_archiveordocument']);
    this.done[indexGeneral]['name_archiveordocument'] = [
      ...this.done[indexGeneral]['name_archiveordocument'],
      x,
    ];
    console.log(this.done[indexGeneral]['name_archiveordocument']);
  }
  deleteInput(object_edit: any, i: any) {
    this.done[object_edit]['name_archiveordocument'].map((x, index) => {
      if (index == i) {
        console.log(x);

        this.done[object_edit]['name_archiveordocument'].splice(i, 1);
        console.log(this.done[object_edit]['name_archiveordocument']);
      }
    });
  }
  //===============QUILL EDITOR===================
  htmlText = '<p> </p>';
  hasFocus = false;
  subject: string;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' },
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' },
  ];

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        //[{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'], // remove formatting button

        ['link'],
        //['link', 'image', 'video']
      ],
    },

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm: any, renderList: any, mentionChar: any) => {
        let values;

        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter: {
          key: 13,
          handler: (range: any, context: any) => {
            console.log('enter');
            return true;
          },
        },
      },
    },
  };

  test = (event: any) => {
    console.log(event.keyCode);
  };

  onSelectionChanged = (event: any) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };

  onContentChanged = (event: any) => {
    //console.log(event.html);
  };

  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };
  saveDataAnswer(){
    // Se crea un hash unico
    var hashUnic=uuid.v4();
    var clone:any[]=[];
    //Hacemos un clon que este desincronizado
    for(let cl of this.done){
      clone.push({...cl})
    }
    //sendDataAnswer tendra la data a guardar
    var sendDataAnswer=[];
    //sendDataAnswerDocument tendra los documentos a guardar
    var sendDataAnswerDocument=[];
    //Se crear el objeto a guardar por formato
    var objectGlobal ={
          "answer":"",
          "answer_date":null,
          "users_id":20,
          "questions_id":0,
          "form_id":13,
          "hashUnic":hashUnic
    }
    for(let cl of clone){
      if(cl['type']=='input'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify(cl['text'])
        sendDataAnswer.push(object)
      }
      if(cl['type']=='radioButton'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify(cl['options_selec'])
        sendDataAnswer.push(object)
      }
      if(cl['type']=='select'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify(cl['options_selec'])
        sendDataAnswer.push(object)
      }
      if(cl['type']=='calification'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify(cl['calification'])
        sendDataAnswer.push(object)
      }
      if(cl['type']=='num'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify(cl['text'])
        sendDataAnswer.push(object)
      }
      if(cl['type']=='dateTime'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify(cl['date_time'])
        sendDataAnswer.push(object)
      }
      if(cl['type']=='date'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify(cl['date_time'])
        sendDataAnswer.push(object)
      }
      if(cl['type']=='textArea'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify(cl['text'])
        sendDataAnswer.push(object)
      }
      if(cl['type']=='map'){
        let object={...objectGlobal}
        object['questions_id']=cl['id']
        object['answer']=JSON.stringify("Todavía falta respuesta mapa")
        sendDataAnswer.push(object)
      }
      if(cl['type']=='image'){
        var form_data = new FormData();
        for(var doc of cl['name_archiveordocument']){
          form_data.append("file",doc)
        }
        form_data.append("questionsId",cl['id'].toString())
        form_data.append("formId","13")
        form_data.append("userId","20")
        form_data.append("hashUnic",JSON.stringify(hashUnic))

        if(cl['name_archiveordocument'].length != 0){
          //Se guarda si se ha añadido imagenes
          sendDataAnswerDocument.push(form_data)
        }
      }
      if(cl['type']=='document'){
        var form_data2 = new FormData();
        for(var doc2 of cl['name_archiveordocument']){
          form_data2.append("file",doc2)
        }
        form_data2.append("questionsId",cl['id'].toString())
        form_data2.append("formId","13")
        form_data2.append("userId","20")
        form_data2.append("hashUnic",JSON.stringify(hashUnic))

        if(cl['name_archiveordocument'].length != 0){
          //Se guarda si se ha añadido imagenes
          sendDataAnswerDocument.push(form_data2)
        }
      }
    }
    //Se guarda los documentos ,imagenes,etc
    for(let c of sendDataAnswerDocument){
      this.dragService.saveAnswerDocuments(c).subscribe((respuesta:any) => {})
    }
    //Se guarda las demas respuestas
    this.dragService.saveAnswer(sendDataAnswer).subscribe((respuesta:any) => {})
  }

}
