import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocicoesComponent } from './negocicoes.component';

describe('NegocicoesComponent', () => {
  let component: NegocicoesComponent;
  let fixture: ComponentFixture<NegocicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegocicoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegocicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
