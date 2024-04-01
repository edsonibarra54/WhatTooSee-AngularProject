import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommentariesComponent } from './profile-commentaries.component';

describe('ProfileCommentariesComponent', () => {
  let component: ProfileCommentariesComponent;
  let fixture: ComponentFixture<ProfileCommentariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCommentariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileCommentariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
