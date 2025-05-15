import { render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';


describe('HeaderComponent', () => {
  it('should create the header component', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter([])],
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display navigation links', async () => {
    await render(HeaderComponent, {
      providers: [provideRouter([])],
    });
    
    expect(screen.getByText('🏠 Home')).toBeInTheDocument();
    expect(screen.getByText('📊 Stats')).toBeInTheDocument();
  });
});
