conditionValidationChamps = [
    {
        "id": 1,
        "libelle": "la ville doit avoir au minimun 10 caractaires",
        "description": "",
        "expressionValidation": "$id_ville$ >= 10",
        "idObjetOperation": "id_ville",
        "code": null,
        "numeroOrdre": 1,
        "codeMsgErreur": "1",
        "msgErreurFr": "Le nombre de caractaire est inferieur a 10",
        "msgErreurEn": "Le nombre de caractaire est inferieur a 10",
        "idStatut": 0,
        "statut": "Suspendu",
    
    },
    {
        "id": 2,
        "libelle": "le libelle1 doit etre superieur a 10",
        "description": "",
        "expressionValidation": "$id_libelle1$>10",
        "idObjetOperation": "id_libelle1",
        "code": null,
        "numeroOrdre": 2,
        "codeMsgErreur": "3",
        "msgErreurFr": "le libelle1 doit etre superieur a 10",
        "msgErreurEn": "le libelle1 doit etre superieur a 10",
        "idStatut": 0,
        "statut": "Suspendu",
    },
    {
        "id": 3,
        "libelle": "libelle 1 doit existé",
        "description": "",
        "expressionValidation": "$id_libelle1$",
        "idObjetOperation": "id_libelle1",
        "code": null,
        "numeroOrdre": 4,
        "codeMsgErreur": "4",
        "msgErreurFr": "le libelle n'existe pas",
        "msgErreurEn": "le libelle n'existe pas",
        "idStatut": 0,
        "statut": "Suspendu",
    }
]

champs = [
    {
        "id": 1,
        "libelle": "Ville",
        "code": "107",
        "tableRef": "app_client",
        "description": "",
        "nomColonne": "ext_string1",
        "typeHtml": "STRING",
        "placeholder": "Ville",
        "requis": false,
        "sourceDonnee": "Ville",
        "editable": false,
        "min": 3,
        "max": 150,
        "unique": false,
        "idObjet": "id_ville_extension",
        "msg": "Ville",
        "formatInput": "Ville",
        "formatOuput": "Ville",
        "precisionChamp": 0,
        
    },
    {
        "id": 2,
        "libelle": "Pays",
        "code": "107",
        "tableRef": "app_client",
        "description": "",
        "nomColonne": "ext_string2",
        "typeHtml": "STRING",
        "placeholder": "Ville",
        "requis": true,
        "sourceDonnee": "Ville",
        "editable": false,
        "min": 3,
        "max": 150,
        "unique": false,
        "idObjet": "id_pays",
        "msg": "Ville",
        "formatInput": "Ville",
        "formatOuput": "Ville",
        "precisionChamp": 0,
    },
    {
        "id": 3,
        "libelle": "Libelle1",
        "code": "107",
        "tableRef": "app_client",
        "description": "",
        "nomColonne": "ext_number1",
        "typeHtml": "NUMBER",
        "placeholder": "Libelle1",
        "requis": true,
        "sourceDonnee": "Libelle1",
        "editable": false,
        "min": 3,
        "max": 150,
        "unique": false,
        "idObjet": "id_libelle1",
        "msg": "Libelle1",
        "formatInput": "Libelle1",
        "formatOuput": "Libelle1",
        "precisionChamp": 1,
    },
    {
        "id": 4,
        "libelle": "Libelle2",
        "code": "107",
        "tableRef": "app_client",
        "description": "\n",
        "nomColonne": "ext_date1",
        "typeHtml": "DATETIME_LOCAL",
        "placeholder": "Libelle2",
        "requis": true,
        "sourceDonnee": "Libelle2",
        "editable": false,
        "min": 1,
        "max": 12,
        "unique": false,
        "idObjet": "id_labelle2",
        "msg": "Libelle2",
        "formatInput": "Libelle2",
        "formatOuput": "Libelle2",
        "precisionChamp": 0,
    }
]

j'ai deux table de données, avec le tableau 2 (champs) j'ai construire un formulaire reactive.

le tableau 1 (conditionValidationChamps) contient les conditions de validation de chaque champs du tableau 2. dans le tableau 2 il ya l'expresion a evalué dans le champ expressionValidation par exemple, 
pour le champ id= id_ville, on doit verifier que le nombre de caractaire entrer est superieur ou 10
"expressionValidation": "($id_ville$).length >= 10".

j'aimerais savoir comment implementé cela

Pour implémenter ces conditions de validation personnalisées à l'aide de Reactive Forms dans Angular, vous pouvez créer des validateurs personnalisés. Voici comment vous pouvez implémenter cela en fonction de vos données :

Créez une fonction pour générer des validateurs personnalisés à partir de votre tableau conditionValidationChamps :
generateCustomValidators(conditionValidationChamps, fieldName) {
  const validators = [];

  conditionValidationChamps.forEach(condition => {
    if (condition.idObjetOperation === fieldName) {
      const validatorFn = (control) => {
        const value = control.value;
        const expression = condition.expressionValidation.replace('$' + fieldName + '$', value);

        if (!eval(expression)) {
          return { customError: { message: this.langue === 'fr' ? condition.msgErreurFr : condition.msgErreurEn } };
        }

        return null;
      };

      validators.push(validatorFn);
    }
  });

  return validators;
}
Modifiez la méthode initForm pour ajouter ces validateurs personnalisés aux contrôles de formulaire :
private initForm(data: any[]) {
  const formControls = {};

  data.forEach(field => {
    const customValidators = this.generateCustomValidators(this.conditionValidationChamps, field.idObjet);
    formControls[field.nomColonne] = this.formBuilder.control('', customValidators);
  });

  this.formExtension = this.formBuilder.group(formControls);
}
Modifiez votre modèle de composant pour afficher les messages d'erreur personnalisés :
<form [formGroup]="formExtension" (ngSubmit)="onSaveExtension()">
  <div *ngFor="let field of champs">
    <label>{{field.libelle}}</label>
    <input [formControlName]="field.nomColonne" [placeholder]="field.placeholder" [type]="field.typeHtml">
    <div *ngIf="formExtension.get(field.nomColonne).errors?.customError">
      {{formExtension.get(field.nomColonne).errors.customError.message}}
    </div>
  </div>
  <button type="submit">Submit</button>
</form>
Avec cette implémentation, les conditions de validation personnalisées définies dans conditionValidationChamps seront appliquées aux contrôles de formulaire correspondants, et les messages d'erreur seront affichés en fonction de la langue sélectionnée.

SyntaxError: Unexpected token '>'
    at validatorFn (edit-extensions.component.ts:117:21)
    at forms.js:805:40
    at Array.map (<anonymous>)
    at executeValidators (forms.js:805:23)
    at FormControl._composedValidatorFn (forms.js:836:28)
    at FormControl._runValidator (forms.js:2352:38)
    at FormControl.updateValueAndValidity (forms.js:2329:32)
    at new FormControl (forms.js:2701:14)
    at FormBuilder.control (forms.js:7106:16)
    at edit-extensions.component.ts:87:72

je voudrais en fait remplace la $id_libelle$ par la valeur du champ id_libelle par exemple si dans le champ on a saisi 10 alors j'ai 10>=10


