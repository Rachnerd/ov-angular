import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { MockComponent } from "ng-mocks";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const DEBOUNCE_TIME = 300;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        MockComponent(MatLabel),
        MockComponent(MatIcon),
        MockComponent(MatFormField)
      ],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getInput = (): HTMLInputElement => fixture.nativeElement.querySelector('input');
  const getClearButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');

  it('should emit search event on input change', fakeAsync(() => {
    const searchSpy = jasmine.createSpy();
    component.search.subscribe(searchSpy);

    const input: HTMLInputElement = getInput();
    input.value = 'a'
    input.dispatchEvent(new Event('input'));

    tick(DEBOUNCE_TIME);

    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith('a');
  }));

  it('should debounce inputs', fakeAsync(() => {
    const searchSpy = jasmine.createSpy();
    component.search.subscribe(searchSpy);

    const input: HTMLInputElement = getInput();
    input.value = 'a'
    input.dispatchEvent(new Event('input'));

    tick(DEBOUNCE_TIME - 1);

    input.value = 'ab'
    input.dispatchEvent(new Event('input'));

    tick(DEBOUNCE_TIME - 1);

    input.value = 'abc'
    input.dispatchEvent(new Event('input'));

    tick(DEBOUNCE_TIME);

    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith('abc');
  }));

  it('should not emit the same query', fakeAsync(() => {
    const searchSpy = jasmine.createSpy();
    component.search.subscribe(searchSpy);

    const input: HTMLInputElement = getInput();
    input.value = 'a'
    input.dispatchEvent(new Event('input'));

    tick(DEBOUNCE_TIME);

    input.value = 'a'
    input.dispatchEvent(new Event('input'));

    tick(DEBOUNCE_TIME);


    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith('a');
  }));

  describe('with query', () => {
    beforeEach(fakeAsync(() => {
      const input: HTMLInputElement = getInput();
      input.value = 'a'
      input.dispatchEvent(new Event('input'));
      tick(DEBOUNCE_TIME);
      fixture.detectChanges();
    }));

    it('should show a clear button', () => {
      const button: HTMLButtonElement = getClearButton();
      expect(button).not.toBeNull();
    });

    it('should clear the query if the button is pressed', () => {
      const button = getClearButton();
      button.click();
      fixture.detectChanges();

      expect(component.searchFormControl.value).toEqual('');
    });

    it('should emit an event if clear button is pressed', fakeAsync(() => {
      const searchSpy = jasmine.createSpy();
      component.search.subscribe(searchSpy);

      const button = getClearButton();
      button.click();

      tick(DEBOUNCE_TIME);

      fixture.detectChanges();

      expect(searchSpy).toHaveBeenCalledTimes(1);
      expect(searchSpy).toHaveBeenCalledWith('');
    }));
  })
});
