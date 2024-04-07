import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductionsPage } from './edit-productions.page';

describe('EditProductionsComponent', () => {
  let component: EditProductionsPage;
  let fixture: ComponentFixture<EditProductionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductionsPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
