import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryBoxComponent } from './commentary-box.component';

describe('CommentaryBoxComponent', () => {
  let component: CommentaryBoxComponent;
  let fixture: ComponentFixture<CommentaryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentaryBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentaryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
