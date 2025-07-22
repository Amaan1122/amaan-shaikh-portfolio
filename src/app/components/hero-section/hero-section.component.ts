import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  signal,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import {
  LucideAngularModule,
  Download,
  Mail,
  Github,
  Linkedin,
  ArrowDown,
} from 'lucide-angular';
import { ButtonComponent } from '../ui/button/button.component';
import { ImageWithFallbackComponent } from '../figma/image-with-fallback/image-with-fallback.component';

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface SocialLink {
  icon: any;
  href: string;
  color: string;
}

interface FloatingIcon {
  icon: string;
  position: string;
  delay: number;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ImageWithFallbackComponent,
    LucideAngularModule,
  ],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('containerAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('itemAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(
          '600ms ease-out',
          keyframes([
            style({ transform: 'translateY(50px)', opacity: 0, offset: 0 }),
            style({
              transform: 'translateY(-10px)',
              opacity: 0.8,
              offset: 0.7,
            }),
            style({ transform: 'translateY(0)', opacity: 1, offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate(
          '600ms 2000ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('bounceAnimation', [
      transition(':enter', [
        animate(
          '2000ms ease-in-out',
          keyframes([
            style({ transform: 'translateY(0)', offset: 0 }),
            style({ transform: 'translateY(-10px)', offset: 0.5 }),
            style({ transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  mousePosition = signal({ x: 0, y: 0 });
  particles: Particle[] = [];

  // Expose icons for template
  readonly Download = Download;
  readonly Mail = Mail;
  readonly Github = Github;
  readonly Linkedin = Linkedin;
  readonly ArrowDown = ArrowDown;

  socialLinks: SocialLink[] = [
    { icon: Github, href: '#', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-400' },
    { icon: Mail, href: '#', color: 'hover:text-green-400' },
  ];

  floatingIcons: FloatingIcon[] = [
    { icon: '⚡', position: 'top-0 right-4', delay: 0 },
    { icon: '🚀', position: 'bottom-4 left-0', delay: 1 },
    { icon: '💎', position: 'top-1/4 left-0', delay: 2 },
    { icon: '🔥', position: 'bottom-0 right-0', delay: 3 },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.generateParticles();
  }

  ngOnInit(): void {
    // Only add event listeners in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.setupMouseTracking();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      this.handleMouseMove(event);
    }
  }

  private setupMouseTracking(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
  }

  private handleMouseMove = (e: MouseEvent): void => {
    this.mousePosition.set({ x: e.clientX, y: e.clientY });
  };

  private generateParticles(): void {
    this.particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
  }

  getGradientOrbStyles(isFirst: boolean = true): any {
    const position = this.mousePosition();
    const multiplier = isFirst ? 0.02 : -0.03;

    return {
      transform: `translate(${position.x * multiplier}px, ${
        position.y * multiplier
      }px)`,
      transition: 'transform 0.3s ease-out',
    };
  }

  scrollToAbout(): void {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      const element = document.querySelector('#about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  getParticleStyles(particle: Particle): any {
    return {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      animationDelay: `${particle.delay}s`,
      animationDuration: `${particle.duration}s`,
    };
  }

  trackByParticleId(index: number, particle: Particle): number {
    return particle.id;
  }

  trackBySocialIndex(index: number, social: SocialLink): number {
    return index;
  }

  trackByIconIndex(index: number, icon: FloatingIcon): number {
    return index;
  }
}
