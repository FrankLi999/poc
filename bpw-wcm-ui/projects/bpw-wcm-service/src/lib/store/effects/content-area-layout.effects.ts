import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of, Observable } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import {
  ContentAreaLayoutActionTypes,
  ContentAreaLayoutActions
} from "../actions/content-area-layout.actions";
import { WcmService } from "../../service/wcm.service";
import {
  CreateContentAreaLayout,
  UpdateContentAreaLayout,
  CreateContentAreaLayoutFailed,
  CreateContentAreaLayoutSuccess
} from "../actions/content-area-layout.actions";
@Injectable()
export class ContentAreaLayoutEffects {
  @Effect()
  createContentAreaLayout$: Observable<
    ContentAreaLayoutActions
  > = this.actions$.pipe(
    ofType<CreateContentAreaLayout>(
      ContentAreaLayoutActionTypes.CREATE_CONTENT_AREA_LAYOUT
    ),
    switchMap(action => {
      return this.wcmService.createContentAreaLayout(action.payload).pipe(
        map((response: any) => {
          return new CreateContentAreaLayoutSuccess(action.payload);
        }),
        catchError(err => of(new CreateContentAreaLayoutFailed(err)))
      );
    })
  );
  @Effect()
  updateContentAreaLayout$: Observable<
    ContentAreaLayoutActions
  > = this.actions$.pipe(
    ofType<UpdateContentAreaLayout>(
      ContentAreaLayoutActionTypes.UPDATE_CONTENT_AREA_LAYOUT
    ),
    switchMap(action => {
      return this.wcmService.saveContentAreaLayout(action.payload).pipe(
        map((response: any) => {
          return new CreateContentAreaLayoutSuccess(action.payload);
        }),
        catchError(err => of(new CreateContentAreaLayoutFailed(err)))
      );
    })
  );
  constructor(
    private actions$: Actions<ContentAreaLayoutActions>,
    private wcmService: WcmService
  ) {}
}
