import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  jsonGetQuestions = {
    form: {
      form_id: 13,
    },
  };
  uriGetQuestions = 'https://localhost:44371/api/questions/GetQuestions';
  uriGetAparenceForm = 'https://localhost:44371/api/questions/GetAparenceForm';

  uriSaveQuestions = 'https://localhost:44371/api/questions';
  uriDeleteQuestions = 'https://localhost:44371/api/questions/DeleteQuestions';
  //Prueba de guardado
  uriSaveAnswerDocuments = 'https://localhost:44371/api/answer/SaveDocuments';
  uriSaveAnswer = 'https://localhost:44371/api/answer/SaveAnswer';
  uriUpdateFormLink = 'https://localhost:44371/api/forms/EditFormLink';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient) {}
  public updateFormLink(data:any){
    return this.http.post(this.uriUpdateFormLink,data);
  }
 public getQuestions(form:any) {
   this.jsonGetQuestions.form.form_id=form['form_id']
   if(form['form_id'] ==null){
     this.jsonGetQuestions.form.form_id=form['id']
   }
   return this.http.post(this.uriGetQuestions,this.jsonGetQuestions);
 }
  public getAparenceForm(form:any) {
    this.jsonGetQuestions.form.form_id=form['form_id']
    return this.http.post(this.uriGetAparenceForm,this.jsonGetQuestions);
  }
  public saveQuestions(data:any) {
    return this.http.post(this.uriSaveQuestions,data);
  }
  public deleteQuestions(deleteList:any) {
    return this.http.post(this.uriDeleteQuestions,deleteList);
  }
  public saveAnswerDocuments(dataForm:any) {
    return this.http.post(this.uriSaveAnswerDocuments,dataForm);
  }
  public saveAnswer(dataForm:any) {
    return this.http.post(this.uriSaveAnswer,dataForm);
  }
}
