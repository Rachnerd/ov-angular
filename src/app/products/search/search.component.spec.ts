import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { MockComponent } from "ng-mocks";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        MockComponent(MatLabel),
        MockComponent(MatIcon),
        MockComponent(MatFormField)
      ],
      imports: [FormsModule]
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

  it('should emit search event on input change', () => {
    const searchSpy = jasmine.createSpy();
    component.search.subscribe(searchSpy);

    const input: HTMLInputElement = getInput();
    input.value = 'a'
    input.dispatchEvent(new Event('input'));

    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith('a');
  });

  describe('with query', () => {
    beforeEach(() => {
      const input: HTMLInputElement = getInput();
      input.value = 'a'
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    })

    it('should show a clear button', () => {
      const button: HTMLButtonElement = getClearButton();
      expect(button).not.toBeNull();
    });

    it('should clear the query if the button is pressed', () => {
      const button = getClearButton();
      button.click();
      fixture.detectChanges();

      expect(component.query).toEqual('');
    });

    it('should emit an event if clear button is pressed', () => {
      const searchSpy = jasmine.createSpy();
      component.search.subscribe(searchSpy);

      const button = getClearButton();
      button.click();
      fixture.detectChanges();

      expect(searchSpy).toHaveBeenCalledTimes(1);
      expect(searchSpy).toHaveBeenCalledWith('');
    });
  })
});
